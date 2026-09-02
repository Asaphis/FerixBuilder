import { StatCard, SectionHeader } from "../components/UIComponents";

export default function ApiPage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard icon="globe" value="0" label="API Calls Today" />
        <StatCard icon="check" value="0%" label="Success Rate" />
        <StatCard icon="clock" value="0 ms" label="Avg Latency" />
        <StatCard icon="shield" value="0" label="API Keys" footnote="Manage keys" />
      </div>
      <SectionHeader title="API Reference" subtitle="REST endpoints for platform integration" accent="Developers" />
      <section className="widget-grid">
        <article className="widget-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
          <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
            <strong>API Documentation Not Available</strong>
            <small>API endpoints will be documented after backend implementation</small>
          </div>
        </article>
      </section>
    </>
  );
}
