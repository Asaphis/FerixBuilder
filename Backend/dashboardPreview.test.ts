import { describe, expect, it } from "vitest";
import { dashboardMilestones, dashboardSections, dashboardTasks } from "../Web/frontend/src/pages/Dashboard";

describe("FerixBuilder preview dashboard", () => {
  it("contains the customer delivery route in the correct order", () => {
    expect(dashboardMilestones).toEqual(["Brief received", "Scope confirmed", "In build", "Preview ready", "Approved", "Delivery"]);
  });

  it("includes workspace, business, and care navigation groups", () => {
    expect(dashboardSections.map(([title]) => title)).toEqual(["WORKSPACE", "BUSINESS", "CARE", "ACCOUNT"]);
    expect(dashboardTasks).toHaveLength(5);
  });

  it("maps every customer-workspace navigation item to a dedicated route", () => {
    const routes = dashboardSections.flatMap(([, items]) => items.map(([, , href]) => href));

    expect(routes).toEqual([
      "/dashboard", "/workspace/onboarding", "/workspace/project", "/workspace/files", "/workspace/preview", "/workspace/revisions", "/workspace/payments", "/workspace/downloads",
      "/workspace/customers", "/workspace/products", "/workspace/bookings", "/workspace/domain",
      "/workspace/technical-care", "/workspace/management", "/workspace/system-health", "/workspace/support", "/workspace/settings",
    ]);
    expect(new Set(routes).size).toBe(17);
  });
});
