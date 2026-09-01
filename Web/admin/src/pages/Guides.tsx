import { SimpleContentPage, Badge } from "../components/UIComponents";

export default function GuidesPage() {
  return (
    <SimpleContentPage title="Admin Guides" iconClass="level3" icon="📖">
      <div style={{ display: "grid", gap: 4 }}>
        {[
          { t: "Getting Started with FerixBuilder Admin", d: "Learn your way around the operations hub and key workflows", tag: "Basics" },
          { t: "Setting Up a New Client Project", d: "From client intake to first deployment — the complete checklist", tag: "Workflow" },
          { t: "Managing Billing and Invoicing", d: "Configure Stripe, set pricing tiers, and automate collections", tag: "Finance" },
          { t: "Deployment Pipeline Configuration", d: "Customize build servers, edge regions, and CI/CD rules", tag: "DevOps" },
          { t: "Revision & Approval Best Practices", d: "Streamline feedback loops and reduce revision rounds by 50%", tag: "Process" },
          { t: "Security and Access Control", d: "Two-factor auth, role-based permissions, and audit trails", tag: "Security" },
        ].map((g, i) => (
          <div key={i} className="list-line" style={{ padding: "16px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div className={`stat-icon ${i % 4 === 0 ? "level3" : i % 4 === 1 ? "rank" : i % 4 === 2 ? "tasks" : "profile"}`} style={{ width: 42, height: 42, fontSize: 15 }}>▤</div>
              <div>
                <strong style={{ fontSize: 14 }}>{g.t}</strong>
                <small style={{ color: "var(--text-muted)", display: "block", marginTop: 2 }}>{g.d}</small>
              </div>
            </div>
            <Badge variant="info">{g.tag}</Badge>
          </div>
        ))}
      </div>
    </SimpleContentPage>
  );
}
