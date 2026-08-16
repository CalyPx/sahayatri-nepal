import { prisma } from "@/lib/prisma";
import ReportsClient from "./ReportsClient";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

export default async function Reports() {
  const reports = await prisma.report.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
    take: 3,
  });

  if (reports.length === 0) return null;

  return (
    <ReportsClient
      reports={reports.map((r) => ({
        slug: r.slug,
        title: r.title,
        date: dateFormatter.format(r.date),
      }))}
    />
  );
}
