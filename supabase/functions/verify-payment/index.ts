import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Server-side allowlist: documentId -> { storage file path, expected price }
// Keeping this on the server prevents the client from requesting arbitrary files.
const DOCUMENTS: Record<string, { file: string; amount: number }> = {
  "compraventa": { file: "compraventa.docx", amount: 1.0 },
  "desmembracion": { file: "desmembracion.docx", amount: 1.0 },
  "mandato-especial": { file: "mandato-especial.doc", amount: 1.0 },
  "identificacion-persona": { file: "identificacion-persona.docx", amount: 1.0 },
  "compraventa-usufructo": { file: "compraventa-usufructo.docx", amount: 1.0 },
};

const PAYPAL_API = "https://api-m.paypal.com"; // live

async function getPaypalAccessToken(): Promise<string | null> {
  const clientId = Deno.env.get("PAYPAL_CLIENT_ID");
  const clientSecret = Deno.env.get("PAYPAL_CLIENT_SECRET");
  if (!clientId || !clientSecret) return null;

  const auth = btoa(`${clientId}:${clientSecret}`);
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    console.error("PayPal token error:", await res.text());
    return null;
  }
  const data = await res.json();
  return data.access_token as string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { orderId, documentId, buyerEmail } = await req.json();

    if (!orderId || !documentId) {
      return new Response(
        JSON.stringify({ error: "Missing orderId or documentId" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const docConfig = DOCUMENTS[documentId];
    if (!docConfig) {
      return new Response(
        JSON.stringify({ error: "Documento no encontrado" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify the order with PayPal before granting access.
    const accessToken = await getPaypalAccessToken();
    if (!accessToken) {
      console.error("PayPal credentials not configured");
      return new Response(
        JSON.stringify({ error: "Servicio de pagos no configurado. Contacte soporte." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!orderRes.ok) {
      console.error("PayPal order fetch failed:", orderRes.status, await orderRes.text());
      return new Response(
        JSON.stringify({ error: "No se pudo verificar el pago" }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const order = await orderRes.json();
    const status = order?.status;
    const pu = order?.purchase_units?.[0];
    const captured = pu?.payments?.captures?.[0];
    const paidAmount = parseFloat(captured?.amount?.value ?? pu?.amount?.value ?? "0");
    const paidCurrency = captured?.amount?.currency_code ?? pu?.amount?.currency_code;
    const captureStatus = captured?.status;
    const paidEmail = order?.payer?.email_address ?? null;

    const orderOk = status === "COMPLETED" || captureStatus === "COMPLETED";
    if (!orderOk || paidCurrency !== "USD" || paidAmount + 0.001 < docConfig.amount) {
      console.error("Payment validation failed", { status, captureStatus, paidAmount, paidCurrency });
      return new Response(
        JSON.stringify({ error: "Pago no confirmado por PayPal" }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase with service role for storage access
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Record purchase
    const { error: insertError } = await supabase.from("purchases").insert({
      document_id: documentId,
      paypal_order_id: orderId,
      amount: paidAmount,
      currency: "USD",
      buyer_email: paidEmail ?? buyerEmail ?? null,
      status: "completed",
    });

    if (insertError && !insertError.message.includes("duplicate")) {
      console.error("Insert error:", insertError);
    }

    // Generate signed URL (5 min expiry) for the actual file mapped server-side
    const filePath = docConfig.file;
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from("legal-documents")
      .createSignedUrl(filePath, 300);

    if (signedUrlError) {
      console.error("Signed URL error:", signedUrlError);
      return new Response(
        JSON.stringify({ error: "No se pudo generar el enlace de descarga. Contacte soporte." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ downloadUrl: signedUrlData.signedUrl, fileName: filePath }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
