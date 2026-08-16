"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadFile, isStorageConfigured } from "@/lib/storage";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function handlePhotoUpload(formData: FormData): Promise<string | undefined> {
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) return undefined;
  if (!isStorageConfigured()) return undefined;
  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `stories/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  return uploadFile(buffer, key, file.type || "application/octet-stream");
}

export async function createStory(formData: FormData) {
  const photoUrl = await handlePhotoUpload(formData);
  const title = String(formData.get("title") ?? "");
  await prisma.story.create({
    data: {
      slug: slugify(String(formData.get("slug") || title)),
      title,
      studentName: String(formData.get("studentName") ?? ""),
      quote: String(formData.get("quote") ?? ""),
      body: String(formData.get("body") ?? ""),
      photoUrl,
      published: formData.get("published") === "on",
      date: new Date(),
    },
  });
  revalidatePath("/admin/stories");
  revalidatePath("/");
  revalidatePath("/stories");
}

export async function updateStory(formData: FormData) {
  const id = String(formData.get("id"));
  const photoUrl = await handlePhotoUpload(formData);
  await prisma.story.update({
    where: { id },
    data: {
      title: String(formData.get("title") ?? ""),
      studentName: String(formData.get("studentName") ?? ""),
      quote: String(formData.get("quote") ?? ""),
      body: String(formData.get("body") ?? ""),
      ...(photoUrl ? { photoUrl } : {}),
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/admin/stories");
  revalidatePath("/");
  revalidatePath("/stories");
}

export async function deleteStory(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.story.delete({ where: { id } });
  revalidatePath("/admin/stories");
  revalidatePath("/");
  revalidatePath("/stories");
}
