export const navigation = [
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Examples", href: "/examples" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const serviceCards = [
  { number: "01", title: "Business websites", text: "A credible, conversion-aware home for the business you are building." },
  { number: "02", title: "Commerce systems", text: "Distinct storefronts that make products easy to discover and buy." },
  { number: "03", title: "Booking & service", text: "Practical flows that help customers move from inquiry to commitment." },
  { number: "04", title: "Custom applications", text: "Focused portals and business tools designed around real operations." },
];

export const processSteps = [
  ["01", "Tell us what matters", "Share your business context, goals, brand material, and the work you need done."],
  ["02", "We shape the direction", "We review the detail, align on scope, and provide a clear quote before production begins."],
  ["03", "See it before payment", "You receive a private, responsive preview. Review it, request included changes, then approve."],
  ["04", "Receive or retain support", "After verified payment and delivery release, manage it yourself or request ongoing technical care."],
] as const;

export type PageKey = "services" | "pricing" | "examples" | "how" | "about" | "faq" | "privacy" | "terms" | "refund";

export const pageContent: Record<PageKey, { eyebrow: string; title: string; lead: string; sections: { heading: string; body: string }[] }> = {
  services: {
    eyebrow: "What we build", title: "Digital work with a clear reason to exist.", lead: "FerixBuilder creates polished business websites and focused applications for organisations ready to be easier to understand, find, and work with.",
    sections: [
      { heading: "A focused public presence", body: "We bring brand, essential information, customer journeys, and a responsive interface into one considered website rather than another disconnected online channel." },
      { heading: "A useful business layer", body: "Where the work calls for it, we shape e-commerce, booking, customer portal, or workflow features around the way your team and customers already operate." },
      { heading: "An ongoing option", body: "After delivery, you can take the source and manage it independently, or ask FerixBuilder to host, maintain, monitor, and support the system." },
    ],
  },
  pricing: {
    eyebrow: "Investment", title: "A starting point, not a one-size-fits-all promise.", lead: "Every business has its own degree of complexity. Packages establish a clear starting scope; your final price is confirmed after we understand the work.",
    sections: [
      { heading: "Starter website", body: "For a compact, professional business presence with essential pages, responsive design, core contact paths, and a defined revision allowance." },
      { heading: "Business website", body: "For organisations that need a broader information structure, service or product presentation, galleries, and more tailored customer journeys." },
      { heading: "Custom application", body: "For projects involving specialised workflows, data, customer accounts, bookings, commerce, or operational tools. These are priced after review." },
    ],
  },
  examples: {
    eyebrow: "Built with intent", title: "The evidence will be in the work, not in borrowed claims.", lead: "This is where completed FerixBuilder projects and their live previews will appear. We will only publish work that has been delivered and authorised for display.",
    sections: [
      { heading: "A considered public presence", body: "A business website should orient a first-time visitor in seconds: what you do, why it matters, and the clearest next action." },
      { heading: "A better path to purchase", body: "A commerce experience should support browsing, confidence, and a simple hand-off to payment without losing the brand's point of view." },
      { heading: "A less manual operation", body: "A portal or internal tool should make recurring work clearer for people, rather than simply putting an existing problem into a browser." },
    ],
  },
  how: {
    eyebrow: "The process", title: "A more certain way to arrive at the right thing.", lead: "FerixBuilder turns a traditionally opaque development engagement into a defined sequence with clear customer decisions at every meaningful moment.",
    sections: [
      { heading: "The brief", body: "Create an account, tell us about your business, upload materials, and explain exactly what you want to make possible." },
      { heading: "The review", body: "We examine the request, clarify scope where necessary, and confirm the delivery route and price before starting production." },
      { heading: "The preview", body: "You review a private live version in desktop, tablet, and mobile contexts. Approval comes only after you have seen the work." },
    ],
  },
  about: {
    eyebrow: "About FerixBuilder", title: "Professional digital work should not feel unreachable.", lead: "FerixBuilder exists to give businesses a clear path from an idea to a credible website or application—without the uncertainty and fragmentation common to traditional development.",
    sections: [
      { heading: "Built for clarity", body: "We translate business context into an understandable scope, an intentional interface, and a delivery process that makes the next step visible." },
      { heading: "Built for ownership", body: "After delivery, clients can manage their own deployment according to their package, or choose an accepted management relationship with our technical team." },
      { heading: "Built for continuity", body: "The platform is designed to keep project conversations, source delivery, support, and approved technical care connected over time." },
    ],
  },
  faq: {
    eyebrow: "Frequently asked", title: "The questions worth answering early.", lead: "We believe a good engagement starts with clarity about what happens before, during, and after the build.",
    sections: [
      { heading: "Do I pay before development?", body: "You begin by submitting your requirements. The final project payment is requested after you have reviewed and approved the completed preview, subject to the agreed project terms." },
      { heading: "Can I request changes?", body: "Yes. Each package includes a defined revision allowance. You can submit clear feedback during the review stage, and additional revisions can be quoted where needed." },
      { heading: "Can you manage the technical side?", body: "Yes. You can request hosting, monitoring, backups, technical support, and maintenance. Management begins only when we review and accept the requested arrangement." },
    ],
  },
  privacy: {
    eyebrow: "Privacy", title: "Your information deserves a careful boundary.", lead: "This initial privacy summary explains the principles FerixBuilder will follow while the full production policy is finalised with legal review.",
    sections: [
      { heading: "What we collect", body: "Account, contact, project, business, brand, and support information supplied to help us evaluate, build, deliver, or support an engagement." },
      { heading: "How we use it", body: "Information is used to provide the platform and services, communicate about a project, operate secure accounts, and meet legal or contractual responsibilities." },
      { heading: "How we protect it", body: "Business data is isolated by authorised tenant access. Private material is stored through protected services and is not exposed through public database or infrastructure credentials." },
    ],
  },
  terms: {
    eyebrow: "Terms", title: "A clear agreement supports better work.", lead: "These launch-stage terms outline the commercial and access principles that will govern FerixBuilder engagements until the full production terms are adopted.",
    sections: [
      { heading: "Scope and quotation", body: "Packages are starting points. The final scope, price, delivery materials, revision allowance, and timeline are confirmed for each approved project." },
      { heading: "Review and delivery", body: "Customers review a private preview before final payment. Delivery is released after payment verification and final operational checks by FerixBuilder." },
      { heading: "Managed service", body: "Hosting or technical management is not automatic. It is an optional service activated only after a customer request and FerixBuilder acceptance." },
    ],
  },
  refund: {
    eyebrow: "Refund policy", title: "A fair process, clearly stated.", lead: "Refund eligibility depends on the specific milestone, approved scope, and payment type. The final production policy will accompany each customer agreement.",
    sections: [
      { heading: "Before approval", body: "Questions about a project, scope, or invoice should be raised as early as possible so we can assess the matter against the agreed engagement." },
      { heading: "After approval and release", body: "Approved, paid, and released project work involves completed digital services and delivery materials. Any concern is reviewed against the project agreement and applicable law." },
      { heading: "Managed services", body: "Recurring managed-service charges and cancellations will be governed by the accepted management plan, billing interval, and any agreed notice period." },
    ],
  },
};
