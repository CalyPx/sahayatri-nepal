import { prisma } from "@/lib/prisma";
import { createImpactStat, updateImpactStat, deleteImpactStat } from "@/lib/actions/impact";
import { inputStyle, labelStyle, fieldStyle, cardStyle, primaryButtonStyle, dangerButtonStyle, pageHeadingStyle, sectionLabelStyle } from "@/components/admin/ui";

export default async function AdminImpactPage() {
  const stats = await prisma.impactStat.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 style={pageHeadingStyle}>Impact Numbers</h1>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(9,20,38,0.55)", marginBottom: "20px" }}>
        The homepage shows these in order, with a distinct icon for each of the first three.
      </p>

      <div style={cardStyle}>
        <p style={sectionLabelStyle}>Add stat</p>
        <form action={createImpactStat}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Label</label>
            <input name="label" required style={inputStyle} placeholder="Students enrolled" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Sublabel</label>
            <input name="sublabel" required style={inputStyle} placeholder="Karnali Province" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Value</label>
            <input name="value" type="number" required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Suffix (optional)</label>
            <input name="suffix" style={inputStyle} placeholder="%" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Order</label>
            <input name="order" type="number" defaultValue={stats.length} style={inputStyle} />
          </div>
          <button type="submit" style={primaryButtonStyle}>Add stat</button>
        </form>
      </div>

      {stats.map((stat) => (
        <div key={stat.id} style={cardStyle}>
          <form action={updateImpactStat}>
            <input type="hidden" name="id" value={stat.id} />
            <div style={fieldStyle}>
              <label style={labelStyle}>Label</label>
              <input name="label" defaultValue={stat.label} required style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Sublabel</label>
              <input name="sublabel" defaultValue={stat.sublabel} required style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Value</label>
              <input name="value" type="number" defaultValue={stat.value} required style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Suffix</label>
              <input name="suffix" defaultValue={stat.suffix} style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Order</label>
              <input name="order" type="number" defaultValue={stat.order} style={inputStyle} />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={primaryButtonStyle}>Save</button>
              <button type="submit" formAction={deleteImpactStat} style={dangerButtonStyle}>Delete</button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}
