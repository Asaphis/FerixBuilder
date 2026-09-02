import { SimpleContentPage } from "../components/UIComponents";

export default function NotificationsPage() {
  return (
    <SimpleContentPage title="Notifications Center" icon="bell">
      <div style={{ display: "grid", gap: 4 }}>
        <div className="list-line" style={{ padding: "16px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 8, flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: 14 }}>No notifications</strong>
              <small style={{ color: "var(--text-muted)", display: "block", marginTop: 2 }}>Notifications will appear after backend integration</small>
            </div>
          </div>
        </div>
      </div>
    </SimpleContentPage>
  );
}
