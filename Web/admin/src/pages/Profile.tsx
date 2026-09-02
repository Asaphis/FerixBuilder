import { SimpleContentPage } from "../components/UIComponents";

export default function ProfilePage() {
  return (
    <SimpleContentPage title="Admin Profile" icon="user">
      <div style={{ display: "grid", gap: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ width: 88, height: 88, borderRadius: 8, background: "#e0e0e0", display: "grid", placeItems: "center", color: "#999", fontWeight: 800, fontSize: 30, letterSpacing: "-0.04em" }}>--</div>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, letterSpacing: "-0.03em" }}>Admin Profile</h2>
            <small style={{ color: "var(--text-muted)", fontSize: 13 }}>Profile will be loaded from backend</small>
          </div>
        </div>
        <div>
          <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>Account Details</h3>
          <div className="stat-row" style={{ gridTemplateColumns: "repeat(2, minmax(0,1fr))" }}>
            <div className="stat-row-item"><small>Email Address</small><strong>--</strong></div>
            <div className="stat-row-item"><small>Phone</small><strong>--</strong></div>
            <div className="stat-row-item"><small>Company</small><strong>--</strong></div>
            <div className="stat-row-item"><small>Role</small><strong>--</strong></div>
          </div>
        </div>
      </div>
    </SimpleContentPage>
  );
}
