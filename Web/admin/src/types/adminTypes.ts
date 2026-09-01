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
  badge?: string;
  dot?: "active" | "default";
};

export type NavSection = {
  title: string;
  icon?: string;
  items: NavItem[];
};

export const mainSections: NavSection[] = [
  {
    title: "Platform Management",
    icon: "◐",
    items: [
      { label: "Dashboard", page: "dashboard" },
      { label: "Billing & Payments", page: "billing" },
      { label: "Deployments", page: "deployments" },
      { label: "Customer Comms", page: "comms" },
      { label: "Active Projects", page: "projects" },
      { label: "Revisions", page: "revisions", dot: "active" },
      { label: "Admin Guides", page: "guides" },
      { label: "Settings", page: "settings", badge: "♥" },
    ],
  },
  {
    title: "Tools",
    icon: "◉",
    items: [
      { label: "Notifications", page: "notifications" },
      { label: "File Storage", page: "storage", dot: "active" },
      { label: "Deliveries", page: "deliveries", dot: "default" },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Admin Profile", page: "profile" },
      { label: "Client Directory", page: "clients" },
      { label: "Support Tickets", page: "tickets" },
      { label: "Audit Logs", page: "audit" },
      { label: "API Docs", page: "api" },
      { label: "Template Library", page: "templates" },
    ],
  },
];

export const pageTitles: Record<PageKey, { kicker: string; title: string; subtitle: string }> = {
  dashboard: { kicker: "Operations Hub", title: "Welcome, FerixAdmin", subtitle: "This is your central operations hub" },
  billing: { kicker: "Financials", title: "Billing & Payments", subtitle: "Track invoices, payouts, and recurring revenue" },
  deployments: { kicker: "Infrastructure", title: "System Deployments", subtitle: "Monitor build servers, deploy status, and uptime" },
  comms: { kicker: "Communications", title: "Customer Comms", subtitle: "Manage client conversations, tickets, and approvals" },
  projects: { kicker: "Portfolio", title: "Active Projects", subtitle: "All active website builds in the delivery pipeline" },
  revisions: { kicker: "Iterations", title: "Revisions Queue", subtitle: "Pending changes, feedback, and approval rounds" },
  guides: { kicker: "Knowledge Base", title: "Admin Guides", subtitle: "Documentation for platform operations" },
  settings: { kicker: "Configuration", title: "Platform Settings", subtitle: "Customize your admin workspace preferences" },
  notifications: { kicker: "Alerts", title: "Notifications Center", subtitle: "All platform alerts and updates in one place" },
  storage: { kicker: "Assets", title: "File Storage", subtitle: "Media, documents, and site assets" },
  deliveries: { kicker: "Logistics", title: "Deliveries Pipeline", subtitle: "Scheduled launches and handoff dates" },
  profile: { kicker: "Identity", title: "Admin Profile", subtitle: "Your account details and security settings" },
  clients: { kicker: "CRM", title: "Client Directory", subtitle: "All clients, contacts, and company records" },
  tickets: { kicker: "Support", title: "Support Tickets", subtitle: "Open issues and client support requests" },
  audit: { kicker: "Compliance", title: "Audit Logs", subtitle: "Full activity trail across the platform" },
  api: { kicker: "Developers", title: "API Documentation", subtitle: "Integrate FerixBuilder into your workflows" },
  templates: { kicker: "Design System", title: "Template Library", subtitle: "Reusable starter templates for new builds" },
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
