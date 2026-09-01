import { SimpleContentPage, Badge } from "../components/UIComponents";

export default function ProfilePage() {
  return (
    <SimpleContentPage title="Admin Profile" iconClass="profile" icon="👤">
      <div style={{ display: "grid", gap: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ width: 88, height: 88, borderRadius: 8, background: "linear-gradient(145deg, #ffd8a1 0%, #ff9a6c 100%)", display: "grid", placeItems: "center", color: "white", fontWeight: 800, fontSize: 30, letterSpacing: "-0.04em", boxShadow: "0 14px 30px rgba(255,154,108,0.3)" }}>FA</div>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, letterSpacing: "-0.03em" }}>Ferix Admin</h2>
            <small style={{ color: "var(--text-muted)", fontSize: 13 }}>Platform Owner • Joined Jan 2024</small>
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              <Badge variant="success">Verified</Badge>
              <Badge variant="info">Owner Role</Badge>
              <Badge variant="warning">2FA Enabled</Badge>
            </div>
          </div>
        </div>
        <div>
          <h3 style={{ margin: "0 0 14px", fontSize: 15 }}>Account Details</h3>
          <div className="stat-row" style={{ gridTemplateColumns: "repeat(2, minmax(0,1fr))" }}>
            <div className="stat-row-item"><small>Email Address</small><strong>admin@ferixbuilder.com</strong></div>
            <div className="stat-row-item"><small>Phone</small><strong>+1 (555) 123-4567</strong></div>
            <div className="stat-row-item"><small>Company</small><strong>FerixBuilder Inc.</strong></div>
            <div className="stat-row-item"><small>Role</small><strong>Platform Owner</strong></div>
          </div>
        </div>
      </div>
    </SimpleContentPage>
  );
}
