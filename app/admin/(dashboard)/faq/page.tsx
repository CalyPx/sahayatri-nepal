import { prisma } from "@/lib/prisma";
import { createFaqItem, updateFaqItem, deleteFaqItem } from "@/lib/actions/faq";
import { inputStyle, labelStyle, fieldStyle, cardStyle, primaryButtonStyle, dangerButtonStyle, pageHeadingStyle, sectionLabelStyle } from "@/components/admin/ui";

const textareaStyle = { ...inputStyle, minHeight: "70px", resize: "vertical" as const };

export default async function AdminFaqPage() {
  const items = await prisma.faqItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 style={pageHeadingStyle}>FAQ</h1>

      <div style={cardStyle}>
        <p style={sectionLabelStyle}>Add question</p>
        <form action={createFaqItem}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Question</label>
            <input name="question" required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Answer</label>
            <textarea name="answer" required style={textareaStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Order</label>
            <input name="order" type="number" defaultValue={items.length} style={inputStyle} />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px", fontFamily: "var(--font-sans)", fontSize: "13px" }}>
            <input name="published" type="checkbox" defaultChecked /> Published
          </label>
          <button type="submit" style={primaryButtonStyle}>Add question</button>
        </form>
      </div>

      {items.map((item) => (
        <div key={item.id} style={cardStyle}>
          <form action={updateFaqItem}>
            <input type="hidden" name="id" value={item.id} />
            <div style={fieldStyle}>
              <label style={labelStyle}>Question</label>
              <input name="question" defaultValue={item.question} required style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Answer</label>
              <textarea name="answer" defaultValue={item.answer} required style={textareaStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Order</label>
              <input name="order" type="number" defaultValue={item.order} style={inputStyle} />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px", fontFamily: "var(--font-sans)", fontSize: "13px" }}>
              <input name="published" type="checkbox" defaultChecked={item.published} /> Published
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={primaryButtonStyle}>Save</button>
              <button type="submit" formAction={deleteFaqItem} style={dangerButtonStyle}>Delete</button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}
