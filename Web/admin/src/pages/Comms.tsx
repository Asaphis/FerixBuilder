import { StatCard, SectionHeader, PageCard } from "../components/UIComponents";

export default function CommsPage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard icon="mail" value="0" label="Unread Messages" />
        <StatCard icon="check" value="0" label="Pending Approvals" />
        <StatCard icon="layers" value="0" label="Open Revisions" />
        <StatCard icon="ticket" value="0" label="Support Tickets" footnote="Respond now" />
      </div>

      <SectionHeader title="Recent Conversations" subtitle="Latest client communications" accent="Inbox" />

      <section className="widget-grid" style={{ gridTemplateColumns: "1fr" }}>
        <PageCard>
          <div style={{ display: "grid", gap: 4 }}>
            <div className="list-line" style={{ cursor: "pointer", padding: "16px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 6, background: "#e0e0e0", color: "#999", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>--</div>
                <div>
                  <strong style={{ fontSize: 14 }}>No messages</strong>
                  <small style={{ color: "var(--text-muted)", display: "block", marginTop: 2 }}>Messages will appear after backend integration</small>
                </div>
              </div>
            </div>
          </div>
        </PageCard>
      </section>

      <SectionHeader title="Feedback Activity" subtitle="Comments, approvals, and revision notes" accent="Stream" />

      <section className="widget-grid">
        <article className="widget-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
          <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
            <strong>No feedback activity</strong>
            <small>Comments and approvals will appear here</small>
          </div>
        </article>
      </section>
    </>
  );
}
