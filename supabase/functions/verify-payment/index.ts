import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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

    // Initialize Supabase with service role for storage access
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Record purchase
    const { error: insertError } = await supabase.from("purchases").insert({
      document_id: documentId,
      paypal_order_id: orderId,
      amount: 1.00,
      currency: "USD",
      buyer_email: buyerEmail || null,
      status: "completed",
    });

    if (insertError && !insertError.message.includes("duplicate")) {
      console.error("Insert error:", insertError);
    }

    // Generate signed URL (5 min expiry)
    const filePath = `${documentId}.pdf`;
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
      JSON.stringify({ downloadUrl: signedUrlData.signedUrl }),
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
