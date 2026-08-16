"use client";

import { useState } from "react";

const AMOUNTS = ["500", "2000", "10000"];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.04)",
  color: "#FAFAF7",
  fontFamily: "var(--font-sans)",
  fontSize: "15px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontWeight: 600,
  fontSize: "13px",
  color: "rgba(255,255,255,0.85)",
  marginBottom: "6px",
};

export default function DonateForm({ initialAmount }: { initialAmount: string }) {
  const [amount, setAmount] = useState(initialAmount);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const donorName = String(data.get("donorName") ?? "");
    const donorEmail = String(data.get("donorEmail") ?? "");
    const amountValue = Number(amount);

    if (!amountValue || amountValue <= 0) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/donate/esewa/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountValue, donorName, donorEmail }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      const { formUrl, fields } = await res.json();

      const esewaForm = document.createElement("form");
      esewaForm.method = "POST";
      esewaForm.action = formUrl;
      for (const [key, value] of Object.entries(fields)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        esewaForm.appendChild(input);
      }
      document.body.appendChild(esewaForm);
      esewaForm.submit();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div>
        <label style={labelStyle}>Amount (NPR)</label>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
          {AMOUNTS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmount(a)}
              style={{
                padding: "10px 18px",
                borderRadius: "8px",
                border: amount === a ? "1.5px solid #D4AF37" : "1px solid rgba(255,255,255,0.2)",
                background: amount === a ? "rgba(212,175,55,0.1)" : "rgba(255,255,255,0.04)",
                color: amount === a ? "#D4AF37" : "#FAFAF7",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {a}
            </button>
          ))}
        </div>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Your name</label>
        <input name="donorName" required style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Your email</label>
        <input name="donorEmail" type="email" required style={inputStyle} />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          marginTop: "8px",
          padding: "16px",
          borderRadius: "8px",
          border: "none",
          background: "#D4AF37",
          color: "#091426",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "14px",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          cursor: status === "sending" ? "wait" : "pointer",
        }}
      >
        {status === "sending" ? "Redirecting to eSewa…" : "Continue to eSewa"}
      </button>
      {status === "error" && (
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#E08787" }}>
          Something went wrong — please check the amount and try again.
        </p>
      )}
    </form>
  );
}
