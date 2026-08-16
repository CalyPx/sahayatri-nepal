"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createImpactStat(formData: FormData) {
  await prisma.impactStat.create({
    data: {
      label: String(formData.get("label") ?? ""),
      sublabel: String(formData.get("sublabel") ?? ""),
      value: Number(formData.get("value") ?? 0),
      suffix: String(formData.get("suffix") ?? ""),
      order: Number(formData.get("order") ?? 0),
    },
  });
  revalidatePath("/admin/impact");
  revalidatePath("/");
}

export async function updateImpactStat(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.impactStat.update({
    where: { id },
    data: {
      label: String(formData.get("label") ?? ""),
      sublabel: String(formData.get("sublabel") ?? ""),
      value: Number(formData.get("value") ?? 0),
      suffix: String(formData.get("suffix") ?? ""),
      order: Number(formData.get("order") ?? 0),
    },
  });
  revalidatePath("/admin/impact");
  revalidatePath("/");
}

export async function deleteImpactStat(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.impactStat.delete({ where: { id } });
  revalidatePath("/admin/impact");
  revalidatePath("/");
}
