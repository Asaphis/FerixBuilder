import { useState, type ComponentType, type MouseEvent } from "react";
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
  LoaderCircle,
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
  const [workflowLoading, setWorkflowLoading] = useState<string | null>(null);
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

  const workflowMessages: Record<string, string> = {
    "Review quote decision": "Quote decision is ready for your review in preview mode.",
    "Share private preview": "Private preview sharing details are ready in preview mode.",
    "Request changes": "Revision workspace is ready for your feedback.",
    "Confirm approval": "Preview approval has been recorded in this preview.",
    "Create request": "Revision request has been created in this preview.",
    "View payment route": "The protected payment route is ready to review in preview mode.",
  };

  const handleWorkflowLifecycleAction = (event: MouseEvent<HTMLElement>) => {
    const action = (event.target as HTMLElement).closest("button")?.textContent?.replace(/\s+/g, " ").trim();
    if (!action || !workflowMessages[action] || workflowLoading) return;
    setWorkflowLoading(action);
    window.setTimeout(() => {
      setWorkflowLoading(null);
      notify(workflowMessages[action]);
    }, 520);
  };

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
          <DashboardOverview navigate={navigate} accountName={accountName} notify={notify} />
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
              <JourneyContext page={page} activeTab={selectedTab?.label} navigate={navigate} />
              <JourneyCockpit page={page} activeTab={selectedTab?.id} onTabSelect={(tabId) => {
                const tab = info.tabs?.find((item) => item.id === tabId);
                if (tab) tabSelect(tab);
              }} navigate={navigate} />
              <div className={workflowLoading ? "hub-panel lifecycle-panel-busy" : "hub-panel"} id="customer-workflow" onClick={handleWorkflowLifecycleAction} aria-busy={Boolean(workflowLoading)}>
                {workflowLoading && <div className="lifecycle-panel-feedback" role="status" aria-live="polite"><LoaderCircle className="lifecycle-loading" size={16} /><span>Updating your project lifecycle…</span></div>}
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
      {notice && <div className="dash-notice" role="status" aria-live="polite"><Check size={15} /> {notice}</div>}
    </div>
  );
}

const journeyContext: Record<Exclude<WorkspacePageKey, "dashboard">, readonly [IconType, string, string, string, IconType, string][]> = {
  project: [[FolderKanban, "Project status", "Scope review", "Requirements are being confirmed", CalendarDays, "Project timeline"], [Check, "Next action", "Keep scope current", "Add details or project material", FolderKanban, "Project workspace"], [Globe2, "Materials", "Private workspace", "Brief, scope, and files in one place", ShieldCheck, "Protected"]],
  review: [[Eye, "Preview version", "Version 01", "Ready for your review", Check, "Review required"], [CircleHelp, "Revision rounds", "2 included", "Use clear feedback for each change", MessageCircle, "Feedback"], [ShieldCheck, "Decision stage", "Approval follows review", "Nothing is charged at this stage", WalletCards, "Controlled"]],
  delivery: [[WalletCards, "Payment status", "Not due", "Scope confirmation comes first", Check, "Controlled release"], [FolderKanban, "Delivery gate", "Scope review", "Quote decisions stay connected", Eye, "Preview first"], [Download, "Release status", "Protected", "Files release after verification", ShieldCheck, "Secure delivery"]],
  business: [[PackageCheck, "Active module", "Business tools", "Use only the data tools your project includes", FolderKanban, "Scoped access"], [UserRound, "Customer data", "Preview-local", "Add, filter, and review records here", Search, "Searchable"], [ShieldCheck, "Data boundary", "Your business only", "Records remain isolated by module", Check, "Private"]],
  care: [[ShieldCheck, "Management status", "Not requested", "Optional services are reviewed before activation", CircleHelp, "Request review"], [Globe2, "Operations scope", "Permitted details", "Domain, care, and health summaries", Check, "Controlled"], [Bell, "Service updates", "Workspace alerts", "Notifications remain in your account settings", Settings2, "Preferences"]],
  support: [[Headphones, "Support route", "Project context attached", "Every question stays connected to this delivery", Check, "Contextual"], [ShieldCheck, "Attachments", "Private", "Project materials are kept in the workspace", FolderKanban, "Protected"], [Bell, "Response updates", "2 enabled", "Manage update preferences from Settings", Settings2, "Notifications"]],
  settings: [[UserRound, "Workspace profile", "Ready", "Your customer account information", Check, "Saved locally"], [Bell, "Notifications", "2 enabled", "Project and support updates are on", MessageCircle, "Connected"], [ShieldCheck, "Workspace access", "Business owner", "Member access stays controlled", Settings2, "Preferences"]],
};

