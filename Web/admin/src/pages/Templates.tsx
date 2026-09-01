import { StatCard, SectionHeader, Badge } from "../components/UIComponents";

export default function TemplatesPage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard iconClass="level3" icon="▤" value="48" label="Total Templates" />
        <StatCard iconClass="tasks" icon="✓" value="12" label="Used This Month" />
        <StatCard iconClass="rank" icon="★" value="4.8" label="Avg Rating" />
        <StatCard iconClass="profile" icon="♦" value="6" label="New This Q" footnote="Browse all" />
      </div>
      <SectionHeader title="Template Gallery" subtitle="Starter kits for rapid project scaffolding" accent="Library" />
      <section className="widget-grid">
        {[
          { n: "Business Starter Pro", t: "SaaS / Agency", img: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20saas%20landing%20page%20template%2C%20hero%20section%2C%20features%20grid%2C%20pricing%20table%2C%20blue%20gradient&image_size=landscape_4_3", r: 4.9 },
          { n: "E-commerce Essential", t: "Storefront", img: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ecommerce%20template%20website%2C%20product%20grid%2C%20cart%20icon%2C%20warm%20cream%20colors&image_size=landscape_4_3", r: 4.8 },
          { n: "Portfolio Showcase", t: "Creative / Freelance", img: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=creative%20portfolio%20website%20template%2C%20case%20study%20layout%2C%20bold%20typography%2C%20black%20white&image_size=landscape_4_3", r: 4.7 },
          { n: "Corporate Intranet", t: "Enterprise App", img: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=intranet%20portal%20dashboard%20template%2C%20widgets%20cards%2C%20nav%20sidebar%2C%20purple%20theme&image_size=landscape_4_3", r: 4.9 },
          { n: "Restaurant & Cafe", t: "Food & Beverage", img: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=restaurant%20website%20template%2C%20menu%20section%2C%20reservation%20form%2C%20warm%20earthy%20colors&image_size=landscape_4_3", r: 4.6 },
          { n: "Launch Coming Soon", t: "Marketing Landing", img: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=coming%20soon%20launch%20page%20template%2C%20countdown%20timer%2C%20email%20capture%2C%20pastel%20gradient&image_size=landscape_4_3", r: 4.8 },
        ].map((tpl, i) => (
          <article className="widget-card" key={i}>
            <img src={tpl.img} alt={tpl.n} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 6 }} />
            <div className="widget-card-head"><span className="widget-label"><strong style={{ fontSize: 14 }}>{tpl.n}</strong></span><Badge variant="info">{tpl.t}</Badge></div>
            <div className="list-line"><div><strong>Rating</strong><small>Community score</small></div><strong>★ {tpl.r}</strong></div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="login-btn" style={{ padding: "10px 14px", flex: 1, fontSize: 12, margin: 0 }}>Use Template</button>
              <button className="widget-more" style={{ border: "1px solid var(--line)", background: "white", width: "auto", padding: "0 14px", color: "var(--text-muted)" }}>Preview</button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
