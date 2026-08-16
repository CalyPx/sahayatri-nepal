import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { createGalleryPhoto, updateGalleryPhoto, deleteGalleryPhoto } from "@/lib/actions/gallery";
import { inputStyle, labelStyle, fieldStyle, cardStyle, primaryButtonStyle, dangerButtonStyle, pageHeadingStyle, sectionLabelStyle } from "@/components/admin/ui";

export default async function AdminGalleryPage() {
  const photos = await prisma.galleryPhoto.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 style={pageHeadingStyle}>Gallery</h1>

      <div style={cardStyle}>
        <p style={sectionLabelStyle}>Add photo</p>
        <form action={createGalleryPhoto} encType="multipart/form-data">
          <div style={fieldStyle}>
            <label style={labelStyle}>Photo</label>
            <input name="photo" type="file" accept="image/*" required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Caption (optional)</label>
            <input name="caption" style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Order</label>
            <input name="order" type="number" defaultValue={photos.length} style={inputStyle} />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px", fontFamily: "var(--font-sans)", fontSize: "13px" }}>
            <input name="published" type="checkbox" defaultChecked /> Published
          </label>
          <button type="submit" style={primaryButtonStyle}>Add photo</button>
        </form>
      </div>

      {photos.map((photo) => (
        <div key={photo.id} style={{ ...cardStyle, display: "flex", gap: "20px" }}>
          <div style={{ position: "relative", width: "120px", height: "90px", flexShrink: 0, borderRadius: "8px", overflow: "hidden", background: "rgba(9,20,38,0.05)" }}>
            <Image src={photo.photoUrl} alt="" fill sizes="120px" style={{ objectFit: "cover" }} />
          </div>
          <form action={updateGalleryPhoto} encType="multipart/form-data" style={{ flex: 1 }}>
            <input type="hidden" name="id" value={photo.id} />
            <div style={fieldStyle}>
              <label style={labelStyle}>Caption</label>
              <input name="caption" defaultValue={photo.caption} style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Replace photo</label>
              <input name="photo" type="file" accept="image/*" style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Order</label>
              <input name="order" type="number" defaultValue={photo.order} style={inputStyle} />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px", fontFamily: "var(--font-sans)", fontSize: "13px" }}>
              <input name="published" type="checkbox" defaultChecked={photo.published} /> Published
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={primaryButtonStyle}>Save</button>
              <button type="submit" formAction={deleteGalleryPhoto} style={dangerButtonStyle}>Delete</button>
            </div>
          </form>
        </div>
      ))}
    </div>
  );
}
