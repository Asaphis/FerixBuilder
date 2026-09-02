import { StatCard, SectionHeader } from "../components/UIComponents";

export default function TemplatesPage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard icon="boxes" value="0" label="Total Templates" />
        <StatCard icon="check" value="0" label="Used This Month" />
        <StatCard icon="star" value="0" label="Avg Rating" />
        <StatCard icon="spark" value="0" label="New This Q" footnote="Browse all" />
      </div>
      <SectionHeader title="Template Gallery" subtitle="Starter kits for rapid project scaffolding" accent="Library" />
      <section className="widget-grid">
        <article className="widget-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
          <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
            <strong>No Templates Available</strong>
            <small>Templates will be added after backend implementation</small>
          </div>
        </article>
      </section>
    </>
  );
}
