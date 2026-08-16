"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadFile } from "@/lib/storage";

async function handlePhotoUpload(formData: FormData): Promise<string | undefined> {
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) return undefined;
  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `gallery/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  return uploadFile(buffer, key, file.type || "application/octet-stream");
}

export async function createGalleryPhoto(formData: FormData) {
  const photoUrl = await handlePhotoUpload(formData);
  if (!photoUrl) {
    throw new Error("Choose a photo to upload.");
  }
  await prisma.galleryPhoto.create({
    data: {
      photoUrl,
      caption: String(formData.get("caption") ?? ""),
      order: Number(formData.get("order") ?? 0),
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function updateGalleryPhoto(formData: FormData) {
  const id = String(formData.get("id"));
  const photoUrl = await handlePhotoUpload(formData);
  await prisma.galleryPhoto.update({
    where: { id },
    data: {
      caption: String(formData.get("caption") ?? ""),
      ...(photoUrl ? { photoUrl } : {}),
      order: Number(formData.get("order") ?? 0),
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteGalleryPhoto(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.galleryPhoto.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
