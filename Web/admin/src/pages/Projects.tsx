import { StatCard, SectionHeader, PageCard, DataTable, Badge } from "../components/UIComponents";

export default function ProjectsPage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard iconClass="level3" icon="◎" value="15" label="Active Projects" />
        <StatCard iconClass="tasks" icon="✓" value="36" label="Delivered (YTD)" />
        <StatCard iconClass="rank" icon="★" value="142" label="Total Completed" />
        <StatCard iconClass="profile" icon="♦" value="5" label="New Requests" footnote="Review pipeline" />
      </div>

      <SectionHeader title="Active Pipeline" subtitle="All projects currently in delivery" accent="Board" />

      <section className="widget-grid" style={{ gridTemplateColumns: "1fr" }}>
        <PageCard>
          <DataTable
            headers={["Project", "Client", "Type", "Phase", "Progress", "Due Date", "Action"]}
            rows={[
              ["Redesign v3", "Acme Corp", "Business Site", <Badge variant="warning">Design Phase</Badge>, "65%", "2026-09-15", <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>Open</button>],
              ["E-commerce Plus", "Zenith Labs", "Web Store", <Badge variant="info">Development</Badge>, "40%", "2026-10-02", <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>Open</button>],
              ["Marketing Hub", "Blue Harbor", "Landing + Blog", <Badge variant="success">QA Review</Badge>, "92%", "2026-09-05", <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>Open</button>],
              ["Intranet Portal", "Northwind Co", "Custom App", <Badge variant="warning">Design Phase</Badge>, "20%", "2026-11-01", <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>Open</button>],
              ["Product Launch", "Stellar Industries", "Landing Page", <Badge variant="info">Development</Badge>, "55%", "2026-09-20", <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>Open</button>],
            ]}
          />
        </PageCard>
      </section>

      <SectionHeader title="Project Spotlight" subtitle="Key projects requiring attention" accent="Focus" />

      <section className="widget-grid">
        {[
          { title: "Acme Corp Redesign", client: "Acme Corp", phase: "Design Phase", progress: 65, due: "Sep 15", img: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=corporate%20business%20website%20design%20mockup%2C%20modern%20blue%20theme%2C%20clean%20layout&image_size=landscape_4_3" },
          { title: "Zenith E-commerce", client: "Zenith Labs", phase: "Development", progress: 40, due: "Oct 2", img: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20ecommerce%20website%20with%20product%20grid%2C%20pastel%20colors%2C%20ui%20mockup&image_size=landscape_4_3" },
          { title: "Blue Harbor Marketing", client: "Blue Harbor", phase: "QA Review", progress: 92, due: "Sep 5", img: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=marketing%20landing%20page%20design%20mockup%2C%20hero%20section%20with%20CTA%2C%20warm%20colors&image_size=landscape_4_3" },
          { title: "Northwind Intranet", client: "Northwind Co", phase: "Design Phase", progress: 20, due: "Nov 1", img: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=enterprise%20intranet%20dashboard%2C%20employee%20portal%2C%20purple%20theme%2C%20ui%20mockup&image_size=landscape_4_3" },
        ].map((p, i) => (
          <article className="widget-card" key={i}>
            <img src={p.img} alt={p.title} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6, marginBottom: 4 }} />
            <div className="widget-card-head"><span className="widget-label"><strong style={{ fontSize: 14 }}>{p.title}</strong></span><Badge variant="warning">{p.phase}</Badge></div>
            <small style={{ color: "var(--text-soft)" }}>{p.client} • Due {p.due}</small>
            <div style={{ height: 6, background: "#eef2f8", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${p.progress}%`, background: "linear-gradient(90deg, #2f6cff, #9c63ff)", borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", fontWeight: 700 }}>
              <span>{p.progress}% complete</span>
              <span>{100 - p.progress}% remaining</span>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
