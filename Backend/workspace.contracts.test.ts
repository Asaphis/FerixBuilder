import { describe, expect, it } from "vitest";
import { deliveryEventTypes, privateAssetKinds, workspaceAreas } from "../shared/contracts/workspace";
import { assertBusinessAssetAccess } from "./services/privateFiles";

describe("FerixBuilder workspace contracts", () => {
  it("preserves the three named workspace areas", () => {
    expect(workspaceAreas).toEqual(["Backend", "Web/frontend", "Web/admin"]);
  });

  it("defines the first delivery events and private asset classes", () => {
    expect(deliveryEventTypes).toContain("delivery.released");
    expect(deliveryEventTypes).toContain("support.reply.received");
    expect(privateAssetKinds).toEqual(["customer_asset", "revision_attachment", "source_package", "delivery_download"]);
  });

  it("blocks a business from accessing another business's private asset", () => {
    const asset = {
      id: "asset-1",
      kind: "delivery_download" as const,
      businessId: "business-a",
      projectId: "project-1",
      filename: "delivery.zip",
      mimeType: "application/zip",
      byteSize: 128,
      storageKey: "private/business-a/project-1/delivery.zip",
      uploadedByUserId: 1,
      createdAt: new Date(),
    };

    expect(() => assertBusinessAssetAccess(asset, "business-a")).not.toThrow();
    expect(() => assertBusinessAssetAccess(asset, "business-b")).toThrow("not authorized");
  });
});
