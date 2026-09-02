// Cloudinary storage integration for FerixBuilder
// Uploads and retrieves files via Cloudinary API

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream",
): Promise<{ key: string; url: string }> {
  try {
    const fileData = typeof data === 'string' ? data : Buffer.from(data).toString('base64');
    const result = await cloudinary.uploader.upload(
      `data:${contentType};base64,${fileData}`,
      {
        public_id: relKey.replace(/^\/+/, '').replace(/\.[^/.]+$/, ""),
        resource_type: 'auto',
        folder: 'ferixbuilder',
      }
    );
    
    return { key: relKey, url: result.secure_url };
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const publicId = relKey.replace(/^\/+/, '').replace(/\.[^/.]+$/, "");
  const url = cloudinary.url(`ferixbuilder/${publicId}`, { secure: true });
  return { key: relKey, url };
}

export async function storageGetSignedUrl(relKey: string): Promise<string> {
  const publicId = relKey.replace(/^\/+/, '').replace(/\.[^/.]+$/, "");
  return cloudinary.url(`ferixbuilder/${publicId}`, { 
    secure: true,
    sign_url: true,
  });
}

export async function storageDelete(relKey: string): Promise<void> {
  const publicId = relKey.replace(/^\/+/, '').replace(/\.[^/.]+$/, "");
  await cloudinary.uploader.destroy(`ferixbuilder/${publicId}`);
}
