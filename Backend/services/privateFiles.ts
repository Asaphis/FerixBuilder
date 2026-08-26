import type { PrivateAssetRecord, PrivateAssetRequest } from "../../shared/contracts/workspace";

/** File bytes remain in object storage; Backend owns tenant authorization. */
export interface PrivateFileService {
  createUploadIntent(input: PrivateAssetRequest): Promise<{ storageKey: string }>;
  createAuthorizedDownload(record: PrivateAssetRecord, actorBusinessId: string): Promise<{ url: string }>;
}

export function assertBusinessAssetAccess(record: PrivateAssetRecord, actorBusinessId: string) {
  if (record.businessId !== actorBusinessId) {
    throw new Error("Asset access is not authorized for this business.");
  }
}

/** Storage-provider wiring will replace this bootstrap contract when uploads begin. */
export const privateFileService: PrivateFileService = {
  async createUploadIntent(input) {
    return { storageKey: `private/${input.businessId}/${input.projectId}/${crypto.randomUUID()}-${input.filename}` };
  },
  async createAuthorizedDownload(record, actorBusinessId) {
    assertBusinessAssetAccess(record, actorBusinessId);
    throw new Error("Private download signing is not configured yet.");
  },
};
