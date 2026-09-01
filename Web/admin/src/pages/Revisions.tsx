import { StatCard, SectionHeader, PageCard, DataTable, Badge } from "../components/UIComponents";

export default function RevisionsPage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard iconClass="level3" icon="◎" value="14" label="Open Revisions" />
        <StatCard iconClass="rank" icon="★" value="42" label="Completed This Month" />
        <StatCard iconClass="tasks" icon="✓" value="3" label="Awaiting Approval" />
        <StatCard iconClass="profile" icon="♦" value="2.1" label="Avg Rounds / Project" footnote="Review queue" />
      </div>

      <SectionHeader title="Revision Queue" subtitle="All pending feedback and change requests" accent="Pending" />

      <section className="widget-grid" style={{ gridTemplateColumns: "1fr" }}>
        <PageCard>
          <DataTable
            headers={["Revision #", "Project", "Requested By", "Priority", "Type", "Status", "Action"]}
            rows={[
              ["RV-301", "Acme Redesign v3", "Sarah (Acme)", <Badge variant="danger">High</Badge>, "Layout", <Badge variant="warning">In Progress</Badge>, <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>Open</button>],
              ["RV-300", "Zenith E-commerce", "Mike (Zenith)", <Badge variant="warning">Medium</Badge>, "Copy", <Badge variant="info">Submitted</Badge>, <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>Open</button>],
              ["RV-299", "Blue Harbor Marketing", "Lisa (Blue)", <Badge variant="default">Low</Badge>, "Image", <Badge variant="success">Done</Badge>, <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>View</button>],
              ["RV-298", "Northwind Intranet", "Tom (Nwd)", <Badge variant="warning">Medium</Badge>, "Functionality", <Badge variant="warning">In Progress</Badge>, <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>Open</button>],
              ["RV-297", "Stellar Launch", "Emma (Stellar)", <Badge variant="danger">High</Badge>, "Color", <Badge variant="success">Done</Badge>, <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>View</button>],
            ]}
          />
        </PageCard>
      </section>

      <SectionHeader title="Active Revision Details" subtitle="Detailed view of work in progress" accent="Focus" />

      <section className="widget-grid">
        <article className="widget-card">
          <div className="widget-card-head"><span className="widget-label"><span className="widget-badge network">⊙</span>RV-301 • Acme Redesign</span><Badge variant="danger">High Priority</Badge></div>
          <div className="feed-card">
            <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=annotated%20website%20wireframe%20with%20design%20feedback%20notes%20and%20arrows&image_size=portrait_4_3" alt="Revision mockup" />
            <div className="feed-copy">
              <div><small>Checkout Page Redesign</small><strong>7 Change Requests</strong><small>Due: Sep 3</small></div>
              <div className="feed-stats">
                <span className="feed-stat"><strong>3</strong><span>Fixed</span></span>
                <span className="feed-stat"><strong>2</strong><span>In Progress</span></span>
                <span className="feed-stat"><strong>2</strong><span>Queued</span></span>
              </div>
            </div>
          </div>
          <div className="list-line"><div><strong>Requestor</strong><small>Sarah Johnson, Acme Corp</small></div><Badge variant="info">Client</Badge></div>
        </article>

        <article className="widget-card">
          <div className="widget-card-head"><span className="widget-label"><span className="widget-badge inventory">◫</span>RV-300 • Zenith Store</span><Badge variant="warning">Medium</Badge></div>
          <div className="stat-row">
            <div className="stat-row-item"><small>Copy Updates</small><strong>18 items</strong></div>
            <div className="stat-row-item"><small>New Assets</small><strong>4 images</strong></div>
          </div>
          <div className="list-line"><div><strong>Product descriptions</strong><small>Category pages need tone update</small></div><Badge variant="info">Submitted</Badge></div>
          <div className="list-line"><div><strong>Hero banner copy</strong><small>Updated file uploaded</small></div><Badge variant="warning">In Review</Badge></div>
          <div className="list-line"><div><strong>Footer links update</strong><small>New legal pages added</small></div><Badge variant="info">Submitted</Badge></div>
        </article>
      </section>
    </>
  );
}
