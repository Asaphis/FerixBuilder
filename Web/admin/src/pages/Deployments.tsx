import { StatCard, SectionHeader, PageCard, DataTable, Badge } from "../components/UIComponents";

export default function DeploymentsPage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard icon="globe" value="0" label="Live Sites" />
        <StatCard icon="check" value="0" label="Builds Today" />
        <StatCard icon="chart" value="0%" label="Uptime SLA" />
        <StatCard icon="spark" value="0" label="Failed Builds" footnote="View logs" />
      </div>

      <SectionHeader title="Deployment Regions" subtitle="Global edge network coverage and capacity" accent="Infrastructure" />

      <section className="widget-grid">
        <article className="widget-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
          <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
            <strong>Deployment Infrastructure Not Configured</strong>
            <small>Configure Cloudflare or deployment provider to manage deployments</small>
          </div>
        </article>
      </section>

      <SectionHeader title="Recent Builds" subtitle="Latest deployment activity" accent="Log" />

      <section className="widget-grid" style={{ gridTemplateColumns: "1fr" }}>
        <PageCard>
          <DataTable
            headers={["Build #", "Project", "Region", "Duration", "Triggered By", "Status"]}
            rows={[
              ["No builds", "--", "--", "--", "--", <Badge variant="default">No Data</Badge>],
            ]}
          />
        </PageCard>
      </section>
    </>
  );
}
