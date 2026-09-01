import { StatCard, SectionHeader, PageCard, Badge } from "../components/UIComponents";

export default function CommsPage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard icon="mail" value="32" label="Unread Messages" />
        <StatCard icon="check" value="8" label="Pending Approvals" />
        <StatCard icon="layers" value="14" label="Open Revisions" />
        <StatCard icon="ticket" value="5" label="Support Tickets" footnote="Respond now" />
      </div>

      <SectionHeader title="Recent Conversations" subtitle="Latest client communications" accent="Inbox" />

      <section className="widget-grid" style={{ gridTemplateColumns: "1fr" }}>
        <PageCard>
          <div style={{ display: "grid", gap: 4 }}>
            {[
              { name: "Acme Corp", subj: "Revisions needed on the checkout page", time: "2m ago", unread: true, avatar: "AC", gradient: "linear-gradient(145deg, #7fb3ff 0%, #497dff 100%)" },
              { name: "Zenith Labs", subj: "Love the new design! Ready for launch", time: "14m ago", unread: true, avatar: "ZL", gradient: "linear-gradient(145deg, #82e1c2 0%, #35b78d 100%)" },
              { name: "Blue Harbor", subj: "Can we schedule a call about API integration?", time: "1h ago", unread: false, avatar: "BH", gradient: "linear-gradient(145deg, #ffd8a1 0%, #ff9a6c 100%)" },
              { name: "Northwind Co", subj: "Invoice #1041 has been paid", time: "3h ago", unread: false, avatar: "NW", gradient: "linear-gradient(145deg, #a366ff 0%, #6949ff 100%)" },
              { name: "Stellar Industries", subj: "Domain DNS propagation confirmed", time: "Yesterday", unread: false, avatar: "SI", gradient: "linear-gradient(145deg, #ff9ab0 0%, #ef5b7d 100%)" },
            ].map((c, i) => (
              <div key={i} className="list-line" style={{ cursor: "pointer", padding: "16px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 6, background: c.gradient, color: "white", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{c.avatar}</div>
                  <div>
                    <strong style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                      {c.name}
                      {c.unread && <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--primary)" }} />}
                    </strong>
                    <small style={{ color: "var(--text-muted)", display: "block", marginTop: 2 }}>{c.subj}</small>
                  </div>
                </div>
                <small style={{ color: "var(--text-soft)" }}>{c.time}</small>
              </div>
            ))}
          </div>
        </PageCard>
      </section>

      <SectionHeader title="Feedback Activity" subtitle="Comments, approvals, and revision notes" accent="Stream" />

      <section className="widget-grid">
        <article className="widget-card">
          <div className="feed-card">
            <img src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=website%20design%20feedback%20screenshot%2C%20annotated%20UI%20mockup%20on%20screen%2C%20clean%20design&image_size=portrait_4_3" alt="Feedback" />
            <div className="feed-copy">
              <div><small>Acme Corp</small><strong>Checkout Flow</strong><small>6 comments</small></div>
              <div className="feed-stats">
                <span className="feed-stat"><strong>3</strong><span>Pending</span></span>
                <span className="feed-stat"><strong>2</strong><span>Fixed</span></span>
              </div>
            </div>
          </div>
        </article>
        <article className="widget-card">
          <div className="widget-card-head"><span className="widget-label"><span className="widget-badge social">+</span>Approval Requests</span></div>
          <div className="list-line"><div><strong>Zenith Labs — Final Design</strong><small>Awaiting client sign-off</small></div><Badge variant="warning">Pending</Badge></div>
          <div className="list-line"><div><strong>Northwind — API Spec</strong><small>Approved by stakeholder</small></div><Badge variant="success">Approved</Badge></div>
          <div className="list-line"><div><strong>Blue Harbor — Copy Review</strong><small>2 changes requested</small></div><Badge variant="danger">Rejected</Badge></div>
        </article>
      </section>
    </>
  );
}
