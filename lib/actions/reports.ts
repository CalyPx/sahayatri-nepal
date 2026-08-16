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

async function handleFileUpload(formData: FormData): Promise<string | undefined> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return undefined;
  if (!isStorageConfigured()) return undefined;
  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `reports/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  return uploadFile(buffer, key, file.type || "application/pdf");
}

export async function createReport(formData: FormData) {
  const fileUrl = await handleFileUpload(formData);
  const title = String(formData.get("title") ?? "");
  const dateValue = String(formData.get("date") ?? "");
  await prisma.report.create({
    data: {
      slug: slugify(String(formData.get("slug") || title)),
      title,
      date: dateValue ? new Date(dateValue) : new Date(),
      category: String(formData.get("category") ?? ""),
      excerpt: String(formData.get("excerpt") ?? ""),
      body: String(formData.get("body") ?? ""),
      fileUrl,
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/admin/reports");
  revalidatePath("/");
  revalidatePath("/reports");
}

export async function updateReport(formData: FormData) {
  const id = String(formData.get("id"));
  const fileUrl = await handleFileUpload(formData);
  const dateValue = String(formData.get("date") ?? "");
  await prisma.report.update({
    where: { id },
    data: {
      title: String(formData.get("title") ?? ""),
      date: dateValue ? new Date(dateValue) : undefined,
      category: String(formData.get("category") ?? ""),
      excerpt: String(formData.get("excerpt") ?? ""),
      body: String(formData.get("body") ?? ""),
      ...(fileUrl ? { fileUrl } : {}),
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/admin/reports");
  revalidatePath("/");
  revalidatePath("/reports");
}

export async function deleteReport(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.report.delete({ where: { id } });
  revalidatePath("/admin/reports");
  revalidatePath("/");
  revalidatePath("/reports");
}
