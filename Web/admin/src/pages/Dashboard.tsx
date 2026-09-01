import { StatCard, SectionHeader } from "../components/UIComponents";
import { financeStats, inventoryRows, networkRows, socialFeedStats } from "../types/adminTypes";

export default function DashboardPage() {
  return (
    <>
      <section className="welcome-hero">
        <div>
          <div className="welcome-row">
            <div className="partner-chips">
              <span className="partner-avatar jw">AC</span>
              <div className="partner-chip">
                <strong>Acme Corp</strong>
                <span>🚀</span>
              </div>
              <span className="partner-avatar mt">ZL</span>
              <div className="partner-chip">
                <strong>Zenith Labs</strong>
                <span>🚀</span>
              </div>
            </div>
            <span className="welcome-note">Your top 2 clients with pending website deliveries today.</span>
          </div>

          <div className="stat-strip">
            <StatCard iconClass="level3" icon="◎" value="15" label="Active Projects" />
            <StatCard iconClass="rank" icon="★" value="$12k" label="Pending Payments" />
            <StatCard iconClass="tasks" icon="✓" value="42" label="Revisions Done" />
            <StatCard iconClass="profile" icon="♦" value="5 New" label="Requests Pending" footnote="Review quotes" />
          </div>
        </div>

        <aside className="tip-card">
          <div className="tip-card-head">
            <span className="tip-title"><span>💡</span> Quick Action</span>
            <div className="tip-actions">
              <button type="button" className="tip-tab-btn primary">▷ View</button>
              <button type="button" className="tip-tab-btn">⋮</button>
            </div>
          </div>
          <div className="tip-content">
            <div className="tip-content-icon">⌕</div>
            <strong>New Project Request</strong>
            <p>Review the latest requirements submitted by Acme Corp for their new custom website build.</p>
          </div>
        </aside>
      </section>

      <SectionHeader title="Platform Operations" subtitle="Monitor your delivery pipeline and client communications." accent="Summary" />

      <section className="widget-grid">
        <article className="widget-card">
          <div className="widget-card-head">
            <span className="widget-label"><span className="widget-badge finance">▤</span>Platform Revenue</span>
            <button className="widget-more" type="button">⋯</button>
          </div>
          <div className="credit-card">
            <div className="card-brand">Stripe Connected</div>
            <div className="card-number">Revenue Overview</div>
            <div className="card-bottom">
              <div className="card-meta"><small>Status</small><strong>Active</strong></div>
              <div>
                <small className="card-meta">FerixBuilder</small>
                <div className="card-mark"><span /><span /></div>
              </div>
            </div>
          </div>
          <div className="stat-row">
            {financeStats.map((s) => (
              <div className="stat-row-item" key={s.label}>
                <small>{s.label}</small>
                <strong>{s.value}</strong>
                <span className={s.up ? "" : "down"}>{s.up ? "▲" : "▼"} {s.change}</span>
              </div>
            ))}
          </div>
          <div className="kpi-chip"><strong>$45,250</strong><span>Total Invoiced</span></div>
        </article>

        <article className="widget-card">
          <div className="widget-card-head">
            <span className="widget-label"><span className="widget-badge inventory">◫</span>Project Delivery</span>
            <button className="widget-more" type="button">⋯</button>
          </div>
          <div className="two-col-row">
            <div className="stat-row-item" style={{ background: "linear-gradient(145deg, #ffe9cf 0%, #ffcf98 100%)", border: "none" }}>
              <small style={{ color: "#8c5614" }}>Completed Sites</small>
              <strong style={{ color: "#5b3803" }}>142</strong>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <div className="stat-row-item"><small>Custom Web Apps</small><strong>45 Active</strong><span>▲ 15%</span></div>
              <div className="stat-row-item"><small>Business Sites</small><strong>97 Active</strong><span>▲ 12%</span></div>
            </div>
          </div>
          <div className="kpi-chip"><strong>15</strong><span>Active Revisions &nbsp; 3 Pending</span></div>
          <div>
            {inventoryRows.map((r) => (
              <div className="list-line" key={r.label}>
                <div><strong>{r.label}</strong></div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 18 }}>
                  <strong style={{ fontSize: 16, letterSpacing: "-0.02em" }}>{r.value}</strong>
                  <span className={`line-badge ${r.badge}`}>{r.label === "In Progress" ? "In Progress" : "Delivered"}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="widget-card">
          <div className="widget-card-head">
            <span className="widget-label"><span className="widget-badge network">⊙</span>System Deployments</span>
            <button className="widget-more" type="button">⋯</button>
          </div>
          <div className="chart-mini">
            <svg viewBox="0 0 320 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="networkFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#ff8fa7" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#ff8fa7" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M10 78 C 50 52, 80 98, 110 86 S 170 28, 200 48 S 260 72, 300 34 L 300 110 L 10 110 Z" fill="url(#networkFill)" />
              <path d="M10 78 C 50 52, 80 98, 110 86 S 170 28, 200 48 S 260 72, 300 34" fill="none" stroke="#ef5b7d" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <div className="kpi-chip"><strong>Build Servers</strong><span>#EU-WEST-1 &nbsp; • &nbsp; 45% Load</span></div>
          <div>
            {networkRows.map((r) => (
              <div className="list-line" key={r.label}>
                <div><strong>{r.label}</strong><small>{r.meta}</small></div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 18 }}>
                  <strong style={{ fontSize: 16, letterSpacing: "-0.02em" }}>{r.value}</strong>
                  <span className={`line-badge ${r.badge}`}>{r.badge === "resolved" ? "Success" : "Building"}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="widget-card">
          <div className="widget-card-head">
            <span className="widget-label"><span className="widget-badge social">☘</span>Client Requests</span>
            <button className="widget-more" type="button">⋯</button>
          </div>
          <div className="feed-card">
            <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20website%20dashboard%20mockup%20on%20laptop%2C%20clean%20ui%20ux%20design%2C%20pastel%20background&image_size=portrait_4_3" alt="Website Preview" />
            <div className="feed-copy">
              <div><small>Latest Requirement</small><strong>Zenith Labs</strong><small>E-commerce Site</small></div>
              <div className="feed-stats">
                {socialFeedStats.map((s) => (
                  <span className="feed-stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></span>
                ))}
              </div>
            </div>
          </div>
          <div className="feed-tile">
            <div className="feed-tile-item social">
              <div className="feed-tile-icon">♪</div>
              <div className="feed-tile-copy"><strong>New Ticket</strong><small>Domain connection assistance needed...</small></div>
            </div>
            <div className="feed-tile-item bookmark">
              <div className="feed-tile-icon">♡</div>
              <div className="feed-tile-copy"><strong>Approved</strong><small>Client accepted final delivery</small></div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
