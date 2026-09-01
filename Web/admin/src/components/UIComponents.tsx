import React from "react";

export type IconName =
  | "menu"
  | "search"
  | "settings"
  | "bell"
  | "mail"
  | "chevronDown"
  | "download"
  | "filter"
  | "star"
  | "moreH"
  | "moreV"
  | "play"
  | "bolt"
  | "chart"
  | "layers"
  | "boxes"
  | "user"
  | "users"
  | "ticket"
  | "shield"
  | "code"
  | "layout"
  | "truck"
  | "book"
  | "folder"
  | "folderOpen"
  | "clock"
  | "check"
  | "diamond"
  | "spark"
  | "heart"
  | "music"
  | "home"
  | "globe"
  | "flag"
  | "activity";

export function Icon({ name, size = 16, color = "currentColor", strokeWidth = 1.75 }: { name: IconName; size?: number; color?: string; strokeWidth?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "menu":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "search":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Z" />
          <path d="M10 21a2 2 0 0 0 4 0" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg {...common} aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "download":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 3v13" />
          <path d="m7 11 5 5 5-5" />
          <path d="M5 21h14" />
        </svg>
      );
    case "filter":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M4 5h16" />
          <path d="M7 12h10" />
          <path d="M10 19h4" />
        </svg>
      );
    case "star":
      return (
        <svg {...common} aria-hidden="true">
          <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.2 1 5.9L12 17.1l-5.2 2.7 1-5.9L3.5 9.7l5.9-.8 2.6-5.4Z" />
        </svg>
      );
    case "moreH":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="5" cy="12" r="1.3" fill="currentColor" />
          <circle cx="12" cy="12" r="1.3" fill="currentColor" />
          <circle cx="19" cy="12" r="1.3" fill="currentColor" />
        </svg>
      );
    case "moreV":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="5" r="1.3" fill="currentColor" />
          <circle cx="12" cy="12" r="1.3" fill="currentColor" />
          <circle cx="12" cy="19" r="1.3" fill="currentColor" />
        </svg>
      );
    case "play":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 15V11" />
          <path d="M12 15V7" />
          <path d="M17 15v-5" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common} aria-hidden="true">
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 13 9 5 9-5" />
          <path d="m3 17 9 5 9-5" />
        </svg>
      );
    case "boxes":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3 8h8v8H3z" />
          <path d="M13 4h8v8h-8z" />
          <path d="M13 16h8v4h-8z" />
        </svg>
      );
    case "user":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="8.5" r="3.5" />
          <path d="M4.5 20.5c1-3.5 4-5.5 7.5-5.5s6.5 2 7.5 5.5" />
        </svg>
      );
    case "users":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="9" cy="9" r="3" />
          <path d="M2.5 20c1-3 3.5-4.5 6.5-4.5s5.5 1.5 6.5 4.5" />
          <circle cx="17" cy="8" r="2.5" />
          <path d="M21.5 18c.5-2.2-1.7-3.8-4.5-3.8s-5 1.6-4.5 3.8" />
        </svg>
      );
    case "ticket":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z" />
          <path d="M13 6v12" strokeDasharray="2 2" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 3.5 4.5 6v6c0 4.5 3.2 8 7.5 9 4.3-1 7.5-4.5 7.5-9V6l-7.5-2.5Z" />
          <path d="m9 12.2 2.2 2.2 4-4.4" />
        </svg>
      );
    case "code":
      return (
        <svg {...common} aria-hidden="true">
          <path d="m8 9-3.5 3L8 15" />
          <path d="m16 9 3.5 3L16 15" />
          <path d="m13.5 7-3 10" />
        </svg>
      );
    case "layout":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3 7h10v10H3z" />
          <path d="M13 10h5l3 3v4h-8" />
          <circle cx="7" cy="18.5" r="1.8" />
          <circle cx="17.5" cy="18.5" r="1.8" />
        </svg>
      );
    case "book":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M5 4.5h9a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3v-12.5Z" />
          <path d="M5 17.5a3 3 0 0 1 3-3h9" />
        </svg>
      );
    case "folder":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.2L10.5 7H18a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 18 21H5.5A2.5 2.5 0 0 1 3 18.5v-11Z" />
        </svg>
      );
    case "folderOpen":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3 9a2 2 0 0 1 2-2h3.2l1.8 2H18a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z" />
          <path d="M3 11.5 4.8 19a2 2 0 0 0 2 1.6H20a2 2 0 0 0 2-1.5L20 12" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2.5" />
        </svg>
      );
    case "check":
      return (
        <svg {...common} aria-hidden="true">
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      );
    case "diamond":
      return (
        <svg {...common} aria-hidden="true">
          <path d="m6 4 6-1 6 1-3 7h-6L6 4Z" />
          <path d="M3 9h18l-9 11L3 9Z" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 3v5" />
          <path d="M12 16v5" />
          <path d="M3 12h5" />
          <path d="M16 12h5" />
          <path d="m5.6 5.6 3.6 3.6" />
          <path d="m14.8 14.8 3.6 3.6" />
          <path d="m5.6 18.4 3.6-3.6" />
          <path d="m14.8 9.2 3.6-3.6" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 20s-7.5-4.6-7.5-10A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7.5 3C19.5 15.4 12 20 12 20Z" />
        </svg>
      );
    case "music":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case "home":
      return (
        <svg {...common} aria-hidden="true">
          <path d="m3 11 9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2v-9Z" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a13.5 13.5 0 0 1 0 18a13.5 13.5 0 0 1 0-18Z" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M5 21V4" />
          <path d="M5 4h11l-2 4 2 4H5" />
        </svg>
      );
    case "activity":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3 12h4l2-6 4 12 2-6h6" />
        </svg>
      );
    default:
      return null;
  }
}

