import { describe, expect, it } from "vitest";
import { dashboardMilestones, dashboardSections, dashboardTasks } from "../Web/frontend/src/pages/Dashboard";

describe("FerixBuilder preview dashboard", () => {
  it("contains the customer delivery route in the correct order", () => {
    expect(dashboardMilestones).toEqual(["Brief received", "Scope confirmed", "In build", "Preview ready", "Approved", "Delivery"]);
  });

  it("includes workspace, business, and care navigation groups", () => {
    expect(dashboardSections.map(([title]) => title)).toEqual(["WORKSPACE", "BUSINESS", "CARE", "ACCOUNT"]);
    expect(dashboardTasks).toHaveLength(3);
  });

  it("maps each distinct customer journey to one non-duplicated top-level route", () => {
    const routes = dashboardSections.flatMap(([, items]) => items.map(([, , href]) => href));

    expect(routes).toEqual([
      "/dashboard", "/workspace/project", "/workspace/review", "/workspace/delivery",
      "/workspace/business", "/workspace/care", "/workspace/support", "/workspace/settings",
    ]);
    expect(new Set(routes).size).toBe(8);
  });
});
