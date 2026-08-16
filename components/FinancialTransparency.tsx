import { prisma } from "@/lib/prisma";
import FinancialTransparencyClient from "./FinancialTransparencyClient";

export default async function FinancialTransparency() {
  const allocation = await prisma.financialAllocation.findMany({
    orderBy: { order: "asc" },
  });

  if (allocation.length === 0) return null;

  return (
    <FinancialTransparencyClient
      allocation={allocation}
      fiscalYear={allocation[0].fiscalYear}
    />
  );
}
