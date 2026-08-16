"use client";

import { useState } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(9,20,38,0.15)",
  fontFamily: "var(--font-sans)",
  fontSize: "15px",
  background: "#FFFFFF",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: "13px",
  color: "#091426",
  marginBottom: "6px",
};

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("done");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", color: "#1A6FA8" }}>
        ✓ Message sent. We&rsquo;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "520px" }}>
      <div>
        <label style={labelStyle}>Name</label>
        <input name="name" required style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <input name="email" type="email" required style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Subject</label>
        <input name="subject" required style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Message</label>
        <textarea name="message" required rows={6} style={{ ...inputStyle, resize: "vertical" }} />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          alignSelf: "flex-start",
          padding: "14px 32px",
          borderRadius: "8px",
          border: "none",
          background: "#D4AF37",
          color: "#091426",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "14px",
          cursor: status === "sending" ? "wait" : "pointer",
        }}
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#B04040" }}>
          Something went wrong — email us directly at hhnjumla25@gmail.com
        </p>
      )}
    </form>
  );
}
