import { prisma } from "@/lib/prisma";

const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8MB — generous for a photo or a report PDF

/** Files live in the database as MediaAsset rows, served back via /api/media/[id]. */
export function isStorageConfigured() {
  return true;
}

export async function uploadFile(
  buffer: Buffer,
  _key: string,
  contentType: string,
): Promise<string> {
  if (buffer.byteLength > MAX_FILE_BYTES) {
    throw new Error(
      `File is too large (${(buffer.byteLength / 1024 / 1024).toFixed(1)}MB) — please use something under 8MB.`,
    );
  }
  const asset = await prisma.mediaAsset.create({
    data: { data: new Uint8Array(buffer), mimeType: contentType || "application/octet-stream" },
  });
  return `/api/media/${asset.id}`;
}

export async function deleteFile(urlOrKey: string): Promise<void> {
  const id = urlOrKey.split("/").pop();
  if (!id) return;
  await prisma.mediaAsset.delete({ where: { id } }).catch(() => {});
}
