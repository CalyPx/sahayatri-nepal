import { prisma } from "@/lib/prisma";
import { createStory, updateStory, deleteStory } from "@/lib/actions/stories";
import { inputStyle, labelStyle, fieldStyle, cardStyle, primaryButtonStyle, dangerButtonStyle, pageHeadingStyle, sectionLabelStyle } from "@/components/admin/ui";

const textareaStyle = { ...inputStyle, minHeight: "90px", resize: "vertical" as const };

export default async function AdminStoriesPage() {
  const stories = await prisma.story.findMany({ orderBy: { date: "desc" } });

  return (
    <div>
      <h1 style={pageHeadingStyle}>Stories</h1>

      <div style={cardStyle}>
        <p style={sectionLabelStyle}>Add story</p>
        <form action={createStory} encType="multipart/form-data">
          <div style={fieldStyle}>
            <label style={labelStyle}>Title</label>
            <input name="title" required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>URL slug (optional — derived from title if left blank)</label>
            <input name="slug" style={inputStyle} placeholder="e.g. rajan" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Student name</label>
            <input name="studentName" required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Pull quote</label>
            <input name="quote" required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Story body (use a blank line between paragraphs)</label>
            <textarea name="body" required style={textareaStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Photo</label>
            <input name="photo" type="file" accept="image/*" style={inputStyle} />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px", fontFamily: "var(--font-sans)", fontSize: "13px" }}>
            <input name="published" type="checkbox" defaultChecked /> Published
          </label>
          <button type="submit" style={primaryButtonStyle}>Add story</button>
        </form>
      </div>

      {stories.map((story) => (
        <div key={story.id} style={cardStyle}>
          <form action={updateStory} encType="multipart/form-data">
            <input type="hidden" name="id" value={story.id} />
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "rgba(9,20,38,0.4)", marginBottom: "10px" }}>
              /stories/{story.slug}
            </p>
            <div style={fieldStyle}>
              <label style={labelStyle}>Title</label>
              <input name="title" defaultValue={story.title} required style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Student name</label>
              <input name="studentName" defaultValue={story.studentName} required style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Pull quote</label>
              <input name="quote" defaultValue={story.quote} required style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Story body</label>
              <textarea name="body" defaultValue={story.body} required style={textareaStyle} />
            </div>
            {story.photoUrl && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(9,20,38,0.5)", marginBottom: "6px" }}>
                Current photo: {story.photoUrl}
              </p>
            )}
            <div style={fieldStyle}>
              <label style={labelStyle}>Replace photo</label>
              <input name="photo" type="file" accept="image/*" style={inputStyle} />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px", fontFamily: "var(--font-sans)", fontSize: "13px" }}>
              <input name="published" type="checkbox" defaultChecked={story.published} /> Published
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={primaryButtonStyle}>Save</button>
              <button type="submit" formAction={deleteStory} style={dangerButtonStyle}>Delete</button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}
