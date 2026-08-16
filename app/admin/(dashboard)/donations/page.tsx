import { prisma } from "@/lib/prisma";
import { pageHeadingStyle } from "@/components/admin/ui";

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" });

const statusColor: Record<string, string> = {
  success: "#1A6FA8",
  pending: "#8C6D1F",
  failed: "#B04040",
};

export default async function AdminDonationsPage() {
  const donations = await prisma.donation.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  const totalSuccess = donations
    .filter((d) => d.status === "success")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div>
      <h1 style={pageHeadingStyle}>Donations</h1>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(9,20,38,0.65)", marginBottom: "20px" }}>
        NPR {totalSuccess.toLocaleString()} received across {donations.filter((d) => d.status === "success").length} successful donations.
      </p>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-sans)", fontSize: "13px" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(9,20,38,0.1)" }}>
              <th style={{ padding: "10px 8px" }}>Date</th>
              <th style={{ padding: "10px 8px" }}>Donor</th>
              <th style={{ padding: "10px 8px" }}>Amount</th>
              <th style={{ padding: "10px 8px" }}>Status</th>
              <th style={{ padding: "10px 8px" }}>Reference</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => (
              <tr key={d.id} style={{ borderBottom: "1px solid rgba(9,20,38,0.06)" }}>
                <td style={{ padding: "10px 8px", whiteSpace: "nowrap" }}>{dateFormatter.format(d.createdAt)}</td>
                <td style={{ padding: "10px 8px" }}>{d.donorName} <span style={{ color: "rgba(9,20,38,0.5)" }}>({d.donorEmail})</span></td>
                <td style={{ padding: "10px 8px" }}>{d.currency} {d.amount.toLocaleString()}</td>
                <td style={{ padding: "10px 8px", color: statusColor[d.status] ?? "#091426", fontWeight: 600 }}>{d.status}</td>
                <td style={{ padding: "10px 8px", fontFamily: "var(--font-mono)", fontSize: "11px" }}>{d.gatewayRef}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {donations.length === 0 && (
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(9,20,38,0.55)", marginTop: "16px" }}>
            No donations recorded yet.
          </p>
        )}
      </div>
    </div>
  );
}
