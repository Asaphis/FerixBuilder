import type { IconName } from "../components/UIComponents";

export type PageKey =
  | "dashboard"
  | "billing"
  | "deployments"
  | "comms"
  | "projects"
  | "revisions"
  | "guides"
  | "settings"
  | "notifications"
  | "storage"
  | "deliveries"
  | "profile"
  | "clients"
  | "tickets"
  | "audit"
  | "api"
  | "templates";

export type NavItem = {
  label: string;
  page: PageKey;
  icon: IconName;
  badge?: string;
  dot?: "active" | "default";
};

export type NavSection = {
  title: string;
  icon: IconName;
  items: NavItem[];
};

export const mainSections: NavSection[] = [
  {
    title: "Platform Management",
    icon: "layout",
    items: [
      { label: "Dashboard", page: "dashboard", icon: "home" },
      { label: "Billing & Payments", page: "billing", icon: "chart" },
      { label: "Deployments", page: "deployments", icon: "globe" },
      { label: "Customer Comms", page: "comms", icon: "mail" },
      { label: "Active Projects", page: "projects", icon: "layers" },
      { label: "Revisions", page: "revisions", icon: "activity", dot: "active" },
      { label: "Admin Guides", page: "guides", icon: "book" },
      { label: "Settings", page: "settings", icon: "settings", badge: "3" },
    ],
  },
  {
    title: "Tools",
    icon: "boxes",
    items: [
      { label: "Notifications", page: "notifications", icon: "bell" },
      { label: "File Storage", page: "storage", icon: "folderOpen", dot: "active" },
      { label: "Deliveries", page: "deliveries", icon: "truck", dot: "default" },
    ],
  },
  {
    title: "Operations",
    icon: "flag",
    items: [
      { label: "Admin Profile", page: "profile", icon: "user" },
      { label: "Client Directory", page: "clients", icon: "users" },
      { label: "Support Tickets", page: "tickets", icon: "ticket" },
      { label: "Audit Logs", page: "audit", icon: "shield" },
      { label: "API Docs", page: "api", icon: "code" },
      { label: "Template Library", page: "templates", icon: "folder" },
    ],
  },
];

export const pageTitles: Record<PageKey, { kicker: string; title: string; subtitle: string }> = {
  dashboard: { kicker: "Operations Hub", title: "Dashboard", subtitle: "Overview of deliveries, activity, and metrics" },
  billing: { kicker: "Financials", title: "Billing", subtitle: "Invoices, payouts, and revenue" },
  deployments: { kicker: "Infrastructure", title: "Deployments", subtitle: "Build servers and live status" },
  comms: { kicker: "Communications", title: "Messages", subtitle: "Client conversations and approvals" },
  projects: { kicker: "Portfolio", title: "Projects", subtitle: "Active website builds" },
  revisions: { kicker: "Iterations", title: "Revisions", subtitle: "Feedback and approvals queue" },
  guides: { kicker: "Knowledge Base", title: "Guides", subtitle: "Platform operation docs" },
  settings: { kicker: "Configuration", title: "Settings", subtitle: "Admin workspace preferences" },
  notifications: { kicker: "Alerts", title: "Notifications", subtitle: "Platform alerts and updates" },
  storage: { kicker: "Assets", title: "Storage", subtitle: "Media, files, and documents" },
  deliveries: { kicker: "Logistics", title: "Deliveries", subtitle: "Launch and handoff schedule" },
  profile: { kicker: "Identity", title: "Profile", subtitle: "Account and security" },
  clients: { kicker: "CRM", title: "Clients", subtitle: "Companies and contacts" },
  tickets: { kicker: "Support", title: "Tickets", subtitle: "Open client support issues" },
  audit: { kicker: "Compliance", title: "Audit Log", subtitle: "Platform activity trail" },
  api: { kicker: "Developers", title: "API", subtitle: "Integrations and documentation" },
  templates: { kicker: "Design System", title: "Templates", subtitle: "Starter templates for builds" },
};

export const financeStats = [
  { label: "Monthly Recurring", value: "$12,450", change: "18.6%", up: true },
  { label: "Pending Payouts", value: "$3,200", change: "3%", up: false },
];

export const inventoryRows = [
  { label: "In Progress", value: "12", badge: "stock" },
  { label: "Delivered", value: "36", badge: "resolved" },
];

export const networkRows = [
  { label: "Builds Triggered", meta: "85 today and 120 yesterday", value: "85", badge: "inprogress" },
  { label: "Successful Deploys", meta: "Live client websites", value: "82", badge: "resolved" },
];

export const socialFeedStats = [
  { label: "Revisions", value: "14" },
  { label: "Comments", value: "32" },
  { label: "Approvals", value: "8" },
];
