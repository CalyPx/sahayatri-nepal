import { prisma } from "@/lib/prisma";
import ImpactNumbersClient from "./ImpactNumbersClient";

export default async function ImpactNumbers() {
  const stats = await prisma.impactStat.findMany({
    orderBy: { order: "asc" },
  });

  if (stats.length === 0) return null;

  return <ImpactNumbersClient stats={stats} />;
}
