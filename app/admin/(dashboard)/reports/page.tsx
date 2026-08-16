import { prisma } from "@/lib/prisma";
import { createReport, updateReport, deleteReport } from "@/lib/actions/reports";
import { inputStyle, labelStyle, fieldStyle, cardStyle, primaryButtonStyle, dangerButtonStyle, pageHeadingStyle, sectionLabelStyle } from "@/components/admin/ui";

const textareaStyle = { ...inputStyle, minHeight: "90px", resize: "vertical" as const };

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default async function AdminReportsPage() {
  const reports = await prisma.report.findMany({ orderBy: { date: "desc" } });

  return (
    <div>
      <h1 style={pageHeadingStyle}>Reports</h1>

      <div style={cardStyle}>
        <p style={sectionLabelStyle}>Add report</p>
        <form action={createReport} encType="multipart/form-data">
          <div style={fieldStyle}>
            <label style={labelStyle}>Title</label>
            <input name="title" required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>URL slug (optional — derived from title if left blank)</label>
            <input name="slug" style={inputStyle} placeholder="e.g. see-2025" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Category</label>
            <input name="category" required style={inputStyle} placeholder="Education / Housing / Operations" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Date</label>
            <input name="date" type="date" style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Excerpt (shown on the reports list)</label>
            <textarea name="excerpt" required style={textareaStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Full body</label>
            <textarea name="body" required style={textareaStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Attach PDF (optional)</label>
            <input name="file" type="file" accept="application/pdf" style={inputStyle} />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px", fontFamily: "var(--font-sans)", fontSize: "13px" }}>
            <input name="published" type="checkbox" defaultChecked /> Published
          </label>
          <button type="submit" style={primaryButtonStyle}>Add report</button>
        </form>
      </div>

      {reports.map((report) => (
        <div key={report.id} style={cardStyle}>
          <form action={updateReport} encType="multipart/form-data">
            <input type="hidden" name="id" value={report.id} />
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(9,20,38,0.4)", marginBottom: "10px" }}>
              /reports/{report.slug}
            </p>
            <div style={fieldStyle}>
              <label style={labelStyle}>Title</label>
              <input name="title" defaultValue={report.title} required style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Category</label>
              <input name="category" defaultValue={report.category} required style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Date</label>
              <input name="date" type="date" defaultValue={toDateInputValue(report.date)} style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Excerpt</label>
              <textarea name="excerpt" defaultValue={report.excerpt} required style={textareaStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Full body</label>
              <textarea name="body" defaultValue={report.body} required style={textareaStyle} />
            </div>
            {report.fileUrl && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(9,20,38,0.5)", marginBottom: "6px" }}>
                Current file: {report.fileUrl}
              </p>
            )}
            <div style={fieldStyle}>
              <label style={labelStyle}>Replace PDF</label>
              <input name="file" type="file" accept="application/pdf" style={inputStyle} />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px", fontFamily: "var(--font-sans)", fontSize: "13px" }}>
              <input name="published" type="checkbox" defaultChecked={report.published} /> Published
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={primaryButtonStyle}>Save</button>
              <button type="submit" formAction={deleteReport} style={dangerButtonStyle}>Delete</button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}
