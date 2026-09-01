import { StatCard, SectionHeader, Badge } from "../components/UIComponents";

export default function ApiPage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard icon="globe" value="12.4K" label="API Calls Today" />
        <StatCard icon="check" value="99.98%" label="Success Rate" />
        <StatCard icon="clock" value="142 ms" label="Avg Latency" />
        <StatCard icon="shield" value="3" label="API Keys" footnote="Manage keys" />
      </div>
      <SectionHeader title="API Reference" subtitle="REST endpoints for platform integration" accent="Developers" />
      <section className="widget-grid">
        <article className="widget-card" style={{ gridColumn: "span 2" }}>
          <div className="widget-card-head"><span className="widget-label"><span className="widget-badge finance">$</span>Authentication</span></div>
          <pre style={{ margin: 0, padding: 16, borderRadius: 6, background: "#162036", color: "#cfd9ef", fontSize: 12, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", overflowX: "auto", lineHeight: 1.6 }}>
{`// POST /v1/auth/token
curl -X POST https://api.ferixbuilder.com/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"email":"admin@ferixbuilder.com","password":"••••••••"}'

// Response: { "token": "eyJhbGciOi...", "expiresIn": 3600 }`}
          </pre>
        </article>
        <article className="widget-card">
          <div className="widget-card-head"><span className="widget-label"><span className="widget-badge social">+</span>Endpoints</span></div>
          {[
            ["GET", "/v1/projects", "List all projects"],
            ["POST", "/v1/projects", "Create a project"],
            ["POST", "/v1/deploy", "Trigger a build"],
            ["GET", "/v1/billing", "Fetch billing data"],
            ["POST", "/v1/revisions", "Submit revision"],
          ].map(([m, p, d], i) => (
            <div key={i} className="list-line">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Badge variant={m === "GET" ? "success" : "warning"}>{m}</Badge>
                <code style={{ fontSize: 12, fontFamily: "ui-monospace, monospace", color: "var(--text-strong)", fontWeight: 700 }}>{p}</code>
              </div>
              <small style={{ color: "var(--text-muted)" }}>{d}</small>
            </div>
          ))}
        </article>
      </section>
    </>
  );
}
