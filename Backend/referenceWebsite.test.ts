import { describe, expect, it } from "vitest";
import { detailContent, navItems, process, services } from "../Web/frontend/src/data/site";

describe("FerixBuilder reference-inspired public website", () => {
  it("keeps every primary public route in the header navigation", () => {
    expect(navItems.map(([, href]) => href)).toEqual([
      "/", "/services", "/how-it-works", "/examples", "/pricing", "/about", "/faq",
    ]);
  });

  it("defines the intended service and delivery-process sections", () => {
    expect(services).toHaveLength(6);
    expect(process).toHaveLength(6);
    expect(process[2][1]).toBe("Preview your website");
  });

  it("provides content for every detailed public route", () => {
    expect(Object.keys(detailContent)).toEqual(["services", "how", "examples", "pricing", "about", "faq"]);
  });
});
