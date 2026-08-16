import type { Metadata } from "next";
import { login } from "@/lib/actions/auth";

export const metadata: Metadata = {
  title: "Admin Login — Sahayatri Nepal",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#091426",
        padding: "24px",
      }}
    >
      <form
        action={login}
        style={{
          width: "100%",
          maxWidth: "380px",
          background: "#FFFFFF",
          borderRadius: "var(--radius-lg, 16px)",
          padding: "40px 32px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "24px",
            color: "#091426",
            marginBottom: "6px",
          }}
        >
          Sahayatri Nepal — Admin
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(9,20,38,0.6)", marginBottom: "28px" }}>
          Sign in to manage site content.
        </p>

        {error && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              color: "#B04040",
              background: "rgba(176,64,64,0.08)",
              padding: "10px 14px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {error === "locked"
              ? "Too many failed attempts. Try again in 15 minutes."
              : "Invalid email or password."}
          </p>
        )}

        <label style={{ display: "block", marginBottom: "16px" }}>
          <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#091426", marginBottom: "6px" }}>
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            autoFocus
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid rgba(9,20,38,0.15)",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "24px" }}>
          <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 600, color: "#091426", marginBottom: "6px" }}>
            Password
          </span>
          <input
            type="password"
            name="password"
            required
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px solid rgba(9,20,38,0.15)",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
            }}
          />
        </label>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: "8px",
            border: "none",
            background: "#D4AF37",
            color: "#091426",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
