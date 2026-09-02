import { v2 as cloudinary } from "cloudinary";
import { prisma } from "./prisma";

/**
 * Storage Management with Cloudinary Integration
 * 
 * This module handles:
 * - File uploads to Cloudinary
 * - Image transformations and optimization
 * - CDN delivery
 * - Storage quota management
 * - File organization and tagging
 */

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface UploadOptions {
  folder?: string;
  tags?: string[];
  transformation?: string;
  resourceType?: "image" | "video" | "raw" | "auto";
  quality?: "auto" | "good" | "best" | "eco" | "low";
  format?: string;
}

export interface UploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
  resourceType: string;
  format: string;
  bytes: number;
  width?: number;
  height?: number;
  createdAt: Date;
}

export interface StorageStats {
  totalFiles: number;
  totalBytes: number;
  totalBytesFormatted: string;
  byType: Record<string, number>;
  byFolder: Record<string, number>;
}

/**
 * Upload a file to Cloudinary
 */
export async function uploadFile(
  filePath: string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: options.folder || "ferixbuilder",
    tags: options.tags || [],
    transformation: options.transformation,
    resource_type: options.resourceType || "auto",
    quality: options.quality || "auto",
    format: options.format,
    overwrite: true,
  });

  // Store file record in database
  await prisma.projectFile.create({
    data: {
      projectId: options.folder?.split("/")[1] || "system",
      fileName: result.original_filename || result.public_id,
      filePath: result.url,
      encryptedPath: result.secure_url,
      fileSize: result.bytes,
      fileType: result.resource_type,
      checksum: result.signature || "",
      encryptionKey: "cloudinary", // Cloudinary handles encryption
      isReleased: false,
    },
  });

  return {
    publicId: result.public_id,
    url: result.url,
    secureUrl: result.secure_url,
    resourceType: result.resource_type,
    format: result.format,
    bytes: result.bytes,
    width: result.width,
    height: result.height,
    createdAt: new Date(result.created_at * 1000),
  };
}

/**
 * Upload from buffer (useful for direct uploads)
 */
export async function uploadBuffer(
  buffer: Buffer,
  fileName: string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: options.folder || "ferixbuilder",
        tags: options.tags || [],
        transformation: options.transformation,
        resource_type: options.resourceType || "auto",
        quality: options.quality || "auto",
        format: options.format,
        public_id: fileName,
        overwrite: true,
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else if (result) {
          resolve({
            publicId: result.public_id,
            url: result.url,
            secureUrl: result.secure_url,
            resourceType: result.resource_type,
            format: result.format,
            bytes: result.bytes,
            width: result.width,
            height: result.height,
            createdAt: new Date(result.created_at * 1000),
          });
        }
      }
    ).end(buffer);
  });
}

/**
 * Delete a file from Cloudinary
 */
export async function deleteFile(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);

  // Remove from database
  await prisma.projectFile.deleteMany({
    where: {
      encryptedPath: { contains: publicId },
    },
  });
}

/**
 * Generate a signed URL for private files
 */
export function generateSignedUrl(
  publicId: string,
  expiresIn: number = 3600
): string {
  return cloudinary.url(publicId, {
    sign_url: true,
    type: "authenticated",
    expires_at: Math.floor(Date.now() / 1000) + expiresIn,
  });
}

/**
 * Transform an image with Cloudinary
 */
export function transformImage(
  publicId: string,
  transformations: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: number;
    format?: string;
  }
): string {
  return cloudinary.url(publicId, {
    transformation: [
      {
        width: transformations.width,
        height: transformations.height,
        crop: transformations.crop || "limit",
        quality: transformations.quality || "auto",
        fetch_format: transformations.format || "auto",
      },
    ],
  });
}

/**
 * Get storage statistics
 */
export async function getStorageStats(): Promise<StorageStats> {
  const files = await prisma.projectFile.findMany();

  const totalBytes = files.reduce((sum, file) => sum + file.fileSize, 0);
  const byType: Record<string, number> = {};
  const byFolder: Record<string, number> = {};

  for (const file of files) {
    byType[file.fileType] = (byType[file.fileType] || 0) + file.fileSize;
    const folder = file.projectId;
    byFolder[folder] = (byFolder[folder] || 0) + file.fileSize;
  }

  return {
    totalFiles: files.length,
    totalBytes,
    totalBytesFormatted: formatBytes(totalBytes),
    byType,
    byFolder,
  };
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
}

/**
 * Get files by project
 */
export async function getProjectFiles(projectId: string) {
  return prisma.projectFile.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Search files by tag
 */
export async function searchFilesByTag(tag: string) {
  // Cloudinary tag search
  const result = await cloudinary.api.resources_by_tag(tag, {
    max_results: 100,
  });

  return result.resources;
}

/**
 * Create an upload preset (for client-side uploads)
 */
export async function createUploadPreset(
  name: string,
  settings: {
    folder?: string;
    allowedFormats?: string[];
    transformation?: string;
    unsigned?: boolean;
  }
) {
  const result = await cloudinary.api.create_upload_preset(name, {
    folder: settings.folder || "ferixbuilder",
    allowed_formats: settings.allowedFormats || ["jpg", "png", "webp", "pdf"],
    transformation: settings.transformation,
    unsigned: settings.unsigned || false,
  });

  return result;
}

/**
 * Get Cloudinary usage statistics
 */
export async function getCloudinaryUsage() {
  try {
    const result = await cloudinary.api.usage();
    return result;
  } catch (error) {
    console.error("Failed to fetch Cloudinary usage:", error);
    return null;
  }
}

/**
 * Optimize all images in a folder
 */
export async function optimizeFolder(folder: string) {
  const result = await cloudinary.api.resources({
    type: "upload",
    prefix: folder,
    max_results: 500,
  });

  const optimized: string[] = [];

  for (const resource of result.resources) {
    // Apply auto-format and quality optimization
    const optimizedUrl = cloudinary.url(resource.public_id, {
      fetch_format: "auto",
      quality: "auto",
    });

    optimized.push(optimizedUrl);
  }

  return {
    total: result.resources.length,
    optimizedUrls: optimized,
  };
}

/**
 * Generate a video thumbnail
 */
export function generateVideoThumbnail(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    startTime?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    resource_type: "video",
    transformation: [
      {
        width: options.width || 400,
        height: options.height || 300,
        crop: "fill",
      },
      {
        start_offset: options.startTime || "0",
      },
    ],
    format: "jpg",
  });
}
