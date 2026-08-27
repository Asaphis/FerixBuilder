import { useState, type ComponentType } from "react";
import { Bell, CalendarDays, Check, ChevronDown, CircleHelp, Download, Eye, FolderKanban, Globe2, Headphones, LayoutDashboard, Menu, MessageCircle, PackageCheck, Plus, Search, Settings2, ShieldCheck, Sparkles, UserRound, WalletCards, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import FeatureSurface from "./FeatureSurface";
import { getPreviewAccount } from "@/lib/customerAccess";

type IconType = ComponentType<{ size?: number }>;
export type WorkspacePageKey = "dashboard" | "project" | "review" | "delivery" | "business" | "care" | "support" | "settings";
type HubTab = { id: string; label: string; surface: string };
type NavItem = readonly [IconType, string, string];

const hubs: Record<WorkspacePageKey, { kicker: string; title: string; description: string; primary: string; icon: IconType; tabs?: HubTab[] }> = {
  dashboard: { kicker: "CUSTOMER WORKSPACE / PROJECT TRACKING", title: "Your project request is in progress", description: "Follow the work, see the next action, and move through each delivery stage with confidence.", primary: "Open project", icon: LayoutDashboard },
  project: { kicker: "PROJECT / BRIEF, SCOPE & MATERIALS", title: "Everything for your project, together", description: "Keep requirements, scope, milestones, and project material in one organised delivery workspace.", primary: "Update project", icon: FolderKanban, tabs: [{ id: "brief", label: "Brief & onboarding", surface: "onboarding" }, { id: "scope", label: "Scope & milestones", surface: "project" }, { id: "files", label: "Project files", surface: "files" }] },
  review: { kicker: "REVIEW / PREVIEW & CHANGES", title: "Review the work before you approve", description: "Use the private preview and structured feedback tools together, so every requested change has the right context.", primary: "Open preview", icon: Eye, tabs: [{ id: "preview", label: "Preview", surface: "preview" }, { id: "changes", label: "Changes & revisions", surface: "revisions" }] },
  delivery: { kicker: "DELIVERY / QUOTE, PAYMENT & RELEASE", title: "Approve, pay, and receive delivery", description: "Keep quote decisions, payment records, and the protected release route in one controlled customer journey.", primary: "View delivery status", icon: Download, tabs: [{ id: "payment", label: "Quote & payment", surface: "payments" }, { id: "release", label: "Release & downloads", surface: "downloads" }] },
  business: { kicker: "BUSINESS TOOLS / YOUR APPLICATION DATA", title: "Manage only the tools your project includes", description: "Your customer, product, and booking data stays inside your business workspace and appears only when relevant.", primary: "Open business tools", icon: PackageCheck, tabs: [{ id: "customers", label: "Customers", surface: "customers" }, { id: "products", label: "Products & services", surface: "products" }, { id: "bookings", label: "Bookings", surface: "bookings" }] },
  care: { kicker: "CARE & OPERATIONS / OPTIONAL MANAGEMENT", title: "Care for your website after delivery", description: "Request optional management, then see permitted domain, maintenance, health, and backup summaries in the same place.", primary: "Request service", icon: ShieldCheck, tabs: [{ id: "request", label: "Request service", surface: "management" }, { id: "domain", label: "Domain", surface: "domain" }, { id: "care", label: "Technical care", surface: "technical-care" }, { id: "health", label: "System health", surface: "system-health" }] },
  support: { kicker: "SUPPORT / PROJECT CONVERSATIONS", title: "Get project help with the right context", description: "Keep questions, attachments, and replies connected to the right project instead of scattered across messages.", primary: "Open support ticket", icon: Headphones },
  settings: { kicker: "ACCOUNT / SETTINGS", title: "Control your workspace preferences", description: "Manage your profile, customer workspace notifications, and permitted account preferences.", primary: "Save settings", icon: Settings2 },
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
  "/workspace/onboarding": { page: "project", tab: "brief" }, "/workspace/project": { page: "project", tab: "scope" }, "/workspace/files": { page: "project", tab: "files" },
  "/workspace/preview": { page: "review", tab: "preview" }, "/workspace/revisions": { page: "review", tab: "changes" },
  "/workspace/payments": { page: "delivery", tab: "payment" }, "/workspace/downloads": { page: "delivery", tab: "release" },
  "/workspace/customers": { page: "business", tab: "customers" }, "/workspace/products": { page: "business", tab: "products" }, "/workspace/bookings": { page: "business", tab: "bookings" },
  "/workspace/domain": { page: "care", tab: "domain" }, "/workspace/technical-care": { page: "care", tab: "care" }, "/workspace/management": { page: "care", tab: "request" }, "/workspace/system-health": { page: "care", tab: "health" },
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
  const notify = (text: string) => { setNotice(text); window.setTimeout(() => setNotice(null), 2600); };
  const tabSelect = (tab: HubTab) => { setActiveTab(tab.id); navigate(`/workspace/${page}`); };
  const primaryTargets: Partial<Record<WorkspacePageKey, string>> = { dashboard: "/workspace/project" };
  const primaryTabs: Partial<Record<WorkspacePageKey, string>> = { project: "brief", review: "preview", delivery: "payment", business: "customers", care: "request" };
  const primaryAction = () => {
    const target = primaryTargets[page];
    if (target) return navigate(target);
    if (page === "support" || page === "settings") return setHeroActionVersion((current) => current + 1);
    const tab = primaryTabs[page];
    if (tab) setActiveTab(tab);
    window.setTimeout(() => document.getElementById("customer-workflow")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  return <div className="dashboard-shell workspace-shell hub-shell">
    <button aria-label="Close workspace menu" className={mobileOpen ? "drawer-backdrop open" : "drawer-backdrop"} onClick={() => setMobileOpen(false)} />
    <aside className={mobileOpen ? "dash-sidebar mobile-open" : "dash-sidebar"}><div className="dash-brand"><span><Sparkles size={15} /></span><b>Ferix</b>Builder<button onClick={() => setMobileOpen(false)}><X size={18} /></button></div><div className="drawer-caption">Your project journeys and available business tools.</div>{dashboardSections.map(([title, items]) => <div className="dash-nav-group" key={title}><p>{title}</p>{items.map(([Icon, label, href]) => <Link key={href} href={href} className={visiblePage === (href === "/dashboard" ? "dashboard" : href.split("/").pop()?.replace("operations", "care").replace("tools", "business") ?? "") ? "active" : ""} onClick={() => setMobileOpen(false)}><Icon size={16} /><span>{label}</span></Link>)}</div>)}<div className="dash-profile"><div className="profile-avatar">{accountName.slice(0, 2).toUpperCase()}</div><div><b>{accountName}</b><span>Preview account</span></div><ChevronDown size={14} /></div></aside>
    <main className="dash-main"><header className="dash-header"><button className="dash-menu" onClick={() => setMobileOpen(true)} aria-label="Open workspace menu"><Menu size={20} /></button><div className="dash-search"><Search size={17} /><input placeholder="Search your workspace..." /><kbd>⌘ K</kbd></div><div className="dash-header-actions"><button aria-label="Open project updates" onClick={() => navigate("/workspace/project")}><Bell size={18} /><i>2</i></button><button aria-label="Open support messages" onClick={() => navigate("/workspace/support")}><MessageCircle size={18} /><i>1</i></button><Link href="/" className="dash-return">Back to site</Link></div></header>
      <section className="workspace-hero hub-hero"><div><p className="dash-kicker">{info.kicker}</p><h1>{info.title}</h1><p>{info.description}</p></div><button className="dash-primary" onClick={primaryAction}><Plus size={17} /> {info.primary}</button></section>
      {page === "dashboard" ? <DashboardOverview navigate={navigate} /> : <section className="hub-workspace">{info.tabs && <nav className="hub-tabs" aria-label={`${info.title} sections`}>{info.tabs.map((tab) => <button key={tab.id} className={selectedTab?.id === tab.id ? "active" : ""} onClick={() => tabSelect(tab)}>{tab.label}</button>)}</nav>}<div className="hub-panel" id="customer-workflow"><FeatureSurface page={selectedTab?.surface ?? page} notify={notify} navigate={navigate} heroAction={page === "support" ? "support" : page === "settings" ? "settings" : undefined} heroActionVersion={heroActionVersion} /></div></section>}
      {page !== "support" && <section className="hub-help"><CircleHelp size={20} /><p><b>Need help with this stage?</b><span>Support remains connected to your project context.</span></p><Link href="/workspace/support" className="dash-primary small">Open support</Link></section>}
    </main><nav className="dash-bottom-nav" aria-label="Mobile dashboard navigation"><Link href="/dashboard" className={visiblePage === "dashboard" ? "active" : ""}><LayoutDashboard size={18} /><span>Home</span></Link><Link href="/workspace/project" className={visiblePage === "project" ? "active" : ""}><FolderKanban size={18} /><span>Project</span></Link><Link href="/workspace/review" className={visiblePage === "review" ? "active" : ""}><Eye size={18} /><span>Review</span></Link><Link href="/workspace/support" className={visiblePage === "support" ? "active" : ""}><CircleHelp size={18} /><span>Support</span></Link><button onClick={() => setMobileOpen(true)}><Menu size={18} /><span>Workspace</span></button></nav>{notice && <div className="dash-notice"><Check size={15} /> {notice}</div>}</div>;
}

function DashboardOverview({ navigate }: { navigate: (path: string) => void }) {
  const statuses = [["Project status", "Awaiting review", "We are reviewing your request"], ["Current focus", "Scope confirmation", "Your next progress update"], ["Preview", "Not published", "Available before approval"], ["Delivery", "Not started", "Released only after verification"]];
  return <section className="dashboard-overview"><div className="overview-primary"><div className="overview-stage"><div><p className="mini-label">CURRENT DELIVERY STAGE</p><h2>Requirements received.<br /><strong>Scope review is next.</strong></h2><p>We will confirm the project scope and next milestone before the build begins.</p></div><button className="dash-primary" onClick={() => navigate("/workspace/project")}>Open project workspace</button></div><div className="lifecycle-rail">{dashboardMilestones.map((milestone, index) => <div className={index < 2 ? "complete" : index === 2 ? "current" : ""} key={milestone}><i>{index < 2 ? <Check size={13} /> : index + 1}</i><span>{milestone}</span></div>)}</div></div><aside className="overview-next"><p className="mini-label">NEXT ACTION</p><h3>Keep your brief complete</h3><p>Add anything that helps the team assess the work: materials, files, or details about the outcome you need.</p><button onClick={() => navigate("/workspace/project")}>Review project brief</button></aside><div className="overview-stats">{statuses.map(([label, value, note]) => <article key={label}><p>{label}</p><b>{value}</b><span>{note}</span></article>)}</div></section>;
}