export function StatCard({ icon, tone = "violet", value, label, footnote }: { icon: IconName; tone?: "violet" | "orange" | "green" | "blue"; value: string; label: string; footnote?: string }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon name={icon} size={18} color="#fff" strokeWidth={2} />
      </div>
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {footnote && (
          <div className="stat-footnote">
            <span className="footnote-dot" />
            <a href="#">{footnote}</a>
          </div>
        )}
      </div>
    </article>
  );
}

export function SectionHeader({ title, subtitle, accent }: { title: string; subtitle?: string; accent?: string }) {
  return (
    <div className="summary-head">
      <h2>
        {title} {accent ? <strong>{accent}</strong> : null}
      </h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export function PageCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <article className={`widget-card ${className}`} style={{ padding: 0, overflow: "visible" }}>
      <div style={{ padding: 22 }}>{children}</div>
    </article>
  );
}

export function DataTable({ headers, rows }: { headers: string[]; rows: (string | number | JSX.Element)[][] }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: 6, border: "1px solid var(--line)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "#f5f8fd" }}>
            {headers.map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontWeight: 700, color: "var(--text-muted)", fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase", borderBottom: "1px solid var(--line)" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid var(--soft-line)" }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "12px 16px", color: "var(--text-strong)", verticalAlign: "middle" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "success" | "warning" | "danger" | "info" | "default" }) {
  const colors: Record<string, { bg: string; color: string }> = {
    success: { bg: "#eafbf3", color: "#10a272" },
    warning: { bg: "#fff1e0", color: "#c77600" },
    danger: { bg: "#fde8ec", color: "#d6314f" },
    info: { bg: "#eaf3ff", color: "#2d6fff" },
    default: { bg: "#f0f3f9", color: "#62708a" },
  };
  const c = colors[variant];
  return (
    <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 800, background: c.bg, color: c.color }}>
      {children}
    </span>
  );
}

export function SimpleContentPage({ title, icon, children }: { title: string; icon: IconName; children: React.ReactNode }) {
  return (
    <>
      <div className="stat-strip">
        <StatCard icon={icon} value="Coming" label={`${title} Module`} />
        <StatCard icon="check" value="Ready" label="Data Structure" />
        <StatCard icon="layout" value="Scaffolded" label="Page Layout" />
        <StatCard icon="spark" value="Soon" label="Next Upgrades" footnote="View roadmap" />
      </div>
      <SectionHeader title={title} subtitle="This module is fully laid out and ready for backend integration" accent="Overview" />
      <section className="widget-grid" style={{ gridTemplateColumns: "1fr" }}>
        <PageCard>{children}</PageCard>
      </section>
    </>
  );
}
