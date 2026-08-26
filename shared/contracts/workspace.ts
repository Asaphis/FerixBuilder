/**
 * Cross-workspace contract. These types may be imported by Backend, Web/frontend,
 * and Web/admin without creating runtime dependencies between the areas.
 */
export const workspaceAreas = ["Backend", "Web/frontend", "Web/admin"] as const;
export type WorkspaceArea = (typeof workspaceAreas)[number];

export const deliveryEventTypes = [
  "project.submitted",
  "preview.available",
  "payment.confirmed",
  "delivery.released",
  "support.reply.received",
] as const;

export type DeliveryEventType = (typeof deliveryEventTypes)[number];

export type DeliveryEvent = {
  type: DeliveryEventType;
  businessId: string;
  projectId?: string;
  recipientUserId?: number;
  occurredAt: Date;
  payload: Record<string, string | number | boolean | null>;
};

export const privateAssetKinds = [
  "customer_asset",
  "revision_attachment",
  "source_package",
  "delivery_download",
] as const;

export type PrivateAssetKind = (typeof privateAssetKinds)[number];

export type PrivateAssetRequest = {
  kind: PrivateAssetKind;
  businessId: string;
  projectId: string;
  filename: string;
  mimeType: string;
  byteSize: number;
};

export type PrivateAssetRecord = PrivateAssetRequest & {
  id: string;
  storageKey: string;
  uploadedByUserId: number;
  createdAt: Date;
};
