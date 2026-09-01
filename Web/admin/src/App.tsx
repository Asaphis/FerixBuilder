import { useState } from "react";
import type { PageKey } from "./types/adminTypes";
import { mainSections, pageTitles } from "./types/adminTypes";
import DashboardPage from "./pages/Dashboard";
import BillingPage from "./pages/Billing";
import DeploymentsPage from "./pages/Deployments";
import CommsPage from "./pages/Comms";
import ProjectsPage from "./pages/Projects";
import RevisionsPage from "./pages/Revisions";
import GuidesPage from "./pages/Guides";
import SettingsPage from "./pages/Settings";
import NotificationsPage from "./pages/Notifications";
import StoragePage from "./pages/Storage";
import DeliveriesPage from "./pages/Deliveries";
import ProfilePage from "./pages/Profile";
import ClientsPage from "./pages/Clients";
import TicketsPage from "./pages/Tickets";
import AuditPage from "./pages/Audit";
import ApiPage from "./pages/Api";
import TemplatesPage from "./pages/Templates";

function PageRouter({ page }: { page: PageKey }) {
  switch (page) {
    case "dashboard": return <DashboardPage />;
    case "billing": return <BillingPage />;
    case "deployments": return <DeploymentsPage />;
    case "comms": return <CommsPage />;
    case "projects": return <ProjectsPage />;
    case "revisions": return <RevisionsPage />;
    case "guides": return <GuidesPage />;
    case "settings": return <SettingsPage />;
    case "notifications": return <NotificationsPage />;
    case "storage": return <StoragePage />;
    case "deliveries": return <DeliveriesPage />;
    case "profile": return <ProfilePage />;
    case "clients": return <ClientsPage />;
    case "tickets": return <TicketsPage />;
    case "audit": return <AuditPage />;
    case "api": return <ApiPage />;
    case "templates": return <TemplatesPage />;
    default: return <DashboardPage />;
  }
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageKey>("dashboard");

  const handleNav = (page: PageKey) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-brand">
            <div className="brand-mark">F</div>
            <div className="brand-text"><strong>FerixBuilder</strong><span>Platform Admin</span></div>
          </div>
          <h1>Welcome Back</h1>
          <p>Please enter your credentials to access the operations hub.</p>
          <form onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="admin@ferixbuilder.com" required defaultValue="admin@ferixbuilder.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required defaultValue="password" />
            </div>
            <button type="submit" className="login-btn">Log In to Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  const meta = pageTitles[currentPage];

  return (
    <div className="admin-shell">
      {sidebarOpen ? (
        <button className="admin-sidebar-overlay visible" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" type="button" />
      ) : null}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-mark">F</div>
          <div className="brand-text"><strong>FerixBuilder</strong><span>Platform Admin</span></div>
        </div>

        {mainSections.map((section) => (
          <div className="sidebar-section" key={section.title}>
            <div className="sidebar-section-title">
              <span>{section.title}</span>
              <span>{section.icon ?? "›"}</span>
            </div>
            {section.items.map((item) => (
              <button
                type="button"
                key={item.page}
                className={`sidebar-nav-item ${currentPage === item.page ? "active" : ""}`}
                onClick={() => handleNav(item.page)}
              >
                <span className="sidebar-nav-icon">{currentPage === item.page ? "◉" : "⊙"}</span>
                <span className="sidebar-nav-text">{item.label}</span>
                <span className="sidebar-nav-meta">
                  {item.dot ? <span className={`nav-dot ${item.dot === "active" ? "active" : ""}`} /> : null}
                  {item.badge ? <span className="nav-pill">{item.badge}</span> : null}
                </span>
              </button>
            ))}
          </div>
        ))}

        <div className="sidebar-footer">
          <div className="sidebar-upgrade-card">
            <strong>Platform Updates</strong>
            <p>Review the latest features added to the site builder.</p>
            <button type="button">View changelog</button>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="topbar-menu" type="button" onClick={() => setSidebarOpen((v) => !v)} aria-label="Open navigation">☰</button>
          <div className="topbar-search">
            <span>⌕</span>
            <input placeholder="Search clients, projects..." />
          </div>
          <div className="topbar-tabs">
            <span>Projects</span>
            <span>Clients</span>
            <span>System</span>
          </div>
          <div className="topbar-actions">
            <button className="topbar-icon-btn" type="button" aria-label="Toggle theme">⚙</button>
            <button className="topbar-icon-btn badge" type="button" aria-label="Notifications" onClick={() => handleNav("notifications")}>⚲</button>
            <button className="topbar-icon-btn badge" type="button" aria-label="Messages" onClick={() => handleNav("comms")}>✉</button>
            <div className="topbar-user">
              <div className="topbar-user-text"><strong>Ferix Admin</strong><span>Platform Owner</span></div>
              <div className="topbar-avatar" onClick={() => handleNav("profile")} style={{ cursor: "pointer" }}>FA</div>
            </div>
          </div>
        </header>

        <section className="admin-page-head">
          <div className="admin-page-head-left">
            <div className="admin-head-kicker">{meta.kicker}</div>
            <h1>
              {currentPage === "dashboard" ? "Welcome," : meta.title.split(" ")[0] + ","}
              {currentPage === "dashboard" ? (
                <>
                  <strong>FerixAdmin</strong>
                  <p>{meta.subtitle}</p>
                </>
              ) : (
                <>
                  <strong style={{ fontSize: 30 }}>{meta.title.replace(/^\S+\s?/, "") || "Overview"}</strong>
                  <p>{meta.subtitle}</p>
                </>
              )}
            </h1>
          </div>
          <div className="admin-page-head-right">
            <div className="head-date-chip"><span>Today's Deliveries</span><span>▾</span></div>
            <button className="head-icon-btn" type="button" aria-label="Download Report">⬇</button>
            <button className="head-icon-btn" type="button" aria-label="Filter Metrics">◷</button>
            <button className="head-icon-btn" type="button" aria-label="Favorite View">★</button>
          </div>
        </section>

        <PageRouter page={currentPage} />

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
