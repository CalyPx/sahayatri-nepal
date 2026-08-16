"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: "40px", maxWidth: "600px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "22px", color: "#091426", marginBottom: "12px" }}>
        Something went wrong
      </h1>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          color: "#B04040",
          background: "rgba(176,64,64,0.08)",
          padding: "14px 16px",
          borderRadius: "8px",
          marginBottom: "20px",
          whiteSpace: "pre-wrap",
        }}
      >
        {error.message}
      </p>
      <button
        onClick={reset}
        style={{
          padding: "10px 20px",
          borderRadius: "6px",
          border: "none",
          background: "#D4AF37",
          color: "#091426",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "13px",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
