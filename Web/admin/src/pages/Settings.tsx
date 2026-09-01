import { SimpleContentPage } from "../components/UIComponents";

export default function SettingsPage() {
  return (
    <SimpleContentPage title="Platform Settings" iconClass="profile" icon="⚙">
      <div style={{ display: "grid", gap: 28 }}>
        <div>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, letterSpacing: "-0.01em" }}>Workspace Preferences</h3>
          <div className="stat-row">
            <div className="stat-row-item"><small>Timezone</small><strong>UTC+0 (London)</strong></div>
            <div className="stat-row-item"><small>Date Format</small><strong>YYYY-MM-DD</strong></div>
            <div className="stat-row-item"><small>Currency</small><strong>USD ($)</strong></div>
            <div className="stat-row-item"><small>Language</small><strong>English</strong></div>
          </div>
        </div>
        <div>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, letterSpacing: "-0.01em" }}>Notifications</h3>
          <div style={{ display: "grid", gap: 10 }}>
            {["Email Alerts for New Projects", "Push Notifications for Revisions", "Weekly Performance Digest", "System Outage Warnings", "Invoice Payment Confirmations"].map((n, i) => (
              <div key={n} className="list-line">
                <div><strong>{n}</strong><small>{i % 3 === 0 ? "Recommended to keep enabled" : "Optional alert"}</small></div>
                <div style={{ width: 40, height: 22, borderRadius: 999, background: i % 2 === 0 ? "linear-gradient(105deg, #2f6cff, #5f7bff)" : "#cfd6e4", position: "relative", cursor: "pointer" }}>
                  <div style={{ position: "absolute", top: 2, left: i % 2 === 0 ? 20 : 2, width: 18, height: 18, borderRadius: 999, background: "white", boxShadow: "0 2px 6px rgba(0,0,0,0.15)", transition: "left 0.15s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SimpleContentPage>
  );
}
