import { describe, expect, it } from "vitest";
import { contactInquiryInput } from "./routers/contact";

describe("contact enquiry validation", () => {
  const validInquiry = {
    name: "Amina Bello",
    businessName: "Bello Atelier",
    email: "amina@example.com",
    serviceType: "business_website",
    message: "We need a considered website to introduce our new fashion atelier and services.",
  } as const;

  it("accepts a correctly formed public enquiry", () => {
    expect(contactInquiryInput.parse(validInquiry)).toEqual(validInquiry);
  });

  it("rejects messages that do not contain enough project context", () => {
    expect(() => contactInquiryInput.parse({ ...validInquiry, message: "Please call me" })).toThrow();
  });
});
