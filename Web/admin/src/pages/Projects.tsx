import { StatCard, SectionHeader, PageCard, DataTable, Badge } from "../components/UIComponents";

export default function ProjectsPage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard icon="layers" value="0" label="Active Projects" />
        <StatCard icon="check" value="0" label="Delivered (YTD)" />
        <StatCard icon="star" value="0" label="Total Completed" />
        <StatCard icon="spark" value="0" label="New Requests" footnote="Review pipeline" />
      </div>

      <SectionHeader title="Active Pipeline" subtitle="All projects currently in delivery" accent="Board" />

      <section className="widget-grid" style={{ gridTemplateColumns: "1fr" }}>
        <PageCard>
          <DataTable
            headers={["Project", "Client", "Type", "Phase", "Progress", "Due Date", "Action"]}
            rows={[
              ["No projects", "--", "--", <Badge variant="default">No Data</Badge>, "--", "--", <button className="kpi-chip" style={{ border: "none", cursor: "pointer", opacity: 0.5 }} disabled>Open</button>],
            ]}
          />
        </PageCard>
      </section>

      <SectionHeader title="Project Spotlight" subtitle="Key projects requiring attention" accent="Focus" />

      <section className="widget-grid">
        <article className="widget-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
          <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
            <strong>No active projects</strong>
            <small>Projects will appear here after backend integration</small>
          </div>
        </article>
      </section>
    </>
  );
}
