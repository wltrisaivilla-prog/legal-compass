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
  "acta-notarial-nombramiento": { file: "acta-notarial-nombramiento.docx", amount: 1.0 },
};

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

    // Initialize Supabase with service role for storage access
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Record purchase (trust client-reported orderId; no server-side PayPal verification)
    const { error: insertError } = await supabase.from("purchases").insert({
      document_id: documentId,
      paypal_order_id: orderId,
      amount: docConfig.amount,
      currency: "USD",
      buyer_email: buyerEmail ?? null,
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
