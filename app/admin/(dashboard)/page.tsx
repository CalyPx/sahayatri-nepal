import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminHomePage() {
  const [team, stories, gallery, faq, reports, messages, unhandled, donations] = await Promise.all([
    prisma.teamMember.count(),
    prisma.story.count(),
    prisma.galleryPhoto.count(),
    prisma.faqItem.count(),
    prisma.report.count(),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { handled: false } }),
    prisma.donation.count({ where: { status: "success" } }),
  ]);

  const cards = [
    { label: "Team members", value: team, href: "/admin/team" },
    { label: "Stories", value: stories, href: "/admin/stories" },
    { label: "Gallery photos", value: gallery, href: "/admin/gallery" },
    { label: "FAQ items", value: faq, href: "/admin/faq" },
    { label: "Reports", value: reports, href: "/admin/reports" },
    { label: "Unread messages", value: unhandled, href: "/admin/messages" },
    { label: "Successful donations", value: donations, href: "/admin/donations" },
  ];

  return (
    <div>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "28px", color: "#091426", marginBottom: "24px" }}>
        Dashboard
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            style={{
              display: "block",
              background: "#FFFFFF",
              border: "1px solid rgba(9,20,38,0.08)",
              borderRadius: "12px",
              padding: "20px",
              textDecoration: "none",
            }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "32px", color: "#8C6D1F" }}>
              {card.value}
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(9,20,38,0.65)" }}>
              {card.label}
            </p>
          </Link>
        ))}
      </div>
      {messages > 0 && (
        <p style={{ marginTop: "24px", fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(9,20,38,0.5)" }}>
          {messages} total contact submissions received.
        </p>
      )}
    </div>
  );
}
