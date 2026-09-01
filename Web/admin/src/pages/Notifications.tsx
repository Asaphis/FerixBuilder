import { SimpleContentPage, Badge } from "../components/UIComponents";

export default function NotificationsPage() {
  return (
    <SimpleContentPage title="Notifications Center" icon="bell">
      <div style={{ display: "grid", gap: 4 }}>
        {[
          { t: "Build #4857 deployed successfully", m: "Acme Corp — Redesign v3 is now live", time: "2 min ago", dot: true, variant: "success" as const },
          { t: "New revision request RV-301", m: "Sarah at Acme Corp submitted 7 change requests", time: "14 min ago", dot: true, variant: "warning" as const },
          { t: "Invoice INV-1041 paid", m: "Zenith Labs settled $8,200", time: "1 hour ago", dot: true, variant: "success" as const },
          { t: "Build server US-EAST-1 at 62%", m: "Consider triggering autoscale if load exceeds 75%", time: "2 hours ago", dot: false, variant: "info" as const },
          { t: "Weekly digest ready", m: "15 projects active, $12,450 MRR, 99.9% uptime", time: "Yesterday", dot: false, variant: "default" as const },
          { t: "Support ticket #782 opened", m: "Blue Harbor needs domain connection assistance", time: "Yesterday", dot: true, variant: "danger" as const },
        ].map((n, i) => (
          <div key={i} className="list-line" style={{ padding: "16px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {n.dot && <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--primary)", flexShrink: 0 }} />}
              {!n.dot && <span style={{ width: 8, flexShrink: 0 }} />}
              <div>
                <strong style={{ fontSize: 14 }}>{n.t}</strong>
                <small style={{ color: "var(--text-muted)", display: "block", marginTop: 2 }}>{n.m}</small>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Badge variant={n.variant}>New</Badge>
              <small style={{ color: "var(--text-soft)" }}>{n.time}</small>
            </div>
          </div>
        ))}
      </div>
    </SimpleContentPage>
  );
}
