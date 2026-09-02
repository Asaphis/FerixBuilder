import { useState } from "react";
import type { PageKey } from "./types/adminTypes";
import { mainSections, pageTitles } from "./types/adminTypes";
import { Icon } from "./components/UIComponents";
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
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const email = (form.elements.namedItem('email') as HTMLInputElement).value;
      const password = (form.elements.namedItem('password') as HTMLInputElement).value;

      try {
        const API_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:5006/api";
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.error) {
          alert(data.error || 'Login failed');
          return;
        }

        if (data.token) {
          localStorage.setItem('adminToken', data.token);
          setIsAuthenticated(true);
        } else {
          alert('Login failed');
        }
      } catch (error) {
        alert('Login failed. Please check if backend is running.');
      }
    };

    return (
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-brand">
            <div className="brand-mark">
              <Icon name="layout" size={20} color="#fff" strokeWidth={2.25} />
            </div>
            <div className="brand-text"><strong>FerixBuilder</strong><span>Platform Admin</span></div>
          </div>
          <h1>Welcome Back</h1>
          <p>Please enter your credentials to access the operations hub.</p>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input name="email" type="email" placeholder="admin@ferixbuilder.com" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" placeholder="••••••••" required />
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
          <div className="brand-mark">
            <Icon name="layout" size={20} color="#fff" strokeWidth={2.25} />
          </div>
          <div className="brand-text"><strong>FerixBuilder</strong><span>Platform Admin</span></div>
        </div>

        {mainSections.map((section) => (
          <div className="sidebar-section" key={section.title}>
            <div className="sidebar-section-title">
              <span>{section.title}</span>
              <Icon name={section.icon} size={14} strokeWidth={2} />
            </div>
            {section.items.map((item) => (
              <button
                type="button"
                key={item.page}
                className={`sidebar-nav-item ${currentPage === item.page ? "active" : ""}`}
                onClick={() => handleNav(item.page)}
              >
                <span className="sidebar-nav-icon">
                  <Icon name={item.icon} size={16} strokeWidth={2} />
                </span>
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
          <button className="topbar-menu" type="button" onClick={() => setSidebarOpen((v) => !v)} aria-label="Open navigation">
            <Icon name="menu" size={18} strokeWidth={2.25} />
          </button>
          <div className="topbar-search">
            <Icon name="search" size={16} strokeWidth={2} />
            <input placeholder="Search clients, projects..." />
          </div>
          <div className="topbar-tabs">
            <span>Projects</span>
            <span>Clients</span>
            <span>System</span>
          </div>
          <div className="topbar-actions">
            <button className="topbar-icon-btn" type="button" aria-label="Toggle theme">
              <Icon name="settings" size={17} strokeWidth={2} />
            </button>
            <button className="topbar-icon-btn badge" type="button" aria-label="Notifications" onClick={() => handleNav("notifications")}>
              <Icon name="bell" size={17} strokeWidth={2} />
            </button>
            <button className="topbar-icon-btn badge" type="button" aria-label="Messages" onClick={() => handleNav("comms")}>
              <Icon name="mail" size={17} strokeWidth={2} />
            </button>
            <div className="topbar-user">
              <div className="topbar-user-text"><strong>Ferix Admin</strong><span>Platform Owner</span></div>
              <div className="topbar-avatar" onClick={() => handleNav("profile")} style={{ cursor: "pointer" }}>FA</div>
            </div>
          </div>
        </header>

        <section className="admin-page-head">
          <div className="admin-page-head-left">
            <div className="admin-head-kicker">{meta.kicker}</div>
            <h2 className="admin-page-title">{meta.title}</h2>
            {meta.subtitle ? <p className="admin-page-sub">{meta.subtitle}</p> : null}
          </div>
          <div className="admin-page-head-right">
            <div className="head-date-chip">
              <span>Today&apos;s Deliveries</span>
              <Icon name="chevronDown" size={14} strokeWidth={2.25} />
            </div>
            <button className="head-icon-btn" type="button" aria-label="Download Report">
              <Icon name="download" size={16} strokeWidth={2} />
            </button>
            <button className="head-icon-btn" type="button" aria-label="Filter Metrics">
              <Icon name="filter" size={16} strokeWidth={2} />
            </button>
            <button className="head-icon-btn" type="button" aria-label="Favorite View">
              <Icon name="star" size={16} strokeWidth={2} />
            </button>
          </div>
        </section>

        <PageRouter page={currentPage} />

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