function JourneyContext({ page, activeTab, navigate }: { page: Exclude<WorkspacePageKey, "dashboard">; activeTab?: string; navigate: (path: string) => void }) {
  const cards = journeyContext[page];
  const paths: Record<Exclude<WorkspacePageKey, "dashboard">, string> = {
    project: "/workspace/project", review: "/workspace/review", delivery: "/workspace/delivery", business: "/workspace/business", care: "/workspace/care", support: "/workspace/support", settings: "/workspace/settings",
  };

  return <section className="journey-context-grid" aria-label={`${page} workspace context`}>
    {cards.map(([Icon, label, value, detail, Signal, signal]) => <article className="journey-context-card" key={label}>
      <span className="journey-context-icon"><Icon size={17} /></span>
      <div><p>{label}</p><b>{value}</b><small>{detail}</small></div>
      <button onClick={() => navigate(paths[page])} aria-label={`Open ${label.toLowerCase()} details`}><Signal size={14} /><span>{signal}</span></button>
    </article>)}
  </section>;
}

function JourneyCockpit({ page, activeTab, onTabSelect, navigate }: { page: Exclude<WorkspacePageKey, "dashboard">; activeTab?: string; onTabSelect: (tab: string) => void; navigate: (path: string) => void }) {
  if (page === "project") return <section className="journey-cockpit project-cockpit" aria-label="Project delivery overview">
    <article className="cockpit-primary"><header><div><p>PROJECT DELIVERY BOARD</p><h2>Scope, materials, and next checkpoint.</h2></div><span className="cockpit-state active">Scope review</span></header><div className="cockpit-steps"><div className="done"><i><Check size={13} /></i><b>Brief received</b><span>Complete</span></div><div className="current"><i>2</i><b>Scope confirmation</b><span>In progress</span></div><div><i>3</i><b>Build starts</b><span>Next</span></div><div><i>4</i><b>Private preview</b><span>Queued</span></div></div><footer><button className={activeTab === "scope" ? "cockpit-action active" : "cockpit-action"} onClick={() => onTabSelect("scope")}>Review scope</button><button className={activeTab === "files" ? "cockpit-action active" : "cockpit-action"} onClick={() => onTabSelect("files")}>Open materials</button></footer></article>
    <aside className="cockpit-side-card"><span><FolderKanban size={18} /></span><p>PROJECT MATERIALS</p><h3>Everything stays connected.</h3><div className="cockpit-data"><b>Brief</b><span>Submitted</span><b>Files</b><span>Private workspace</span><b>Next step</b><span>Confirm scope</span></div><button onClick={() => onTabSelect("brief")}>Update project brief <ChevronDown size={14} /></button></aside>
  </section>;

  if (page === "review") return <section className="journey-cockpit review-cockpit" aria-label="Private preview review overview">
    <article className="cockpit-preview-stage"><header><div><p>PRIVATE PREVIEW / VERSION 01</p><h2>Review the experience before approval.</h2></div><span className="cockpit-state">Review stage</span></header><div className="cockpit-mini-preview"><div><span></span><span></span><span></span><b>ferixbuilder preview</b></div><section><small>PRIVATE WEBSITE PREVIEW</small><h3>Your business,<br /><strong>made clearer.</strong></h3><button onClick={() => onTabSelect("preview")}>Open preview</button></section></div></article>
    <aside className="cockpit-side-card"><span><CircleHelp size={18} /></span><p>REVIEW CHECKPOINT</p><h3>Two feedback rounds included.</h3><div className="cockpit-data"><b>Current version</b><span>Version 01</span><b>Feedback route</b><span>Structured revisions</span><b>Decision</b><span>Approval after review</span></div><button onClick={() => onTabSelect("changes")}>Request changes <ChevronDown size={14} /></button></aside>
  </section>;

  if (page === "delivery") return <section className="journey-cockpit delivery-cockpit" aria-label="Delivery gate overview">
    <article className="cockpit-primary"><header><div><p>CONTROLLED DELIVERY GATES</p><h2>Every delivery step remains clear.</h2></div><span className="cockpit-state">Not due</span></header><div className="cockpit-gates"><div className="done"><Check size={14} /><b>Review</b><span>Preview reviewed</span></div><div><span>02</span><b>Scope</b><span>Awaiting confirmation</span></div><div><span>03</span><b>Payment</b><span>Not due</span></div><div><span>04</span><b>Release</b><span>Protected</span></div></div><footer><button className={activeTab === "payment" ? "cockpit-action active" : "cockpit-action"} onClick={() => onTabSelect("payment")}>Quote & payment</button><button className={activeTab === "release" ? "cockpit-action active" : "cockpit-action"} onClick={() => onTabSelect("release")}>Delivery release</button></footer></article>
    <aside className="cockpit-side-card"><span><ShieldCheck size={18} /></span><p>DELIVERY SAFEGUARD</p><h3>Release follows verification.</h3><div className="cockpit-data"><b>Quote</b><span>Awaiting scope</span><b>Invoice</b><span>Not issued</span><b>Files</b><span>Protected until release</span></div><button onClick={() => navigate("/workspace/review")}>Return to review <ChevronDown size={14} /></button></aside>
  </section>;

  if (page === "business") return <section className="journey-cockpit business-cockpit" aria-label="Business tools overview">
    <article className="cockpit-primary"><header><div><p>BUSINESS OPERATIONS</p><h2>Keep application data in the right place.</h2></div><span className="cockpit-state active">Private workspace</span></header><div className="cockpit-module-grid"><button className={activeTab === "customers" ? "active" : ""} onClick={() => onTabSelect("customers")}><UserRound size={18} /><b>Customers</b><span>Contacts and records</span></button><button className={activeTab === "products" ? "active" : ""} onClick={() => onTabSelect("products")}><PackageCheck size={18} /><b>Products</b><span>Services and offers</span></button><button className={activeTab === "bookings" ? "active" : ""} onClick={() => onTabSelect("bookings")}><CalendarDays size={18} /><b>Bookings</b><span>Appointments and requests</span></button></div><footer><span>Only relevant, permitted business modules appear here.</span></footer></article>
    <aside className="cockpit-side-card"><span><ShieldCheck size={18} /></span><p>BUSINESS DATA BOUNDARY</p><h3>Your records stay isolated.</h3><div className="cockpit-data"><b>Workspace</b><span>FerixBuilder customer</span><b>Access</b><span>Business owner</span><b>Export</b><span>Preview controlled</span></div><button onClick={() => onTabSelect("customers")}>Open customer tools <ChevronDown size={14} /></button></aside>
  </section>;

  if (page === "care") return <section className="journey-cockpit care-cockpit" aria-label="Care and operations overview">
    <article className="cockpit-primary"><header><div><p>CARE & OPERATIONS BOARD</p><h2>See optional care without exposing infrastructure.</h2></div><span className="cockpit-state">Optional</span></header><div className="cockpit-module-grid"><button className={activeTab === "request" ? "active" : ""} onClick={() => onTabSelect("request")}><ShieldCheck size={18} /><b>Management</b><span>Request a service review</span></button><button className={activeTab === "domain" ? "active" : ""} onClick={() => onTabSelect("domain")}><Globe2 size={18} /><b>Domain</b><span>Permitted domain summary</span></button><button className={activeTab === "health" ? "active" : ""} onClick={() => onTabSelect("health")}><Sparkles size={18} /><b>Health</b><span>System health summary</span></button></div><footer><span>Services are reviewed before any management activation.</span></footer></article>
    <aside className="cockpit-side-card"><span><CircleHelp size={18} /></span><p>SERVICE REQUEST</p><h3>Management is not active yet.</h3><div className="cockpit-data"><b>Hosting</b><span>Not requested</span><b>Technical care</b><span>Not requested</span><b>Notifications</b><span>Workspace alerts</span></div><button onClick={() => onTabSelect("request")}>Request management <ChevronDown size={14} /></button></aside>
  </section>;

  if (page === "support") return <section className="journey-cockpit support-cockpit" aria-label="Project support overview">
    <article className="cockpit-primary"><header><div><p>PROJECT SUPPORT DESK</p><h2>Every conversation stays tied to delivery.</h2></div><span className="cockpit-state active">Context attached</span></header><div className="cockpit-support-grid"><div><span><FolderKanban size={17} /></span><b>Project context</b><p>Scope, preview, and delivery stage stay with your message.</p></div><div><span><ShieldCheck size={17} /></span><b>Private attachments</b><p>Files remain inside your customer workspace.</p></div><div><span><Bell size={17} /></span><b>Response updates</b><p>Notifications use your workspace preferences.</p></div></div></article>
    <aside className="cockpit-side-card"><span><Headphones size={18} /></span><p>SUPPORT STATUS</p><h3>Ready when you need help.</h3><div className="cockpit-data"><b>Open tickets</b><span>None in preview</span><b>Reply route</b><span>Support workspace</span><b>Priority</b><span>Project context</span></div><button onClick={() => document.getElementById("customer-workflow")?.scrollIntoView({ behavior: "smooth", block: "start" })}>Write a support ticket <ChevronDown size={14} /></button></aside>
  </section>;

  return <section className="journey-cockpit settings-cockpit" aria-label="Account and workspace overview">
    <article className="cockpit-primary"><header><div><p>ACCOUNT CONTROL CENTRE</p><h2>Manage the customer workspace with confidence.</h2></div><span className="cockpit-state active">Business owner</span></header><div className="cockpit-support-grid"><div><span><UserRound size={17} /></span><b>Workspace profile</b><p>Customer identity and business role remain clear.</p></div><div><span><Bell size={17} /></span><b>Update preferences</b><p>Choose project and support notifications.</p></div><div><span><ShieldCheck size={17} /></span><b>Member access</b><p>Invite permitted collaborators only.</p></div></div></article>
    <aside className="cockpit-side-card"><span><Settings2 size={18} /></span><p>WORKSPACE PREFERENCES</p><h3>Everything stays customer controlled.</h3><div className="cockpit-data"><b>Profile</b><span>Ready</span><b>Notifications</b><span>2 enabled</span><b>Members</b><span>Business owner</span></div><button onClick={() => document.getElementById("customer-workflow")?.scrollIntoView({ behavior: "smooth", block: "start" })}>Open preferences <ChevronDown size={14} /></button></aside>
  </section>;
}

