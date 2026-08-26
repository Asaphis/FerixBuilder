import { describe, expect, it } from "vitest";
import { dashboardMilestones, dashboardSections, dashboardTasks } from "../Web/frontend/src/pages/Dashboard";

describe("FerixBuilder preview dashboard", () => {
  it("contains the customer delivery route in the correct order", () => {
    expect(dashboardMilestones).toEqual(["Brief received", "Scope confirmed", "In build", "Preview ready", "Approved", "Delivery"]);
  });

  it("includes workspace, business, and care navigation groups", () => {
    expect(dashboardSections.map(([title]) => title)).toEqual(["WORKSPACE", "BUSINESS", "CARE"]);
    expect(dashboardTasks).toHaveLength(5);
  });
});
