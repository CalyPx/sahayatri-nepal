import { prisma } from "@/lib/prisma";
import FAQClient from "./FAQClient";

export default async function FAQ() {
  const items = await prisma.faqItem.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  if (items.length === 0) return null;

  return <FAQClient items={items} />;
}
