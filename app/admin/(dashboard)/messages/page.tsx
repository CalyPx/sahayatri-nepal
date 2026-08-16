import { prisma } from "@/lib/prisma";
import { toggleMessageHandled, deleteMessage } from "@/lib/actions/messages";
import { cardStyle, primaryButtonStyle, dangerButtonStyle, pageHeadingStyle } from "@/components/admin/ui";

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" });

export default async function AdminMessagesPage() {
  const messages = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 style={pageHeadingStyle}>Messages</h1>

      {messages.length === 0 && (
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(9,20,38,0.55)" }}>
          No contact form submissions yet.
        </p>
      )}

      {messages.map((m) => (
        <div key={m.id} style={{ ...cardStyle, opacity: m.handled ? 0.6 : 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <p style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "14px", color: "#091426" }}>
              {m.subject}
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(9,20,38,0.45)" }}>
              {dateFormatter.format(m.createdAt)}
            </p>
          </div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(9,20,38,0.6)", marginBottom: "10px" }}>
            {m.name} — <a href={`mailto:${m.email}`}>{m.email}</a>
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "#091426", whiteSpace: "pre-wrap", marginBottom: "14px" }}>
            {m.message}
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <form action={toggleMessageHandled}>
              <input type="hidden" name="id" value={m.id} />
              <input type="hidden" name="handled" value={String(m.handled)} />
              <button type="submit" style={primaryButtonStyle}>
                {m.handled ? "Mark unread" : "Mark handled"}
              </button>
            </form>
            <form action={deleteMessage}>
              <input type="hidden" name="id" value={m.id} />
              <button type="submit" style={dangerButtonStyle}>Delete</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
