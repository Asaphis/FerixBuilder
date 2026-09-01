import React from "react";

export function StatCard({ iconClass, icon, value, label, footnote }: { iconClass: string; icon: string; value: string; label: string; footnote?: string }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${iconClass}`}>{icon}</div>
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {footnote && (
          <div className="stat-footnote">
            <span>•</span>
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

export function SimpleContentPage({ title, iconClass, icon, children }: { title: string; iconClass: string; icon: string; children: React.ReactNode }) {
  return (
    <>
      <div className="stat-strip">
        <StatCard iconClass={iconClass} icon={icon} value="Coming" label={`${title} Module`} />
        <StatCard iconClass="tasks" icon="✓" value="Ready" label="Data Structure" />
        <StatCard iconClass="rank" icon="★" value="Scaffolded" label="Page Layout" />
        <StatCard iconClass="profile" icon="♦" value="Soon" label="Next Upgrades" footnote="View roadmap" />
      </div>
      <SectionHeader title={title} subtitle="This module is fully laid out and ready for backend integration" accent="Overview" />
      <section className="widget-grid" style={{ gridTemplateColumns: "1fr" }}>
        <PageCard>{children}</PageCard>
      </section>
    </>
  );
}
