import { describe, expect, it } from "vitest";
import { navigation, pageContent, processSteps, serviceCards } from "../Web/frontend/src/data/site";

describe("FerixBuilder public website content", () => {
  it("defines the principal marketing navigation routes", () => {
    expect(navigation.map(item => item.href)).toEqual([
      "/services",
      "/how-it-works",
      "/examples",
      "/pricing",
      "/about",
    ]);
  });

  it("supplies content for every required information and legal page", () => {
    expect(Object.keys(pageContent)).toEqual([
      "services",
      "pricing",
      "examples",
      "how",
      "about",
      "faq",
      "privacy",
      "terms",
      "refund",
    ]);
    expect(pageContent.faq.sections).toHaveLength(3);
    expect(pageContent.privacy.sections).toHaveLength(3);
  });

  it("keeps the homepage service and delivery-process sections complete", () => {
    expect(serviceCards).toHaveLength(4);
    expect(processSteps).toHaveLength(4);
  });
});
