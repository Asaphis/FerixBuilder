import { StatCard, SectionHeader, Badge } from "../components/UIComponents";

export default function StoragePage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard iconClass="level3" icon="▤" value="48.2 GB" label="Storage Used" />
        <StatCard iconClass="tasks" icon="✓" value="1,284" label="Total Files" />
        <StatCard iconClass="rank" icon="★" value="82%" label="CDN Cache Hit" />
        <StatCard iconClass="profile" icon="♦" value="250 GB" label="Plan Limit" footnote="Upgrade plan" />
      </div>
      <SectionHeader title="Media Library" subtitle="All uploaded assets and site files" accent="Gallery" />
      <section className="widget-grid">
        {[
          { p: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=abstract%20hero%20banner%2C%20blue%20purple%20gradient%20waves%2C%20clean%20design&image_size=square", n: "hero-banner-v3.jpg", s: "2.4 MB", t: "Image" },
          { p: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=product%20photography%20mockup%2C%20clean%20white%20background%2C%20cosmetics%20bottle&image_size=square", n: "product-skincare.jpg", s: "1.8 MB", t: "Image" },
          { p: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=team%20photo%2C%20diverse%20startup%20people%20in%20office%2C%20warm%20lighting&image_size=square", n: "team-about-us.jpg", s: "3.1 MB", t: "Image" },
          { p: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=logo%20design%20mockup%2C%20modern%20geometric%20mark%2C%20blue%20purple%20gradient&image_size=square", n: "brand-logo.svg", s: "24 KB", t: "Vector" },
          { p: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=blog%20feature%20image%2C%20laptop%20on%20desk%20with%20coffee%2C%20soft%20focus&image_size=square", n: "blog-launch-tips.jpg", s: "2.9 MB", t: "Image" },
          { p: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=ecommerce%20category%20banner%2C%20shoes%20collection%2C%20pastel%20pink%20background&image_size=square", n: "cat-shoes-spring.jpg", s: "2.2 MB", t: "Image" },
          { p: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=icon%20set%20mockup%2C%20social%20media%20icons%2C%20rounded%20squares%2C%20gradient%20fill&image_size=square", n: "social-icons-pack.png", s: "412 KB", t: "Image" },
          { p: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=portfolio%20thumbnail%2C%20architectural%20building%20photography%2C%20blue%20sky&image_size=square", n: "portfolio-arch.jpg", s: "3.6 MB", t: "Image" },
        ].map((f, i) => (
          <article className="widget-card" key={i} style={{ padding: 12, gap: 10 }}>
            <img src={f.p} alt={f.n} style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: 6 }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><strong style={{ fontSize: 13, display: "block" }}>{f.n}</strong><small style={{ color: "var(--text-soft)", fontSize: 11 }}>{f.s}</small></div>
              <Badge variant="info">{f.t}</Badge>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
