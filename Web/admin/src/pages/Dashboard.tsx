import { StatCard, SectionHeader } from "../components/UIComponents";
import { useState, useEffect } from "react";
import { getAuthToken } from "../lib/realAuth";

export default function DashboardPage() {
  const [activeProjects, setActiveProjects] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = getAuthToken();
      if (!token) return;

      try {
        const API_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:5006/api";

        // Fetch stats from admin API
        const statsRes = await fetch(`${API_URL}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const statsData = await statsRes.json();
        
        if (statsData) {
          setActiveProjects(statsData.activeProjects || 0);
          setPendingRequests(statsData.pendingRequests || 0);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <section className="welcome-hero">
        <div>
          <div className="welcome-row">
            <div className="partner-chips">
              <span className="partner-avatar jw">--</span>
              <div className="partner-chip">
                <strong>{activeProjects} Active Projects</strong>
                <span>Connected to backend</span>
              </div>
            </div>
            <span className="welcome-note">Real-time project data from backend API.</span>
          </div>

          <div className="stat-strip">
            <StatCard icon="layers" value={activeProjects.toString()} label="Active Projects" />
            <StatCard icon="chart" value="$0" label="Pending Payments" />
            <StatCard icon="activity" value="0" label="Revisions Done" />
            <StatCard icon="spark" value={pendingRequests.toString()} label="Requests Pending" footnote="Review quotes" />
          </div>
        </div>

        <aside className="tip-card">
          <div className="tip-card-head">
            <span className="tip-title">Quick Action</span>
            <div className="tip-actions">
              <button type="button" className="tip-tab-btn primary">View</button>
              <button type="button" className="tip-tab-btn">⋮</button>
            </div>
          </div>
          <div className="tip-content">
            <div className="tip-content-icon">Setup</div>
            <strong>Backend Integration Required</strong>
            <p>Connect the backend API to display real project data and client information.</p>
          </div>
        </aside>
      </section>

      <SectionHeader title="Platform Operations" subtitle="Monitor your delivery pipeline and client communications." accent="Summary" />

      <section className="widget-grid">
        <article className="widget-card">
          <div className="widget-card-head">
            <span className="widget-label"><span className="widget-badge finance">$</span>Platform Revenue</span>
            <button className="widget-more" type="button">⋯</button>
          </div>
          <div className="credit-card">
            <div className="card-brand">Payment Gateway</div>
            <div className="card-number">Revenue Overview</div>
            <div className="card-bottom">
              <div className="card-meta"><small>Status</small><strong>Not Connected</strong></div>
              <div>
                <small className="card-meta">FerixBuilder</small>
                <div className="card-mark"><span /><span /></div>
              </div>
            </div>
          </div>
          <div className="stat-row">
            <div className="stat-row-item">
              <small>Monthly Recurring</small>
              <strong>$0</strong>
              <span>--</span>
            </div>
            <div className="stat-row-item">
              <small>Pending Payouts</small>
              <strong>$0</strong>
              <span>--</span>
            </div>
          </div>
          <div className="kpi-chip"><strong>$0</strong><span>Total Invoiced</span></div>
        </article>

        <article className="widget-card">
          <div className="widget-card-head">
            <span className="widget-label"><span className="widget-badge inventory">#</span>Project Delivery</span>
            <button className="widget-more" type="button">⋯</button>
          </div>
          <div className="two-col-row">
            <div className="stat-row-item" style={{ background: "linear-gradient(145deg, #ffe9cf 0%, #ffcf98 100%)", border: "none" }}>
              <small style={{ color: "#8c5614" }}>Completed Sites</small>
              <strong style={{ color: "#5b3803" }}>0</strong>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <div className="stat-row-item"><small>Custom Web Apps</small><strong>0 Active</strong><span>--</span></div>
              <div className="stat-row-item"><small>Business Sites</small><strong>0 Active</strong><span>--</span></div>
            </div>
          </div>
          <div className="kpi-chip"><strong>0</strong><span>Active Revisions &nbsp; 0 Pending</span></div>
          <div>
            <div className="list-line">
              <div><strong>In Progress</strong></div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 18 }}>
                <strong style={{ fontSize: 16, letterSpacing: "-0.02em" }}>0</strong>
                <span className="line-badge stock">In Progress</span>
              </div>
            </div>
            <div className="list-line">
              <div><strong>Delivered</strong></div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 18 }}>
                <strong style={{ fontSize: 16, letterSpacing: "-0.02em" }}>0</strong>
                <span className="line-badge resolved">Delivered</span>
              </div>
            </div>
          </div>
        </article>

        <article className="widget-card">
          <div className="widget-card-head">
            <span className="widget-label"><span className="widget-badge network">@</span>System Deployments</span>
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
          <div className="kpi-chip"><strong>Build Servers</strong><span>Not Configured</span></div>
          <div>
            <div className="list-line">
              <div><strong>Builds Triggered</strong><small>No data</small></div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 18 }}>
                <strong style={{ fontSize: 16, letterSpacing: "-0.02em" }}>0</strong>
                <span className="line-badge inprogress">Building</span>
              </div>
            </div>
            <div className="list-line">
              <div><strong>Successful Deploys</strong><small>No data</small></div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 18 }}>
                <strong style={{ fontSize: 16, letterSpacing: "-0.02em" }}>0</strong>
                <span className="line-badge resolved">Success</span>
              </div>
            </div>
          </div>
        </article>

        <article className="widget-card">
          <div className="widget-card-head">
            <span className="widget-label"><span className="widget-badge social">+</span>Client Requests</span>
            <button className="widget-more" type="button">⋯</button>
          </div>
          <div className="feed-card">
            <div style={{ width: "100%", height: 120, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
              <span style={{ color: "#999" }}>No preview available</span>
            </div>
            <div className="feed-copy">
              <div><small>Latest Requirement</small><strong>No data</strong><small>--</small></div>
              <div className="feed-stats">
                <span className="feed-stat"><strong>0</strong><span>Revisions</span></span>
                <span className="feed-stat"><strong>0</strong><span>Comments</span></span>
                <span className="feed-stat"><strong>0</strong><span>Approvals</span></span>
              </div>
            </div>
          </div>
          <div className="feed-tile">
            <div className="feed-tile-item social">
              <div className="feed-tile-icon">Ticket</div>
              <div className="feed-tile-copy"><strong>No Tickets</strong><small>Support tickets will appear here</small></div>
            </div>
            <div className="feed-tile-item bookmark">
              <div className="feed-tile-icon">Done</div>
              <div className="feed-tile-copy"><strong>No Approvals</strong><small>Client approvals will appear here</small></div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
