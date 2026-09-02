import { prisma } from "./prisma";
import crypto from "crypto";

/**
 * Source File Protection and Release System
 * 
 * This module handles:
 * - Secure file storage with encryption
 * - Access control and permissions
 * - Release workflow with approval
 * - Audit logging for all file operations
 */

export interface FileReleaseConfig {
  projectId: string;
  releasedBy: string;
  releaseNotes?: string;
  includeSource?: boolean;
  includeAssets?: boolean;
  includeDatabase?: boolean;
}

export interface ProtectedFile {
  id: string;
  projectId: string;
  fileName: string;
  filePath: string;
  encryptedPath: string;
  fileSize: number;
  fileType: string;
  checksum: string;
  encryptionKey: string;
  isReleased: boolean;
  releasedAt?: Date;
  releasedBy?: string;
  createdAt: Date;
}

/**
 * Generate a secure encryption key
 */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Encrypt a file (placeholder - actual implementation would use file system)
 */
export function encryptFile(filePath: string, key: string): string {
  // In production, this would use AES-256 encryption
  // For now, return a placeholder encrypted path
  const hash = crypto.createHash('sha256').update(filePath + key).digest('hex');
  return `/encrypted/${hash.substring(0, 16)}`;
}

/**
 * Calculate file checksum
 */
export function calculateChecksum(filePath: string): string {
  const hash = crypto.createHash('sha256');
  // In production, this would read the actual file
  hash.update(filePath);
  return hash.digest('hex');
}

/**
 * Upload and protect a source file
 */
export async function uploadProtectedFile(data: {
  projectId: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
}): Promise<ProtectedFile> {
  const encryptionKey = generateEncryptionKey();
  const encryptedPath = encryptFile(data.filePath, encryptionKey);
  const checksum = calculateChecksum(data.filePath);

  const file = await prisma.projectFile.create({
    data: {
      projectId: data.projectId,
      fileName: data.fileName,
      filePath: data.filePath,
      encryptedPath,
      fileSize: data.fileSize,
      fileType: data.fileType,
      checksum,
      encryptionKey,
      isReleased: false,
    },
  });

  // Log the upload
  await prisma.auditLog.create({
    data: {
      action: "FILE_UPLOAD",
      actor: data.uploadedBy,
      resource: `ProjectFile:${file.id}`,
      details: `Uploaded file: ${data.fileName}`,
      status: "SUCCESS",
    },
  });

  return file;
}

/**
 * Release project files to client
 */
export async function releaseProjectFiles(config: FileReleaseConfig): Promise<{
  releasedFiles: string[];
  downloadUrl: string;
  expiresAt: Date;
}> {
  // Verify user has permission to release
  const user = await prisma.user.findUnique({
    where: { id: config.releasedBy },
  });

  if (!user || user.role !== "admin") {
    throw new Error("Only admins can release files");
  }

  // Get project files
  const files = await prisma.projectFile.findMany({
    where: {
      projectId: config.projectId,
      isReleased: false,
    },
  });

  if (files.length === 0) {
    throw new Error("No unreleased files found for this project");
  }

  // Mark files as released
  const releasedFileIds: string[] = [];
  
  for (const file of files) {
    await prisma.projectFile.update({
      where: { id: file.id },
      data: {
        isReleased: true,
        releasedAt: new Date(),
        releasedBy: config.releasedBy,
      },
    });
    releasedFileIds.push(file.id);
  }

  // Generate secure download URL with expiration
  const downloadToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry

  // Store download token
  await prisma.businessRecord.create({
    data: {
      projectId: config.projectId,
      recordType: "FILE_RELEASE",
      recordData: {
        downloadToken,
        releasedFileIds,
        releaseNotes: config.releaseNotes,
      },
    },
  });

  // Log the release
  await prisma.auditLog.create({
    data: {
      action: "FILE_RELEASE",
      actor: config.releasedBy,
      resource: `Project:${config.projectId}`,
      details: `Released ${releasedFileIds.length} files. Notes: ${config.releaseNotes || 'None'}`,
      status: "SUCCESS",
    },
  });

  // Update project status
  await prisma.project.update({
    where: { id: config.projectId },
    data: {
      status: "DELIVERED",
      deliveredAt: new Date(),
    },
  });

  return {
    releasedFiles: releasedFileIds,
    downloadUrl: `/download/${downloadToken}`,
    expiresAt,
  };
}

/**
 * Verify download token and grant access
 */
export async function verifyDownloadToken(token: string): Promise<{
  valid: boolean;
  files?: ProtectedFile[];
  error?: string;
}> {
  const record = await prisma.businessRecord.findFirst({
    where: {
      recordType: "FILE_RELEASE",
    },
  });

  if (!record) {
    return { valid: false, error: "Invalid download token" };
  }

  const data = record.recordData as any;
  
  if (data.downloadToken !== token) {
    return { valid: false, error: "Invalid download token" };
  }

  // Get the files
  const files = await prisma.projectFile.findMany({
    where: {
      id: { in: data.releasedFileIds },
    },
  });

  return { valid: true, files };
}

/**
 * Revoke file release
 */
export async function revokeFileRelease(
  projectId: string,
  revokedBy: string
): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: revokedBy },
  });

  if (!user || user.role !== "admin") {
    throw new Error("Only admins can revoke releases");
  }

  // Mark files as unreleased
  await prisma.projectFile.updateMany({
    where: {
      projectId,
      isReleased: true,
    },
    data: {
      isReleased: false,
      releasedAt: null,
      releasedBy: null,
    },
  });

  // Log the revocation
  await prisma.auditLog.create({
    data: {
      action: "FILE_REVOKE",
      actor: revokedBy,
      resource: `Project:${projectId}`,
      details: "Revoked file release",
      status: "SUCCESS",
    },
  });
}

/**
 * Get file access history
 */
export async function getFileAccessHistory(projectId: string) {
  const logs = await prisma.auditLog.findMany({
    where: {
      resource: {
        contains: projectId,
      },
      action: {
        in: ["FILE_UPLOAD", "FILE_RELEASE", "FILE_REVOKE", "FILE_DOWNLOAD"],
      },
    },
    orderBy: {
      timestamp: "desc",
    },
    take: 50,
  });

  return logs;
}

/**
 * Check if user has access to project files
 */
export async function checkFileAccess(
  projectId: string,
  userId: string
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return false;
  }

  // Admins have access to all files
  if (user.role === "admin") {
    return true;
  }

  // Check if user is associated with the project
  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    return false;
  }

  // Project owner has access
  if (project.ownerId === userId) {
    return true;
  }

  return false;
}
