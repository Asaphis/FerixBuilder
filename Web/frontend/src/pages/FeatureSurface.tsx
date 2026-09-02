import { useEffect, useRef, useState } from "react";
import {
  BellRing, Building2, Check, CircleCheckBig, CloudUpload, CreditCard, Download, FileText, FolderOpen,
  Laptop, MessageCircle, Monitor, PackagePlus, Paperclip, Save, Send, Settings2, ShieldCheck,
  Smartphone, Tablet, UploadCloud, UserPlus, UsersRound,
} from "lucide-react";

type FeatureSurfaceProps = { page: string; notify: (message: string) => void; navigate: (path: string) => void; heroAction?: "support" | "settings"; heroActionVersion?: number };

const modules: Record<string, { label: string; description: string; icon: typeof UsersRound; filterLabel: string; statuses: readonly string[]; detail: string }> = {
  customers: { label: "customer", description: "Customers connected to the business application will appear here.", icon: UsersRound, filterLabel: "Active only", statuses: ["Prospect", "Active"], detail: "Contact profile and workspace relationship" },
  products: { label: "product", description: "Products or service offers made available in the delivered application will appear here.", icon: PackagePlus, filterLabel: "Ready only", statuses: ["Draft", "Ready"], detail: "Offer details and website placement" },
  bookings: { label: "booking type", description: "Booking types and availability settings will appear here when this module is included.", icon: Settings2, filterLabel: "Open only", statuses: ["Draft", "Open"], detail: "Availability and booking configuration" },
};

type PreviewRecord = { name: string; status: string; detail: string };
type SupportTicket = { id: number; message: string };

