import { prisma } from "@/lib/prisma";
import { createFinancialAllocation, updateFinancialAllocation, deleteFinancialAllocation } from "@/lib/actions/finance";
import { inputStyle, labelStyle, fieldStyle, cardStyle, primaryButtonStyle, dangerButtonStyle, pageHeadingStyle, sectionLabelStyle } from "@/components/admin/ui";

export default async function AdminFinancePage() {
  const rows = await prisma.financialAllocation.findMany({ orderBy: { order: "asc" } });
  const total = rows.reduce((sum, r) => sum + r.percent, 0);

  return (
    <div>
      <h1 style={pageHeadingStyle}>Financial Transparency</h1>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: total === 100 ? "rgba(9,20,38,0.55)" : "#B04040", marginBottom: "20px" }}>
        Current allocation totals {total}%{total !== 100 ? " — should add up to 100%." : "."}
      </p>

      <div style={cardStyle}>
        <p style={sectionLabelStyle}>Add allocation row</p>
        <form action={createFinancialAllocation}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Label</label>
            <input name="label" required style={inputStyle} placeholder="Education" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Percent</label>
            <input name="percent" type="number" min={0} max={100} required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Color (hex)</label>
            <input name="color" defaultValue="#1A6FA8" required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Fiscal year</label>
            <input name="fiscalYear" required style={inputStyle} placeholder="2025" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Order</label>
            <input name="order" type="number" defaultValue={rows.length} style={inputStyle} />
          </div>
          <button type="submit" style={primaryButtonStyle}>Add row</button>
        </form>
      </div>

      {rows.map((row) => (
        <div key={row.id} style={cardStyle}>
          <form action={updateFinancialAllocation}>
            <input type="hidden" name="id" value={row.id} />
            <div style={fieldStyle}>
              <label style={labelStyle}>Label</label>
              <input name="label" defaultValue={row.label} required style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Percent</label>
              <input name="percent" type="number" min={0} max={100} defaultValue={row.percent} required style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Color (hex)</label>
              <input name="color" defaultValue={row.color} required style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Fiscal year</label>
              <input name="fiscalYear" defaultValue={row.fiscalYear} required style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Order</label>
              <input name="order" type="number" defaultValue={row.order} style={inputStyle} />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={primaryButtonStyle}>Save</button>
              <button type="submit" formAction={deleteFinancialAllocation} style={dangerButtonStyle}>Delete</button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}
