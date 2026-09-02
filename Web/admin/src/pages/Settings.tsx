import { SimpleContentPage } from "../components/UIComponents";

export default function SettingsPage() {
  return (
    <SimpleContentPage title="Platform Settings" icon="settings">
      <div style={{ display: "grid", gap: 28 }}>
        <div>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, letterSpacing: "-0.01em" }}>Workspace Preferences</h3>
          <div className="stat-row">
            <div className="stat-row-item"><small>Timezone</small><strong>--</strong></div>
            <div className="stat-row-item"><small>Date Format</small><strong>--</strong></div>
            <div className="stat-row-item"><small>Currency</small><strong>--</strong></div>
            <div className="stat-row-item"><small>Language</small><strong>--</strong></div>
          </div>
        </div>
        <div>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, letterSpacing: "-0.01em" }}>Notifications</h3>
          <div style={{ display: "grid", gap: 10 }}>
            <div className="list-line">
              <div><strong>Settings will be loaded from backend</strong><small>Configure notification preferences after backend integration</small></div>
            </div>
          </div>
        </div>
      </div>
    </SimpleContentPage>
  );
}
