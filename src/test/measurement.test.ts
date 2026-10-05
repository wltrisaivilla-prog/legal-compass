import { describe, expect, it, vi } from "vitest";
import { signalConversion } from "@/lib/measurement";

describe("future measurement signals", () => {
  it("emits only the event name and optional public document id", () => {
    const listener = vi.fn();
    document.addEventListener("site:conversion", listener);
    signalConversion("contact_submit_success");
    signalConversion("document_purchase_verified", "compraventa");
    expect(listener.mock.calls.map(([event]) => event.detail)).toEqual([
      { event: "contact_submit_success" },
      { event: "document_purchase_verified", documentId: "compraventa" },
    ]);
    document.removeEventListener("site:conversion", listener);
  });
});