function DashboardOverview({ navigate, accountName, notify }: { navigate: (path: string) => void; accountName: string; notify: (text: string) => void }) {
  const firstName = accountName.split(" ")[0];
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const steps = [["Request submitted", "complete"], ["Requirements reviewed", "complete"], ["Scope confirmation", "current"], ["Private preview", ""], ["Approval", ""], ["Payment", ""], ["Delivery", ""]] as const;
  const statusCards = [[FolderKanban, "Project status", "In progress", "Scope review"], [CircleHelp, "Revisions", "2", "Included rounds"], [Eye, "Preview", "Preparing", "Before approval"], [WalletCards, "Payment", "Not due", "After scope"], [Download, "Delivery", "Locked", "After verification"]] as const;
  const progressItems = [["Requirements review", "Completed", true], ["Scope confirmation", "In progress", false], ["Design & build", "Next", false], ["Preview preparation", "Queued", false]] as const;
  const activities = [[Eye, "Project brief received", "Your requirements are in review"], [FolderKanban, "Scope review started", "Next milestone is being prepared"], [Bell, "Workspace ready", "Keep your files and decisions here"]] as const;
  const runLifecycleAction = (action: string, successMessage: string, target?: string) => {
    if (loadingAction) return;
    setLoadingAction(action);
    window.setTimeout(() => {
      setLoadingAction(null);
      notify(successMessage);
      if (target) window.setTimeout(() => navigate(target), 620);
    }, 520);
  };

  return (
    <section className="reference-dashboard">
      <section className="reference-welcome">
        <div><h1>Welcome back, {firstName}</h1><p>Here is what is happening with your project today.</p></div>
        <button className="dash-primary" disabled={Boolean(loadingAction)} aria-busy={loadingAction === "open-project"} onClick={() => runLifecycleAction("open-project", "Project workspace is ready in preview mode.", "/workspace/project")}>{loadingAction === "open-project" ? <><LoaderCircle className="lifecycle-loading" size={17} /> Opening project…</> : <><Plus size={17} /> Open project</>}</button>
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
            <button disabled={Boolean(loadingAction)} aria-busy={loadingAction === "project-details"} onClick={() => runLifecycleAction("project-details", "Project details are ready to review.", "/workspace/project")}>{loadingAction === "project-details" ? <LoaderCircle className="lifecycle-loading" size={14} /> : "View project details"}</button>
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
          <button className="dash-primary" disabled={Boolean(loadingAction)} aria-busy={loadingAction === "review-project"} onClick={() => runLifecycleAction("review-project", "Project review is ready in preview mode.", "/workspace/project")}>{loadingAction === "review-project" ? <><LoaderCircle className="lifecycle-loading" size={16} /> Preparing review…</> : <><FolderKanban size={16} /> Review project</>}</button>
          <button className="reference-outline" disabled={Boolean(loadingAction)} aria-busy={loadingAction === "review-preview"} onClick={() => runLifecycleAction("review-preview", "Private preview is ready to review.", "/workspace/review")}>{loadingAction === "review-preview" ? <><LoaderCircle className="lifecycle-loading" size={16} /> Loading preview…</> : <><Eye size={16} /> Review preview</>}</button>
        </aside>
      </section>

      <section className="reference-work-grid">
        <article className="reference-preview-card">
          <header><span><Eye size={17} /></span><div><h2>Website preview</h2><p>Your private preview will appear here.</p></div></header>
          <div className="reference-preview-window">
            <div><span></span><span></span><span></span><b>ferixbuilder preview</b></div>
            <section><small>PRIVATE CUSTOMER EXPERIENCE</small><h3>Your business,<br /><strong>made clearer.</strong></h3><button disabled={Boolean(loadingAction)} aria-busy={loadingAction === "open-preview"} onClick={() => runLifecycleAction("open-preview", "Preview review is ready in preview mode.", "/workspace/review")}>{loadingAction === "open-preview" ? <LoaderCircle className="lifecycle-loading" size={13} /> : "Open review"}</button></section>
          </div>
          <footer><button disabled={Boolean(loadingAction)} aria-busy={loadingAction === "open-preview"} onClick={() => runLifecycleAction("open-preview", "Preview review is ready in preview mode.", "/workspace/review")}>{loadingAction === "open-preview" ? <><LoaderCircle className="lifecycle-loading" size={14} /> Loading preview…</> : <>Open preview <Eye size={14} /></>}</button><button disabled={Boolean(loadingAction)} aria-busy={loadingAction === "share-preview"} onClick={() => runLifecycleAction("share-preview", "Private preview sharing is prepared for this preview session.")}>{loadingAction === "share-preview" ? <><LoaderCircle className="lifecycle-loading" size={14} /> Preparing link…</> : <>Share preview link <Globe2 size={14} /></>}</button></footer>
        </article>

        <article className="reference-progress-card">
          <header><span><Sparkles size={17} /></span><div><h2>Project progress</h2><p>Delivery stages and current focus.</p></div><button disabled={Boolean(loadingAction)} aria-busy={loadingAction === "refresh-progress"} onClick={() => runLifecycleAction("refresh-progress", "Project progress has been refreshed for this preview.")}>{loadingAction === "refresh-progress" ? <><LoaderCircle className="lifecycle-loading" size={14} /> Updating…</> : <>This week <ChevronDown size={14} /></>}</button></header>
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
          <header><span><Bell size={17} /></span><h2>Recent activity</h2><button disabled={Boolean(loadingAction)} aria-busy={loadingAction === "refresh-activity"} onClick={() => runLifecycleAction("refresh-activity", "Recent project activity is up to date.")}>{loadingAction === "refresh-activity" ? <LoaderCircle className="lifecycle-loading" size={14} /> : "View all"}</button></header>
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