export default function FeatureSurface({ page, notify, navigate, heroAction, heroActionVersion = 0 }: FeatureSurfaceProps) {
  const [previewMode, setPreviewMode] = useState("Desktop");
  const [revision, setRevision] = useState("");
  const [revisionSent, setRevisionSent] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [ticket, setTicket] = useState("");
  const [messages, setMessages] = useState<SupportTicket[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [managementSubmitted, setManagementSubmitted] = useState(false);
  const [businessRecords, setBusinessRecords] = useState<Record<string, PreviewRecord[]>>({ customers: [], products: [], bookings: [] });
  const [recordSearch, setRecordSearch] = useState("");
  const [filterActive, setFilterActive] = useState(false);
  const [openRecord, setOpenRecord] = useState<PreviewRecord | null>(null);
  const [quoteReviewOpen, setQuoteReviewOpen] = useState(false);
  const [paymentRouteOpen, setPaymentRouteOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [prefs, setPrefs] = useState({ project: true, support: true, product: false });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [previewApproved, setPreviewApproved] = useState(false);
  const [managementNeeds, setManagementNeeds] = useState("");
  const [businessExported, setBusinessExported] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const ticketInput = useRef<HTMLTextAreaElement>(null);
  const settingsForm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modules[page]) {
      setRecordSearch("");
      setFilterActive(false);
      setOpenRecord(null);
    }
  }, [page]);

  useEffect(() => {
    if (!heroActionVersion) return;
    if (heroAction === "support") {
      ticketInput.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => ticketInput.current?.focus(), 180);
    }
    if (heroAction === "settings") {
      setSettingsSaved(true);
      settingsForm.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [heroAction, heroActionVersion]);

  if (page === "onboarding") {
    return <section className="workflow-surface"><div className="workflow-card"><div className="workflow-heading"><div><p>PROJECT REQUEST</p><h2>Start a project request</h2><span>Use the Start Project page to submit your project brief.</span></div></div><div className="form-actions"><button className="dash-primary" onClick={() => navigate("/start-project")}>Go to Start Project</button></div></div></section>;
  }

  if (page === "project") {
    return <section className="workflow-surface"><div className="workflow-grid balanced-grid"><div className="workflow-card"><div className="workflow-heading"><div><p>PROJECT SCOPE AND QUOTE</p><h2>Everything agreed, in one place.</h2><span>Track scope, included work, milestones, and the point at which a quote is ready for your decision.</span></div><FileText size={24} /></div><div className="scope-list"><div><b>Core delivery</b><span>Public website, private customer workspace, responsive layouts</span><i>Included</i></div><div><b>Review allowance</b><span>Two structured revision rounds after the private preview</span><i>Included</i></div><div><b>Handover route</b><span>Protected delivery material released after approval and payment verification</span><i>Controlled</i></div></div><div className="form-actions"><button className="quiet" onClick={() => navigate("/workspace/files")}>Review project files</button><button className="dash-primary" onClick={() => setQuoteReviewOpen(true)}>Review quote decision</button></div>{quoteReviewOpen && <div className="request-card"><b>Quote decision pending</b><span>An authorised FerixBuilder scope and price must be issued before this project can be accepted or paid for.</span></div>}<div className="workflow-summary-band"><div><p>DELIVERY POSITION</p><b>Scope confirmation in progress</b><span>Build begins only after acceptance.</span></div><div><p>REVIEW POINT</p><b>Private preview before payment</b><span>Two structured revision rounds are included.</span></div><div><p>QUOTE CONTROL</p><b>Issued when scope is ready</b><span>No financial amount is shown before approval.</span></div></div></div></div></section>;
  }

  if (page === "files") {
    return <section className="workflow-surface"><div className="workflow-card"><div className="workflow-heading"><div><p>PROJECT FILES</p><h2>Keep project material together.</h2><span>Upload brand assets, requirements, screenshots, and reference material securely.</span></div><FolderOpen size={24} /></div><label className="file-drop"><input type="file" onChange={(event) => setSelectedFile(event.target.files?.[0]?.name ?? null)} /><UploadCloud size={24} /><b>Choose a file to stage in preview</b><span>Images, documents, screenshots, and audio references are supported in the full project flow.</span></label>{selectedFile ? <div className="staged-file"><FileText size={19} /><div><b>{selectedFile}</b><span>Staged locally for this preview session</span></div><button onClick={() => { setSelectedFile(null); notify("Staged file removed."); }}>Remove</button></div> : <div className="empty-state">No project files have been added in this preview. Your real project files will stay private and access-controlled.</div>}</div></section>;
  }

  if (page === "preview") {
    const viewOptions = [[Monitor, "Desktop"], [Tablet, "Tablet"], [Smartphone, "Mobile"]] as const;
    return <section className="workflow-surface preview-surface"><div className="workflow-card"><div className="workflow-heading"><div><p>PRIVATE WEBSITE PREVIEW</p><h2>Review the work on every screen.</h2><span>Preview version 01 is ready. Leave feedback before you approve the project.</span></div><div className="view-switch">{viewOptions.map(([Icon, label]) => <button key={label} className={previewMode === label ? "active" : ""} onClick={() => setPreviewMode(label)}><Icon size={15} /> {label}</button>)}</div></div><div className={`private-preview ${previewMode.toLowerCase()}`}><div className="private-browser"><span /><span /><span /><b>ferixbuilder preview</b></div><div className="private-site"><p>YOUR BUSINESS<br /><strong>MADE CLEARER.</strong></p><button>Explore</button></div></div><div className="form-actions"><button className="quiet" onClick={() => setShareOpen((current) => !current)}>{shareOpen ? "Hide share details" : "Share private preview"}</button><button className="quiet" onClick={() => navigate("/workspace/revisions")}>Request changes</button><button className="dash-primary" onClick={() => setApprovalOpen(true)}>Approve direction</button></div>{shareOpen && <div className="request-card"><b>Private preview sharing</b><span>When sharing is authorised, this area provides the review audience, expiry period, and access restrictions for the preview link.</span></div>}{approvalOpen && !previewApproved && <div className="approval-card"><div><b>Approve preview version 01?</b><span>Confirming this tells FerixBuilder that the reviewed direction is ready for the controlled quote and payment stage. It does not charge you.</span></div><div><button className="quiet" onClick={() => setApprovalOpen(false)}>Not yet</button><button className="dash-primary" onClick={() => { setPreviewApproved(true); setApprovalOpen(false); }}>Confirm approval</button></div></div>}{previewApproved && <div className="request-card"><b>Preview direction approved</b><span>Your decision has been recorded in this preview. Continue to the Delivery journey to review the quote and payment route.</span><button className="quiet inline-action" onClick={() => navigate("/workspace/delivery")}>Open delivery</button></div>}</div></section>;
  }

  if (page === "revisions") {
    return <section className="workflow-surface"><div className="workflow-grid balanced-grid"><div className="workflow-card"><div className="workflow-heading"><div><p>REVISION WORKSPACE</p><h2>Feedback with clear context.</h2><span>You have 2 included revision rounds. Additional work is reviewed before it is added.</span></div><b>2 left</b></div><div className="revision-status"><CircleCheckBig size={18} /><span>Preview is ready for your feedback.</span></div><label>What would you like to change?<textarea value={revision} onChange={(event) => setRevision(event.target.value)} placeholder="Describe the screen, content, or interaction you want changed." /></label><div className="form-actions"><button className="quiet" onClick={() => navigate("/workspace/files")}><Paperclip size={15} /> Attach from project files</button><button className="dash-primary" onClick={() => { if (!revision.trim()) return notify("Add feedback before creating a revision request."); setRevisionSent(true); setRevision(""); notify("Revision request created in preview mode."); }}>Create request</button></div>{revisionSent && <div className="request-card"><b>Revision request #01</b><span>Submitted for team review · remaining allowance: 1</span></div>}<div className="workflow-summary-band"><div><p>01 / DESCRIBE</p><b>Attach the right screen context.</b><span>Project files remain available from this workspace.</span></div><div><p>02 / REVIEW</p><b>Entitlement and impact checked.</b><span>Additional work is reviewed before it is added.</span></div><div><p>03 / RETURN</p><b>An updated preview is shared.</b><span>Review the new version before approving it.</span></div></div></div></div></section>;
  }

  if (page === "payments") {
    return <section className="workflow-surface"><div className="workflow-grid balanced-grid"><div className="workflow-card"><div className="workflow-heading"><div><p>QUOTE AND PAYMENT</p><h2>Approval comes before payment.</h2><span>Your exact scope, price, and payment request will appear here after the project review.</span></div><CreditCard size={24} /></div><div className="quote-rows"><div><span>Project quote</span><b>Awaiting scope confirmation</b></div><div><span>Payment state</span><b>Not due</b></div><div><span>Invoice history</span><b>No invoice released</b></div></div><button className="dash-primary wide" onClick={() => setPaymentRouteOpen(true)}>View payment route</button>{paymentRouteOpen && <div className="request-card"><b>Payment route protected</b><span>After final approval, a server-verified payment request and invoice appear here. Delivery remains locked until a separate quality release is completed.</span></div>}<div className="workflow-summary-band delivery-summary-band"><div><p>01 / REVIEW</p><b>Preview reviewed</b><span>The visual direction is assessed first.</span></div><div><p>02 / PAYMENT</p><b>Quote approval creates the route.</b><span>Payment is not currently due.</span></div><div><p>03 / RELEASE</p><b>Delivery is separately verified.</b><span>Downloads are protected until release.</span></div></div></div></div></section>;
  }

  if (page === "downloads") {
    return <section className="workflow-surface"><div className="workflow-card"><div className="workflow-heading"><div><p>DELIVERY CENTRE</p><h2>Released files will be protected.</h2><span>Delivery material becomes available after approval, verified payment, and final release.</span></div><ShieldCheck size={24} /></div><div className="delivery-lock"><Download size={26} /><div><b>Delivery is not released yet</b><span>Your project remains in its preview stage. Nothing is missing; protected downloads simply unlock later in the delivery lifecycle.</span></div></div><div className="delivery-checklist"><span><Check size={14} /> Approved project version</span><span>02 Verified payment</span><span>03 Final delivery quality check</span><span>04 Protected release</span></div><button className="quiet" onClick={() => setGuideOpen((current) => !current)}>{guideOpen ? "Hide delivery guide" : "View delivery guide"}</button>{guideOpen && <div className="request-card"><b>Delivery guide</b><span>When release is authorised, this page will show delivery contents, expiry-limited access, deployment instructions, and the exact version released.</span></div>}</div></section>;
  }

  if (page === "management") {
    const options = ["Hosting and deployment", "Domain management", "Technical maintenance", "Monitoring and backups"];
    const toggle = (service: string) => setServices((current) => current.includes(service) ? current.filter((item) => item !== service) : [...current, service]);
    return <section className="workflow-surface"><div className="workflow-grid balanced-grid"><div className="workflow-card"><div className="workflow-heading"><div><p>MANAGED SERVICE REQUEST</p><h2>Ask FerixBuilder to keep things running.</h2><span>Management stays optional. A request is reviewed before any service is accepted.</span></div><ShieldCheck size={24} /></div><div className="service-options">{options.map((option) => <button key={option} className={services.includes(option) ? "selected" : ""} onClick={() => toggle(option)}><i>{services.includes(option) ? <Check size={14} /> : "+"}</i><span>{option}</span></button>)}</div><label>Tell us about your operating needs<textarea value={managementNeeds} onChange={(event) => setManagementNeeds(event.target.value)} placeholder="Traffic expectations, launch date, existing domain, or support needs." /></label><button className="dash-primary wide" onClick={() => services.length ? setManagementSubmitted(true) : notify("Choose at least one requested service.")}>Request management review</button>{managementSubmitted && <div className="request-card"><b>Management request submitted</b><span>{services.join(", ")} selected. {managementNeeds.trim() ? `Operating note: ${managementNeeds}` : "No operating note added."} Your request is pending FerixBuilder review before any managed operations are enabled.</span></div>}<div className="workflow-summary-band"><div><p>REQUEST STATUS</p><b>{managementSubmitted ? "Under review" : "Not requested"}</b><span>Select services to start a scoped request.</span></div><div><p>OPERATIONS VISIBILITY</p><b>Permitted details only</b><span>Infrastructure credentials are never exposed.</span></div><div><p>ACTIVATION</p><b>Accepted before management begins</b><span>Service summaries appear only after approval.</span></div></div></div></div></section>;
  }

  if (page === "support") {
    return <section className="workflow-surface"><div className="workflow-grid balanced-grid"><div className="workflow-card conversation-card"><div className="workflow-heading"><div><p>SUPPORT TICKETS</p><h2>Project help, with the right context.</h2><span>Open a ticket and keep the delivery conversation in one place.</span></div><BellRing size={23} /></div><div className="conversation-log">{messages.length ? messages.map((message) => <div key={message.id} className="customer-message"><b>Ticket #{String(message.id).padStart(2, "0")} · You</b><span>{message.message}</span></div>) : <div className="empty-state">No open support tickets in preview mode. Your first message creates a numbered project request.</div>}</div><div className="message-composer"><textarea ref={ticketInput} value={ticket} onChange={(event) => setTicket(event.target.value)} placeholder="Describe what you need help with..." /><button onClick={() => { if (!ticket.trim()) return notify("Write a support message first."); setMessages((current) => [...current, { id: current.length + 1, message: ticket }]); setTicket(""); notify("Support ticket created in preview mode."); }}><Send size={16} /></button></div><div className="workflow-summary-band support-summary-band"><div><p>PROJECT CONTEXT</p><b>Attached to every ticket</b><span>Scope, preview, and delivery stage remain connected.</span></div><div><p>RESPONSE ROUTE</p><b>Priority follows your agreement</b><span>Support stays aligned with the delivery work.</span></div><div><p>PRIVATE MATERIALS</p><b>Attachments stay protected</b><span>Files remain inside the customer workspace.</span></div></div></div></div></section>;
  }

  if (page === "settings") {
    return <section className="workflow-surface"><div className="workflow-grid balanced-grid"><div className="workflow-card settings-workflow-card"><div className="workflow-heading"><div><p>ACCOUNT SETTINGS</p><h2>Your profile and workspace preferences.</h2><span>Manage preferences and customer-space notifications in one place.</span></div><Settings2 size={24} /></div><div ref={settingsForm} className="workflow-form compact"><label>Display name<input defaultValue="FerixBuilder customer" /></label><label>Business role<input defaultValue="Business owner" /></label><label className="full">Workspace email<input defaultValue="customer@example.com" /></label></div><button className="dash-primary" onClick={() => setSettingsSaved(true)}>Save settings</button>{settingsSaved && <div className="request-card"><b>Preferences saved in preview</b><span>Your profile and notification selections are retained locally for this preview session.</span></div>}<div className="settings-control-grid"><section><p className="mini-label">NOTIFICATIONS</p>{([['project', 'Project updates'], ['support', 'Support replies'], ['product', 'New business activity']] as const).map(([key, label]) => <button className="pref-row" key={key} onClick={() => setPrefs((current) => ({ ...current, [key]: !current[key] }))}><span>{label}</span><i className={prefs[key] ? "on" : ""}>{prefs[key] ? "On" : "Off"}</i></button>)}</section><section className="member-panel"><p className="mini-label">BUSINESS MEMBERS</p><div><input value={memberEmail} onChange={(event) => setMemberEmail(event.target.value)} placeholder="member@business.com" /><button onClick={() => { if (!memberEmail.trim()) return notify("Add a business member email first."); setMembers((current) => [...current, memberEmail.trim()]); setMemberEmail(""); }}>Add</button></div>{members.map((member) => <span key={member}>{member} <b>Pending invitation</b></span>)}</section></div></div></div></section>;
  }

  if (modules[page]) {
    const module = modules[page]; const ModuleIcon = module.icon;
    const records = businessRecords[page] ?? [];
    const searchResults = records.filter((record) => record.name.toLowerCase().includes(recordSearch.toLowerCase()));
    const filteredRecords = filterActive ? searchResults.filter((record) => record.status === module.statuses[1]) : searchResults;
    const addRecord = () => { const index = records.length; const next = { name: `New ${module.label} ${index + 1}`, status: module.statuses[index % module.statuses.length], detail: module.detail }; setBusinessRecords((current) => ({ ...current, [page]: [...(current[page] ?? []), next] })); setOpenRecord(next); notify(`${next.name} added.`); };
    return <section className="workflow-surface"><div className="workflow-card business-workflow-card"><div className="workflow-heading"><div><p>BUSINESS DATA MODULE</p><h2>Manage your {module.label} records.</h2><span>{module.description}</span></div><ModuleIcon size={24} /></div><div className="business-module-overview"><div><span>ACTIVE MODULE</span><b>{module.label[0].toUpperCase() + module.label.slice(1)}</b><small>{records.length} local preview record{records.length === 1 ? "" : "s"}</small></div><div><span>CURRENT VIEW</span><b>{filterActive ? module.statuses[1] : "All records"}</b><small>{recordSearch ? `Searching “${recordSearch}”` : "Ready to search and filter"}</small></div><div><span>DATA BOUNDARY</span><b>Private workspace</b><small>Only your permitted records appear</small></div></div><div className="business-records-board"><div className="business-board-heading"><div><p className="mini-label">RECORD WORKSPACE</p><b>{module.label[0].toUpperCase() + module.label.slice(1)} directory</b></div><span>{filteredRecords.length} visible</span></div><div className="module-toolbar"><input value={recordSearch} onChange={(event) => setRecordSearch(event.target.value)} placeholder={`Search ${module.label}s`} /><button className={filterActive ? "quiet active-filter" : "quiet"} onClick={() => setFilterActive((current) => !current)}>{filterActive ? "Show all" : module.filterLabel}</button><button className="quiet" onClick={() => setBusinessExported(true)}>Export view</button><button className="dash-primary" onClick={addRecord}><UserPlus size={15} /> Add {module.label}</button></div>{records.length ? filteredRecords.length ? <div className="record-list">{filteredRecords.map((record) => <div className="record-row" key={record.name}><ModuleIcon size={19} /><div><b>{record.name}</b><span>{record.status} · {record.detail}</span></div><button onClick={() => setOpenRecord(record)}>Open</button></div>)}</div> : <div className="empty-state">No {module.label} records match this view. Add another record or choose Show all.</div> : <div className="empty-state">No {module.label} records yet. Add one to test this delivered business-data module.</div>}</div><div className="business-context-band"><div><p>EXPORT CONTROL</p><b>{businessExported ? "Preview export prepared" : "Export when needed"}</b><span>Production exports remain tenant-scoped and time limited.</span></div><div><p>SELECTED RECORD</p><b>{openRecord?.name ?? "No record selected"}</b><span>{openRecord ? `${openRecord.status} · ${openRecord.detail}` : "Open a record to inspect its local preview detail."}</span></div></div>{businessExported && <div className="request-card"><b>Protected export prepared in preview</b><span>The production flow creates a tenant-scoped, time-limited data export. No other customer’s records are included.</span></div>}</div></section>;
  }

  if (page === "domain" || page === "technical-care" || page === "system-health") {
    return <section className="workflow-surface"><div className="workflow-card"><div className="workflow-heading"><div><p>MANAGED OPERATIONS</p><h2>{page === "domain" ? "Prepare your domain launch." : page === "technical-care" ? "Technical care is available after delivery." : "Safe system health summaries."}</h2><span>{page === "domain" ? "Domain connection begins when the project is ready for launch." : "Operational details appear only for accepted managed-service customers."}</span></div><Building2 size={24} /></div><div className="ops-grid"><div><span>Current visibility</span><b>Preview mode</b></div><div><span>Managed service</span><b>Not accepted</b></div><div><span>Credentials</span><b>Never exposed</b></div></div><button className="dash-primary" onClick={() => navigate("/workspace/management")}>Request managed services</button></div></section>;
  }

  return null;
}
