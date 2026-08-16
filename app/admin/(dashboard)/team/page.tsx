import { prisma } from "@/lib/prisma";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/actions/team";
import { inputStyle, labelStyle, fieldStyle, cardStyle, primaryButtonStyle, dangerButtonStyle, pageHeadingStyle, sectionLabelStyle } from "@/components/admin/ui";

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 style={pageHeadingStyle}>Team</h1>

      <div style={cardStyle}>
        <p style={sectionLabelStyle}>Add member</p>
        <form action={createTeamMember} encType="multipart/form-data">
          <div style={fieldStyle}>
            <label style={labelStyle}>Name</label>
            <input name="name" required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Role</label>
            <input name="role" required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Photo</label>
            <input name="photo" type="file" accept="image/*" style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Order</label>
            <input name="order" type="number" defaultValue={members.length} style={inputStyle} />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px", fontFamily: "var(--font-sans)", fontSize: "13px" }}>
            <input name="published" type="checkbox" defaultChecked /> Published
          </label>
          <button type="submit" style={primaryButtonStyle}>Add member</button>
        </form>
      </div>

      {members.map((member) => (
        <div key={member.id} style={cardStyle}>
          <form action={updateTeamMember} encType="multipart/form-data">
            <input type="hidden" name="id" value={member.id} />
            <div style={fieldStyle}>
              <label style={labelStyle}>Name</label>
              <input name="name" defaultValue={member.name} required style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Role</label>
              <input name="role" defaultValue={member.role} required style={inputStyle} />
            </div>
            {member.photoUrl && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(9,20,38,0.5)", marginBottom: "6px" }}>
                Current photo: {member.photoUrl}
              </p>
            )}
            <div style={fieldStyle}>
              <label style={labelStyle}>Replace photo</label>
              <input name="photo" type="file" accept="image/*" style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Order</label>
              <input name="order" type="number" defaultValue={member.order} style={inputStyle} />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px", fontFamily: "var(--font-sans)", fontSize: "13px" }}>
              <input name="published" type="checkbox" defaultChecked={member.published} /> Published
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={primaryButtonStyle}>Save</button>
              <button type="submit" formAction={deleteTeamMember} style={dangerButtonStyle}>Delete</button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}
