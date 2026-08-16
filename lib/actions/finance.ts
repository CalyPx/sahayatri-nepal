"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createFinancialAllocation(formData: FormData) {
  await prisma.financialAllocation.create({
    data: {
      label: String(formData.get("label") ?? ""),
      percent: Number(formData.get("percent") ?? 0),
      color: String(formData.get("color") ?? "#1A6FA8"),
      fiscalYear: String(formData.get("fiscalYear") ?? ""),
      order: Number(formData.get("order") ?? 0),
    },
  });
  revalidatePath("/admin/finance");
  revalidatePath("/");
}

export async function updateFinancialAllocation(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.financialAllocation.update({
    where: { id },
    data: {
      label: String(formData.get("label") ?? ""),
      percent: Number(formData.get("percent") ?? 0),
      color: String(formData.get("color") ?? "#1A6FA8"),
      fiscalYear: String(formData.get("fiscalYear") ?? ""),
      order: Number(formData.get("order") ?? 0),
    },
  });
  revalidatePath("/admin/finance");
  revalidatePath("/");
}

export async function deleteFinancialAllocation(formData: FormData) {
  const id = String(formData.get("id"));
  await prisma.financialAllocation.delete({ where: { id } });
  revalidatePath("/admin/finance");
  revalidatePath("/");
}
