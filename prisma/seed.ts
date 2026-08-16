import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/auth";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@sahayatrinepal.org";
  // Only rotates the password when ADMIN_PASSWORD is explicitly passed in the
  // environment for this run — running `prisma db seed` with no env vars must
  // never silently reset an existing admin's password back to a default.
  const providedPassword = process.env.ADMIN_PASSWORD;
  const newPasswordHash = providedPassword ? await hashPassword(providedPassword) : undefined;

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: newPasswordHash ? { passwordHash: newPasswordHash, failedAttempts: 0, lockedUntil: null } : {},
    create: {
      email: adminEmail,
      passwordHash: newPasswordHash ?? (await hashPassword("change-me")),
      name: "Site Admin",
    },
  });

  const faqCount = await prisma.faqItem.count();
  if (faqCount === 0) {
    await prisma.faqItem.createMany({
      data: [
        {
          question: "How do I know my donation reaches Jumla?",
          answer:
            "Every donation is tracked against our published reports. We publish annual financial statements and programme updates so you can see exactly how funds are used.",
          order: 0,
        },
        {
          question: "Can I sponsor a specific student?",
          answer:
            "Yes — contact us directly and we can discuss sponsoring a specific child's education and housing costs for a term or full year.",
          order: 1,
        },
        {
          question: "Is Sahayatri Nepal a registered NGO?",
          answer:
            "Yes. Sahayatri Nepal is a registered NGO based in Jumla, Karnali Province, operating in partnership with Learn for Life, United Kingdom.",
          order: 2,
        },
        {
          question: "Do you accept international bank transfers?",
          answer: "Yes. Bank transfer details are sent securely once you get in touch through the donate page.",
          order: 3,
        },
        {
          question: "Can I visit or volunteer at the school?",
          answer:
            "We welcome visits and volunteers with relevant experience and safeguarding clearance. Reach out via the contact page to discuss timing.",
          order: 4,
        },
      ],
    });
  }

  const teamCount = await prisma.teamMember.count();
  if (teamCount === 0) {
    await prisma.teamMember.createMany({
      data: [
        { name: "Dhrub Saud", role: "Founder & Chair", order: 0 },
        { name: "Pradeep Narayan Joshi", role: "Secretary", order: 1 },
        { name: "Devendra Timilsena", role: "Chief Advisor", order: 2 },
        { name: "Ramita Budha", role: "Coordinator & Translator", order: 3 },
        { name: "Team member name", role: "Head Teacher", order: 4 },
        { name: "Team member name", role: "Sign Language Instructor", order: 5 },
      ],
    });
  }

  const statsCount = await prisma.impactStat.count();
  if (statsCount === 0) {
    await prisma.impactStat.createMany({
      data: [
        { label: "Students enrolled", sublabel: "Karnali Province", value: 47, suffix: "", order: 0 },
        { label: "SEE pass rate", sublabel: "Class of 2025", value: 100, suffix: "%", order: 1 },
        { label: "Years of service", sublabel: "Since 2013", value: 12, suffix: "", order: 2 },
      ],
    });
  }

  const financeCount = await prisma.financialAllocation.count();
  if (financeCount === 0) {
    await prisma.financialAllocation.createMany({
      data: [
        { label: "Education", percent: 60, color: "#8C6D1F", fiscalYear: "2025", order: 0 },
        { label: "Housing", percent: 25, color: "#1A6FA8", fiscalYear: "2025", order: 1 },
        { label: "Operations", percent: 15, color: "#091426", fiscalYear: "2025", order: 2 },
      ],
    });
  }

  const reportCount = await prisma.report.count();
  if (reportCount === 0) {
    await prisma.report.createMany({
      data: [
        {
          slug: "see-2025",
          title: "SEE Exam Results 2025",
          date: new Date("2025-05-01"),
          category: "Education",
          excerpt: "Every student who sat the national SEE exam this year passed — a 100% pass rate for the Class of 2025.",
          body: "Every student who sat the national SEE exam this year passed — a 100% pass rate for the Class of 2025. This continues Sahayatri Nepal's track record of preparing deaf students in Karnali Province for national examinations on equal footing with their hearing peers.",
        },
        {
          slug: "safeguarding-2025",
          title: "Child Safeguarding Training",
          date: new Date("2025-05-01"),
          category: "Operations",
          excerpt: "All staff completed refreshed child safeguarding training this term, in partnership with Learn for Life UK.",
          body: "All staff completed refreshed child safeguarding training this term, in partnership with Learn for Life UK. The training covered reporting procedures, safe recruitment practices, and ongoing safeguarding review for residential and classroom settings.",
        },
        {
          slug: "playground-2025",
          title: "Playground Installation, Jumla",
          date: new Date("2025-05-01"),
          category: "Housing",
          excerpt: "A new playground was installed at the Jumla residential site, funded by donor contributions this year.",
          body: "A new playground was installed at the Jumla residential site, funded by donor contributions this year. It gives students a dedicated space for the life-skills and recreational programming that runs alongside their academic studies.",
        },
      ],
    });
  }

  await prisma.report.upsert({
    where: { slug: "annual-2024-25" },
    update: {},
    create: {
      slug: "annual-2024-25",
      title: "Annual Report 2024–25",
      date: new Date("2025-06-01"),
      category: "Operations",
      excerpt: "Our full annual report covering enrollment, exam results, housing, finances and programme activity for 2024–25.",
      body: "This year's annual report covers 47 students enrolled across Karnali Province, a 100% SEE pass rate for the Class of 2025, continued residential housing in Jumla, and the life-skills and safeguarding programmes run alongside academics. Full financial allocation is published on our Financial Transparency page.",
    },
  });

  const storyCount = await prisma.story.count();
  if (storyCount === 0) {
    await prisma.story.create({
      data: {
        slug: "rajan",
        title: "A Student's Story",
        studentName: "Rajan",
        quote: "Before Sahayatri, I had no way to speak. Now I have words for everything I feel.",
        body: "Rajan arrived at Sahayatri at age eight, after three years at home in a remote village with no access to education. He had developed no spoken language and had never been to school.\n\nFour years later, Rajan passed his grade exams and taught basic sign language to two younger students who had just joined. He is twelve.",
        photoUrl: "/hero_section_photo.webp",
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
