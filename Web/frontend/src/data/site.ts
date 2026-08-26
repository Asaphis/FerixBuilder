export const navItems = [
  ["Home", "/"], ["Services", "/services"], ["How it works", "/how-it-works"], ["Examples", "/examples"], ["Pricing", "/pricing"], ["About", "/about"], ["FAQ", "/faq"],
] as const;

export const services = [
  ["Monitor", "Business websites", "A clear, credible home for your work, services, and brand."],
  ["ShoppingCart", "Commerce stores", "Storefronts shaped for discovery, confidence, and conversion."],
  ["CalendarDays", "Booking systems", "Let people understand availability and take the next step."],
  ["PanelsTopLeft", "Customer portals", "Useful account spaces for clients, teams, and repeat work."],
  ["Workflow", "Custom web apps", "Focused tools designed around the way your business operates."],
  ["Wrench", "Technical care", "An optional managed service for the platform after delivery."],
] as const;

export const process = [
  ["01", "Tell us what matters", "Share the business, your audience, and what needs to change."],
  ["02", "We shape the build", "We assess the request and confirm a clear scope and route."],
  ["03", "Preview your website", "Review a private live version across desktop and mobile."],
  ["04", "Request refinements", "Use your included revision route to improve the work."],
  ["05", "Approve & pay", "Approve the result and complete verified payment securely."],
  ["06", "Receive & grow", "Access your delivery or request long-term technical care."],
] as const;

export type DetailKey = "services" | "how" | "examples" | "pricing" | "about" | "faq";
export const detailContent: Record<DetailKey, { eyebrow: string; title: string; intro: string; items: [string, string][] }> = {
  services: { eyebrow: "WHAT WE CAN BUILD", title: "Websites and tools built around the business.", intro: "FerixBuilder pairs a well-defined customer experience with the operational thinking required to make it useful after launch.", items: [["Business presence", "Structure your story, services, proof, and contact paths into a site that makes sense instantly."], ["Commerce & booking", "Create a direct customer journey for buying, booking, or requesting your services."], ["Portals & operations", "Give people the right account views, information, and self-service actions."]] },
  how: { eyebrow: "HOW IT WORKS", title: "A practical process with the big decision in your hands.", intro: "You should be able to see the work before final payment—not hope it becomes what you expected.", items: process.map((step) => [step[1], step[2]]) },
  examples: { eyebrow: "BUILD DIRECTIONS", title: "What your finished experience can make possible.", intro: "This library will publish approved FerixBuilder deliveries. Until then, these are the core patterns we can tailor to your business.", items: [["A confident first impression", "Give prospective customers a focused route from curiosity to enquiry."], ["A smoother purchase", "Make products or service packages easy to understand and act on."], ["A useful client space", "Move repeat requests, project updates, or account information into a clear digital space."]] },
  pricing: { eyebrow: "PLANS THAT FIT", title: "Start with the right level of care.", intro: "Every project is reviewed before a final quote. These ranges describe the kind of build each route is designed to support.", items: [["Essential", "A focused public website with strong fundamentals, responsive design, and core conversion routes."], ["Growth", "A more detailed business experience with richer content, customer journeys, and integrated functionality."], ["Custom", "A bespoke application, portal, commerce implementation, or operational product designed around a specific need."]] },
  about: { eyebrow: "ABOUT FERIXBUILDER", title: "A more certain way to get professional digital work done.", intro: "FerixBuilder exists for businesses that need a credible, useful digital presence without a confusing build process.", items: [["Clear scope", "We work from the purpose of the business—not a generic template or a vague technical checklist."], ["Visible progress", "The platform is designed for clear project stages, private previews, revisions, payment, and delivery."], ["Long-term choice", "Take control of your delivery or ask us to manage the technical responsibilities after launch."]] },
  faq: { eyebrow: "FREQUENTLY ASKED", title: "The answers you should have before you begin.", intro: "A better project starts with realistic expectations about the work, review, payment, and ongoing support.", items: [["Do I pay before I see the website?", "You submit your brief first. Final payment is requested after you have reviewed and approved the private preview, subject to your agreed scope."], ["Can I request changes?", "Yes. Each agreed scope includes a revision path so your feedback is considered before final approval."], ["Can FerixBuilder manage the technical side?", "Yes. You can request a managed service after delivery. It begins only after FerixBuilder accepts the requested arrangement."]] },
};
