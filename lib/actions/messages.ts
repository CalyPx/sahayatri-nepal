"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function toggleMessageHandled(formData: FormData) {
  const id = String(formData.get("id"));
  const handled = formData.get("handled") === "true";
  await prisma.contactSubmission.update({ where: { id }, data: { handled: !handled } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
