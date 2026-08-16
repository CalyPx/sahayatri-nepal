import { prisma } from "@/lib/prisma";
import StudentStoryClient from "./StudentStoryClient";

export default async function StudentStory() {
  const story = await prisma.story.findFirst({
    where: { published: true },
    orderBy: { date: "desc" },
  });

  if (!story) return null;

  return <StudentStoryClient story={story} />;
}
