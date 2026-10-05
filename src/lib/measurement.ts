type Conversion = "contact_submit_success" | "document_purchase_verified";

// Local signal only: no analytics SDK, network request, personal or payment data.
export function signalConversion(event: Conversion, documentId?: string) {
  document.dispatchEvent(new CustomEvent("site:conversion", {
    detail: { event, ...(documentId ? { documentId } : {}) },
  }));
}
