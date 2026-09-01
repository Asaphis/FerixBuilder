import { StatCard, SectionHeader, PageCard, DataTable, Badge } from "../components/UIComponents";

export default function DeploymentsPage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard iconClass="level3" icon="⊙" value="82" label="Live Sites" />
        <StatCard iconClass="tasks" icon="✓" value="85" label="Builds Today" />
        <StatCard iconClass="rank" icon="★" value="99.9%" label="Uptime SLA" />
        <StatCard iconClass="profile" icon="♦" value="3" label="Failed Builds" footnote="View logs" />
      </div>

      <SectionHeader title="Deployment Regions" subtitle="Global edge network coverage and capacity" accent="Infrastructure" />

      <section className="widget-grid">
        <article className="widget-card">
          <div className="widget-card-head"><span className="widget-label"><span className="widget-badge network">⊙</span>EU-WEST-1 (Ireland)</span></div>
          <div className="chart-mini">
            <svg viewBox="0 0 320 120" preserveAspectRatio="none">
              <defs><linearGradient id="euFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ff8fa7" stopOpacity="0.35"/><stop offset="1" stopColor="#ff8fa7" stopOpacity="0"/></linearGradient></defs>
              <path d="M10 80 C 50 60, 90 90, 130 70 S 210 30, 250 50 S 300 60, 310 40 L 310 110 L 10 110 Z" fill="url(#euFill)"/>
              <path d="M10 80 C 50 60, 90 90, 130 70 S 210 30, 250 50 S 300 60, 310 40" fill="none" stroke="#ef5b7d" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="kpi-chip"><strong>45% Load</strong><span>24 / 48 Cores Active</span></div>
          <div className="list-line"><div><strong>Sites Hosted</strong></div><strong>38</strong></div>
          <div className="list-line"><div><strong>Status</strong></div><Badge variant="success">Healthy</Badge></div>
        </article>

        <article className="widget-card">
          <div className="widget-card-head"><span className="widget-label"><span className="widget-badge finance">▤</span>US-EAST-1 (Virginia)</span></div>
          <div className="chart-mini">
            <svg viewBox="0 0 320 120" preserveAspectRatio="none">
              <defs><linearGradient id="usFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7bb2ff" stopOpacity="0.35"/><stop offset="1" stopColor="#7bb2ff" stopOpacity="0"/></linearGradient></defs>
              <path d="M10 60 C 50 40, 90 70, 130 55 S 210 80, 250 60 S 300 30, 310 50 L 310 110 L 10 110 Z" fill="url(#usFill)"/>
              <path d="M10 60 C 50 40, 90 70, 130 55 S 210 80, 250 60 S 300 30, 310 50" fill="none" stroke="#4a86ff" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="kpi-chip"><strong>62% Load</strong><span>30 / 48 Cores Active</span></div>
          <div className="list-line"><div><strong>Sites Hosted</strong></div><strong>29</strong></div>
          <div className="list-line"><div><strong>Status</strong></div><Badge variant="warning">Busy</Badge></div>
        </article>

        <article className="widget-card">
          <div className="widget-card-head"><span className="widget-label"><span className="widget-badge social">☘</span>APAC-1 (Singapore)</span></div>
          <div className="chart-mini">
            <svg viewBox="0 0 320 120" preserveAspectRatio="none">
              <defs><linearGradient id="apFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#9be7c9" stopOpacity="0.35"/><stop offset="1" stopColor="#9be7c9" stopOpacity="0"/></linearGradient></defs>
              <path d="M10 70 C 50 80, 90 50, 130 65 S 210 45, 250 70 S 300 55, 310 75 L 310 110 L 10 110 Z" fill="url(#apFill)"/>
              <path d="M10 70 C 50 80, 90 50, 130 65 S 210 45, 250 70 S 300 55, 310 75" fill="none" stroke="#36c08d" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="kpi-chip"><strong>28% Load</strong><span>14 / 48 Cores Active</span></div>
          <div className="list-line"><div><strong>Sites Hosted</strong></div><strong>15</strong></div>
          <div className="list-line"><div><strong>Status</strong></div><Badge variant="success">Healthy</Badge></div>
        </article>

        <article className="widget-card">
          <div className="widget-card-head"><span className="widget-label"><span className="widget-badge inventory">◫</span>Build Queue</span></div>
          <div style={{ padding: "18px", borderRadius: 6, background: "linear-gradient(145deg, #ffe9cf 0%, #ffcf98 100%)", textAlign: "center" }}>
            <strong style={{ fontSize: 40, color: "#5b3803", letterSpacing: "-0.04em" }}>7</strong>
            <div style={{ color: "#8c5614", fontSize: 12, fontWeight: 700, marginTop: 4 }}>Pending Builds</div>
          </div>
          <div className="stat-row">
            <div className="stat-row-item"><small>Avg Build Time</small><strong>3.2 min</strong></div>
            <div className="stat-row-item"><small>Cache Hit Rate</small><strong>87%</strong></div>
          </div>
          <div className="list-line"><div><strong>Last Failed Build</strong><small>12 minutes ago</small></div><Badge variant="danger">#4821</Badge></div>
        </article>
      </section>

      <SectionHeader title="Recent Builds" subtitle="Latest deployment activity" accent="Log" />

      <section className="widget-grid" style={{ gridTemplateColumns: "1fr" }}>
        <PageCard>
          <DataTable
            headers={["Build #", "Project", "Region", "Duration", "Triggered By", "Status"]}
            rows={[
              ["#4857", "Acme Corp — Redesign", "EU-WEST-1", "2m 48s", "System", <Badge variant="success">Deployed</Badge>],
              ["#4856", "Zenith Labs — Store", "US-EAST-1", "4m 12s", "Manual", <Badge variant="success">Deployed</Badge>],
              ["#4855", "Blue Harbor — Blog", "US-EAST-1", "3m 05s", "Webhook", <Badge variant="warning">Building</Badge>],
              ["#4854", "Northwind — API", "APAC-1", "5m 30s", "Manual", <Badge variant="danger">Failed</Badge>],
              ["#4853", "Stellar — Landing", "EU-WEST-1", "2m 10s", "Webhook", <Badge variant="success">Deployed</Badge>],
            ]}
          />
        </PageCard>
      </section>
    </>
  );
}
