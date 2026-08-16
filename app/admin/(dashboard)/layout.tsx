import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "@/lib/actions/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Sahayatri Nepal",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/stories", label: "Stories" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/impact", label: "Impact Numbers" },
  { href: "/admin/finance", label: "Finance" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/donations", label: "Donations" },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#F7F5F2" }}>
      <aside
        style={{
          width: "220px",
          flexShrink: 0,
          background: "#091426",
          padding: "28px 16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "15px",
            color: "#FFFFFF",
            padding: "0 12px",
            marginBottom: "28px",
          }}
        >
          Sahayatri Admin
        </p>
        <nav style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.75)",
                textDecoration: "none",
                padding: "10px 12px",
                borderRadius: "6px",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logout}>
          <button
            type="submit"
            style={{
              width: "100%",
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.6)",
              background: "none",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "6px",
              padding: "10px 12px",
              cursor: "pointer",
            }}
          >
            Log out
          </button>
        </form>
      </aside>
      <main style={{ flex: 1, padding: "40px clamp(24px,4vw,56px)", maxWidth: "980px" }}>
        {children}
      </main>
    </div>
  );
}
