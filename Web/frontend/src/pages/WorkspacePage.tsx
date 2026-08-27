import { useState, type ComponentType } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Download,
  Eye,
  FolderKanban,
  Globe2,
  Headphones,
  LayoutDashboard,
  Menu,
  MessageCircle,
  PackageCheck,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import FeatureSurface from "./FeatureSurface";
import { getPreviewAccount } from "@/lib/customerAccess";

type IconType = ComponentType<{ size?: number }>;
export type WorkspacePageKey = "dashboard" | "project" | "review" | "delivery" | "business" | "care" | "support" | "settings";
type HubTab = { id: string; label: string; surface: string };
type NavItem = readonly [IconType, string, string];

const hubs: Record<WorkspacePageKey, { kicker: string; title: string; description: string; primary: string; icon: IconType; tabs?: HubTab[] }> = {
  dashboard: {
    kicker: "CUSTOMER WORKSPACE / PROJECT TRACKING",
    title: "Your project request is in progress",
    description: "Follow the work, see the next action, and move through each delivery stage with confidence.",
    primary: "Open project",
    icon: LayoutDashboard,
  },
  project: {
    kicker: "PROJECT / BRIEF, SCOPE & MATERIALS",
    title: "Everything for your project, together",
    description: "Keep requirements, scope, milestones, and project material in one organised delivery workspace.",
    primary: "Update project",
    icon: FolderKanban,
    tabs: [
      { id: "brief", label: "Brief & onboarding", surface: "onboarding" },
      { id: "scope", label: "Scope & milestones", surface: "project" },
      { id: "files", label: "Project files", surface: "files" },
    ],
  },
  review: {
    kicker: "REVIEW / PREVIEW & CHANGES",
    title: "Review the work before you approve",
    description: "Use the private preview and structured feedback tools together, so every requested change has the right context.",
    primary: "Open preview",
    icon: Eye,
    tabs: [
      { id: "preview", label: "Preview", surface: "preview" },
      { id: "changes", label: "Changes & revisions", surface: "revisions" },
    ],
  },
  delivery: {
    kicker: "DELIVERY / QUOTE, PAYMENT & RELEASE",
    title: "Approve, pay, and receive delivery",
    description: "Keep quote decisions, payment records, and the protected release route in one controlled customer journey.",
    primary: "View delivery status",
    icon: Download,
    tabs: [
      { id: "payment", label: "Quote & payment", surface: "payments" },
      { id: "release", label: "Release & downloads", surface: "downloads" },
    ],
  },
  business: {
    kicker: "BUSINESS TOOLS / YOUR APPLICATION DATA",
    title: "Manage only the tools your project includes",
    description: "Your customer, product, and booking data stays inside your business workspace and appears only when relevant.",
    primary: "Open business tools",
    icon: PackageCheck,
    tabs: [
      { id: "customers", label: "Customers", surface: "customers" },
      { id: "products", label: "Products & services", surface: "products" },
      { id: "bookings", label: "Bookings", surface: "bookings" },
    ],
  },
  care: {
    kicker: "CARE & OPERATIONS / OPTIONAL MANAGEMENT",
    title: "Care for your website after delivery",
    description: "Request optional management, then see permitted domain, maintenance, health, and backup summaries in the same place.",
    primary: "Request service",
    icon: ShieldCheck,
    tabs: [
      { id: "request", label: "Request service", surface: "management" },
      { id: "domain", label: "Domain", surface: "domain" },
      { id: "care", label: "Technical care", surface: "technical-care" },
      { id: "health", label: "System health", surface: "system-health" },
    ],
  },
  support: {
    kicker: "SUPPORT / PROJECT CONVERSATIONS",
    title: "Get project help with the right context",
    description: "Keep questions, attachments, and replies connected to the right project instead of scattered across messages.",
    primary: "Open support ticket",
    icon: Headphones,
  },
  settings: {
    kicker: "ACCOUNT / SETTINGS",
    title: "Control your workspace preferences",
    description: "Manage your profile, customer workspace notifications, and permitted account preferences.",
    primary: "Save settings",
    icon: Settings2,
  },
};

export const dashboardSections: readonly [string, readonly NavItem[]][] = [
  ["WORKSPACE", [[LayoutDashboard, "Dashboard", "/dashboard"], [FolderKanban, "Project", "/workspace/project"], [Eye, "Review", "/workspace/review"], [Download, "Delivery", "/workspace/delivery"]]],
  ["BUSINESS", [[PackageCheck, "Business tools", "/workspace/business"]]],
  ["CARE", [[ShieldCheck, "Care & operations", "/workspace/care"], [Headphones, "Support", "/workspace/support"]]],
  ["ACCOUNT", [[Settings2, "Settings", "/workspace/settings"]]],
] as const;

