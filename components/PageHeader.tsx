export default function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div style={{ background: "#091426", padding: "clamp(140px,16vw,200px) 0 clamp(56px,7vw,88px)" }}>
      <div className="section-inner" style={{ maxWidth: "760px" }}>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "11px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#D4AF37",
            marginBottom: "20px",
          }}
        >
          {eyebrow}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(36px,5vw,56px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#FAFAF7",
            marginBottom: description ? "16px" : 0,
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.65)",
              maxWidth: "56ch",
            }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
