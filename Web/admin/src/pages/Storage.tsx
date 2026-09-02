import { StatCard, SectionHeader } from "../components/UIComponents";

export default function StoragePage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard icon="folder" value="0 GB" label="Storage Used" />
        <StatCard icon="check" value="0" label="Total Files" />
        <StatCard icon="chart" value="0%" label="CDN Cache Hit" />
        <StatCard icon="spark" value="0 GB" label="Plan Limit" footnote="Upgrade plan" />
      </div>
      <SectionHeader title="Media Library" subtitle="All uploaded assets and site files" accent="Gallery" />
      <section className="widget-grid">
        <article className="widget-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
          <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
            <strong>Cloudinary Not Connected</strong>
            <small>Connect Cloudinary to manage file storage</small>
          </div>
        </article>
      </section>
    </>
  );
}