export const dashboardMilestones = ["Brief received", "Scope confirmed", "In build", "Preview ready", "Approved", "Delivery"];
export const dashboardTasks = [["Requirements", "Submitted", true], ["Scope review", "In progress", false], ["Private preview", "Next", false]] as const;

const legacyRoutes: Record<string, { page: WorkspacePageKey; tab?: string }> = {
  "/workspace/onboarding": { page: "project", tab: "brief" },
  "/workspace/project": { page: "project", tab: "scope" },
  "/workspace/files": { page: "project", tab: "files" },
  "/workspace/preview": { page: "review", tab: "preview" },
  "/workspace/revisions": { page: "review", tab: "changes" },
  "/workspace/payments": { page: "delivery", tab: "payment" },
  "/workspace/downloads": { page: "delivery", tab: "release" },
  "/workspace/customers": { page: "business", tab: "customers" },
  "/workspace/products": { page: "business", tab: "products" },
  "/workspace/bookings": { page: "business", tab: "bookings" },
  "/workspace/domain": { page: "care", tab: "domain" },
  "/workspace/technical-care": { page: "care", tab: "care" },
  "/workspace/management": { page: "care", tab: "request" },
  "/workspace/system-health": { page: "care", tab: "health" },
};

export default function WorkspacePage({ page, initialTab }: { page: WorkspacePageKey; initialTab?: string }) {
  const [location, navigate] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [heroActionVersion, setHeroActionVersion] = useState(0);
  const account = getPreviewAccount();
  const accountName = account?.fullName || "FerixBuilder customer";
  const info = hubs[page];
  const defaultTab = initialTab ?? info.tabs?.[0]?.id;
  const [activeTab, setActiveTab] = useState(defaultTab);
  const selectedTab = info.tabs?.find((tab) => tab.id === activeTab) ?? info.tabs?.[0];
  const visiblePage = legacyRoutes[location]?.page ?? page;

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(null), 2600);
  };

  const tabSelect = (tab: HubTab) => {
    setActiveTab(tab.id);
    navigate(`/workspace/${page}`);
  };

  const primaryAction = () => {
    if (page === "dashboard") return navigate("/workspace/project");
    if (page === "support" || page === "settings") {
      setHeroActionVersion((current) => current + 1);
      return;
    }
    const primaryTabs: Partial<Record<WorkspacePageKey, string>> = {
      project: "brief",
      review: "preview",
      delivery: "payment",
      business: "customers",
      care: "request",
    };
    const tab = primaryTabs[page];
    if (tab) setActiveTab(tab);
    window.setTimeout(() => document.getElementById("customer-workflow")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const navPage = (href: string) => href === "/dashboard"
    ? "dashboard"
    : href.split("/").pop()?.replace("operations", "care").replace("tools", "business") ?? "";

  return (
    <div className="dashboard-shell workspace-shell hub-shell">
      <button aria-label="Close workspace menu" className={mobileOpen ? "drawer-backdrop open" : "drawer-backdrop"} onClick={() => setMobileOpen(false)} />
      <aside className={mobileOpen ? "dash-sidebar mobile-open" : "dash-sidebar"}>
        <div className="dash-brand"><span><Sparkles size={15} /></span><b>Ferix</b>Builder<button onClick={() => setMobileOpen(false)}><X size={18} /></button></div>
        <div className="drawer-caption">Your project journeys and available business tools.</div>
        {dashboardSections.map(([title, items]) => (
          <div className="dash-nav-group" key={title}>
            <p>{title}</p>
            {items.map(([Icon, label, href]) => (
              <Link key={href} href={href} className={visiblePage === navPage(href) ? "active" : ""} onClick={() => setMobileOpen(false)}>
                <Icon size={16} /><span>{label}</span>
              </Link>
            ))}
          </div>
        ))}
        <div className="dash-profile">
          <div className="profile-avatar">{accountName.slice(0, 2).toUpperCase()}</div>
          <div><b>{accountName}</b><span>Preview account</span></div>
          <ChevronDown size={14} />
        </div>
      </aside>

      <main className="dash-main">
        <header className="dash-header">
          <button className="dash-menu" onClick={() => setMobileOpen(true)} aria-label="Open workspace menu"><Menu size={20} /></button>
          <div className="dash-search"><Search size={17} /><input placeholder="Search anything in your workspace..." /><kbd>⌘ K</kbd></div>
          <div className="dash-header-actions">
            <button aria-label="Open project updates" onClick={() => navigate("/workspace/project")}><Bell size={18} /><i>2</i></button>
            <button aria-label="Open support messages" onClick={() => navigate("/workspace/support")}><MessageCircle size={18} /><i>1</i></button>
            <Link href="/" className="dash-return">Back to site</Link>
            <button className="header-request" onClick={() => navigate("/start-project")}><Plus size={16} /> New request</button>
          </div>
        </header>

        {page === "dashboard" ? (
          <DashboardOverview navigate={navigate} accountName={accountName} />
        ) : (
          <>
            <section className="workspace-hero hub-hero">
              <div><p className="dash-kicker">{info.kicker}</p><h1>{info.title}</h1><p>{info.description}</p></div>
              <button className="dash-primary" onClick={primaryAction}><Plus size={17} /> {info.primary}</button>
            </section>
            <section className="hub-workspace">
              {info.tabs && <nav className="hub-tabs" aria-label={`${info.title} sections`}>
                {info.tabs.map((tab) => <button key={tab.id} className={selectedTab?.id === tab.id ? "active" : ""} onClick={() => tabSelect(tab)}>{tab.label}</button>)}
              </nav>}
              <div className="hub-panel" id="customer-workflow">
                <FeatureSurface page={selectedTab?.surface ?? page} notify={notify} navigate={navigate} heroAction={page === "support" ? "support" : page === "settings" ? "settings" : undefined} heroActionVersion={heroActionVersion} />
              </div>
            </section>
          </>
        )}

        {page !== "support" && <section className="hub-help"><CircleHelp size={20} /><p><b>Need help with this stage?</b><span>Support remains connected to your project context.</span></p><Link href="/workspace/support" className="dash-primary small">Open support</Link></section>}
      </main>

      <nav className="dash-bottom-nav" aria-label="Mobile dashboard navigation">
        <Link href="/dashboard" className={visiblePage === "dashboard" ? "active" : ""}><LayoutDashboard size={18} /><span>Home</span></Link>
        <Link href="/workspace/project" className={visiblePage === "project" ? "active" : ""}><FolderKanban size={18} /><span>Project</span></Link>
        <Link href="/workspace/review" className={visiblePage === "review" ? "active" : ""}><Eye size={18} /><span>Review</span></Link>
        <Link href="/workspace/support" className={visiblePage === "support" ? "active" : ""}><CircleHelp size={18} /><span>Support</span></Link>
        <button onClick={() => setMobileOpen(true)}><Menu size={18} /><span>Workspace</span></button>
      </nav>
      {notice && <div className="dash-notice"><Check size={15} /> {notice}</div>}
    </div>
  );
}

function DashboardOverview({ navigate, accountName }: { navigate: (path: string) => void; accountName: string }) {
  const firstName = accountName.split(" ")[0];
  const steps = [["Request submitted", "complete"], ["Requirements reviewed", "complete"], ["Scope confirmation", "current"], ["Private preview", ""], ["Approval", ""], ["Payment", ""], ["Delivery", ""]] as const;
  const statusCards = [[FolderKanban, "Project status", "In progress", "Scope review"], [CircleHelp, "Revisions", "2", "Included rounds"], [Eye, "Preview", "Preparing", "Before approval"], [WalletCards, "Payment", "Not due", "After scope"], [Download, "Delivery", "Locked", "After verification"]] as const;
  const progressItems = [["Requirements review", "Completed", true], ["Scope confirmation", "In progress", false], ["Design & build", "Next", false], ["Preview preparation", "Queued", false]] as const;
  const activities = [[Eye, "Project brief received", "Your requirements are in review"], [FolderKanban, "Scope review started", "Next milestone is being prepared"], [Bell, "Workspace ready", "Keep your files and decisions here"]] as const;

  return (
    <section className="reference-dashboard">
      <section className="reference-welcome">
        <div><h1>Welcome back, {firstName}</h1><p>Here is what is happening with your project today.</p></div>
        <button className="dash-primary" onClick={() => navigate("/workspace/project")}><Plus size={17} /> Open project</button>
      </section>

      <section className="reference-status-grid">
        {statusCards.map(([Icon, label, value, note], index) => (
          <article key={label} className={`status-card status-${index}`}>
            <span className="status-icon"><Icon size={21} /></span>
            <div><p>{label}</p><b>{value}</b><small>{note}</small>{index === 0 && <i><em /></i>}</div>
          </article>
        ))}
      </section>

      <section className="reference-overview-grid">
        <article className="reference-project-card">
          <header>
            <div><span><CalendarDays size={17} /></span><div><h2>Project overview</h2><p>FerixBuilder customer project</p></div></div>
            <button onClick={() => navigate("/workspace/project")}>View project details</button>
          </header>
          <div className="reference-timeline">
            {steps.map(([label, state], index) => (
              <div className={state} key={label}>
                <i>{state === "complete" ? <Check size={13} /> : state === "current" ? <Eye size={13} /> : index + 1}</i>
                <b>{label}</b><span>{index === 0 ? "Submitted" : index === 1 ? "Reviewed" : index === 2 ? "In progress" : ""}</span>
              </div>
            ))}
          </div>
        </article>

        <aside className="reference-status-panel">
          <header><span><FolderKanban size={17} /></span><h2>Project status</h2></header>
          <div><p>Current status <b>Scope review</b></p><span>Your project information is being reviewed. Keep your materials current and you will see the next delivery action here.</span></div>
          <button className="dash-primary" onClick={() => navigate("/workspace/project")}><FolderKanban size={16} /> Review project</button>
          <button className="reference-outline" onClick={() => navigate("/workspace/review")}><Eye size={16} /> Review preview</button>
        </aside>
      </section>

      <section className="reference-work-grid">
        <article className="reference-preview-card">
          <header><span><Eye size={17} /></span><div><h2>Website preview</h2><p>Your private preview will appear here.</p></div></header>
          <div className="reference-preview-window">
            <div><span></span><span></span><span></span><b>ferixbuilder preview</b></div>
            <section><small>PRIVATE CUSTOMER EXPERIENCE</small><h3>Your business,<br /><strong>made clearer.</strong></h3><button onClick={() => navigate("/workspace/review")}>Open review</button></section>
          </div>
          <footer><button onClick={() => navigate("/workspace/review")}>Open preview <Eye size={14} /></button><button onClick={() => navigate("/workspace/review")}>Share preview link <Globe2 size={14} /></button></footer>
        </article>

        <article className="reference-progress-card">
          <header><span><Sparkles size={17} /></span><div><h2>Project progress</h2><p>Delivery stages and current focus.</p></div><button>This week <ChevronDown size={14} /></button></header>
          <div className="reference-chart">
            <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
            <svg viewBox="0 0 410 135" aria-label="Project progress line chart">
              <defs><linearGradient id="ferixProgress" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7045e8" stopOpacity=".23" /><stop offset="1" stopColor="#7045e8" stopOpacity="0" /></linearGradient></defs>
              <path d="M16 110 L78 93 L140 76 L204 65 L266 49 L329 42 L394 23 L394 122 L16 122Z" fill="url(#ferixProgress)" />
              <path d="M16 110 L78 93 L140 76 L204 65 L266 49 L329 42 L394 23" fill="none" stroke="#7045e8" strokeWidth="3" />
              <circle cx="16" cy="110" r="4" /><circle cx="78" cy="93" r="4" /><circle cx="140" cy="76" r="4" /><circle cx="204" cy="65" r="4" /><circle cx="266" cy="49" r="4" /><circle cx="329" cy="42" r="4" /><circle cx="394" cy="23" r="4" />
            </svg>
          </div>
          <div className="reference-progress-list">
            {progressItems.map(([label, state, done]) => <div key={label}><i className={done ? "done" : ""}>{done ? <Check size={12} /> : ""}</i><span>{label}</span><b>{state}</b></div>)}
          </div>
        </article>

        <aside className="reference-activity-card">
          <header><span><Bell size={17} /></span><h2>Recent activity</h2><button>View all</button></header>
          {activities.map(([Icon, title, text]) => <div className="activity-entry" key={title}><i><Icon size={14} /></i><p><b>{title}</b><span>{text}</span></p></div>)}
        </aside>
      </section>

      <section className="reference-support-grid">
        <article>
          <span><Headphones size={19} /></span><div><h2>Need help?</h2><p>Questions about your project stay connected to the right context.</p></div>
          <button className="dash-primary" onClick={() => navigate("/workspace/support")}>Open support ticket</button>
        </article>
        <article>
          <span><Globe2 size={19} /></span>
          <div><h2>Useful links</h2><button onClick={() => navigate("/workspace/project")}>Project details <ChevronDown size={14} /></button><button onClick={() => navigate("/workspace/review")}>Review process <ChevronDown size={14} /></button><button onClick={() => navigate("/workspace/care")}>Management options <ChevronDown size={14} /></button></div>
        </article>
        <article className="reference-account-manager">
          <span><UserRound size={19} /></span>
          <div><p className="account-manager-kicker">YOUR PROJECT CONTACT</p><h2>Your account manager</h2><p>Your account manager keeps your brief, decisions, review, and delivery stages connected.</p></div>
          <button className="reference-outline" onClick={() => navigate("/workspace/support")}><MessageCircle size={15} /> Message your manager</button>
        </article>
        <article>
          <span><Bell size={19} /></span><div><h2>Stay updated</h2><p>Manage project and support notifications from your workspace settings.</p></div>
          <button className="reference-outline" onClick={() => navigate("/workspace/settings")}>Open notification settings</button>
        </article>
      </section>
    </section>
  );
}
