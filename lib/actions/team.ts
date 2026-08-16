"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadFile, isStorageConfigured } from "@/lib/storage";

async function handlePhotoUpload(formData: FormData): Promise<string | undefined> {
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) return undefined;
  if (!isStorageConfigured()) return undefined;
  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `team/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  return uploadFile(buffer, key, file.type || "application/octet-stream");
}

export async function createTeamMember(formData: FormData) {
  const photoUrl = await handlePhotoUpload(formData);
  await prisma.teamMember.create({
    data: {
      name: String(formData.get("name") ?? ""),
      role: String(formData.get("role") ?? ""),
      photoUrl,
      order: Number(formData.get("order") ?? 0),
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/admin/team");
  revalidatePath("/");
}

export async function updateTeamMember(formData: FormData) {
  const id = String(formData.get("id"));
  const photoUrl = await handlePhotoUpload(formData);
  await prisma.teamMember.update({
    where: { id },
    data: {
      name: String(formData.get("name") ?? ""),
      role: String(formData.get("role") ?? ""),
      ...(photoUrl ? { photoUrl } : {}),
      order: Number(formData.get("order") ?? 0),
      published: formData.get("published") === "on",
    },
  });
  revalidatePath("/admin/team");
  revalidatePath("/");
}

export async function deleteTeamMember(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/admin/team");
  revalidatePath("/");
}
