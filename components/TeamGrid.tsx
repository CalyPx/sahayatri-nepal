import { prisma } from "@/lib/prisma";
import TeamGridClient from "./TeamGridClient";

export default async function TeamGrid() {
  const members = await prisma.teamMember.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  if (members.length === 0) return null;

  return <TeamGridClient members={members} />;
}
