import { StatCard, SectionHeader, PageCard, DataTable, Badge } from "../components/UIComponents";

export default function RevisionsPage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard icon="layers" value="0" label="Open Revisions" />
        <StatCard icon="star" value="0" label="Completed This Month" />
        <StatCard icon="check" value="0" label="Awaiting Approval" />
        <StatCard icon="spark" value="0" label="Avg Rounds / Project" footnote="Review queue" />
      </div>

      <SectionHeader title="Revision Queue" subtitle="All pending feedback and change requests" accent="Pending" />

      <section className="widget-grid" style={{ gridTemplateColumns: "1fr" }}>
        <PageCard>
          <DataTable
            headers={["Revision #", "Project", "Requested By", "Priority", "Type", "Status", "Action"]}
            rows={[
              ["No revisions", "--", "--", <Badge variant="default">No Data</Badge>, "--", <Badge variant="default">No Data</Badge>, <button className="kpi-chip" style={{ border: "none", cursor: "pointer", opacity: 0.5 }} disabled>Open</button>],
            ]}
          />
        </PageCard>
      </section>

      <SectionHeader title="Active Revision Details" subtitle="Detailed view of work in progress" accent="Focus" />

      <section className="widget-grid">
        <article className="widget-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
          <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
            <strong>No active revisions</strong>
            <small>Revisions will appear here after backend integration</small>
          </div>
        </article>
      </section>
    </>
  );
}
