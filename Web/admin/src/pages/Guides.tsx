import { SimpleContentPage } from "../components/UIComponents";

export default function GuidesPage() {
  return (
    <SimpleContentPage title="Admin Guides" icon="book">
      <div style={{ display: "grid", gap: 4 }}>
        <div className="list-line" style={{ padding: "16px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="stat-icon level3" style={{ width: 42, height: 42, fontSize: 15 }}>+</div>
            <div>
              <strong style={{ fontSize: 14 }}>No guides available</strong>
              <small style={{ color: "var(--text-muted)", display: "block", marginTop: 2 }}>Admin guides will be added after backend implementation</small>
            </div>
          </div>
        </div>
      </div>
    </SimpleContentPage>
  );
}
