import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, Mail, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { SiteShell } from "../components/SiteShell";

type Service = "business_website" | "online_store" | "booking_system" | "customer_portal" | "custom_application";
const directionLabels: Record<Service, string> = { business_website: "Business website", online_store: "Online store", booking_system: "Booking website", customer_portal: "Customer portal", custom_application: "Custom application" };
const projectTypeMapping: Record<Service, "WEBSITE" | "E_COMMERCE" | "APPLICATION" | "CUSTOM"> = { business_website: "WEBSITE", online_store: "E_COMMERCE", booking_system: "APPLICATION", customer_portal: "APPLICATION", custom_application: "CUSTOM" };

export default function StartProject() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState<Service | "">("");
  const [message, setMessage] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!serviceType) return;

    setLoading(true);
    try {
      const API_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:5006/api";
      const response = await fetch(`${API_URL}/project-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          businessName,
          email,
          serviceType,
          message,
        }),
      });

      const data = await response.json();
      if (data.id) {
        setSent(true);
      } else {
        alert("Failed to submit project request. Please try again.");
      }
    } catch (error) {
      alert("Failed to submit project request. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return <SiteShell><main className="contact-page-new project-brief-page"><section><p className="eyebrow"><MessageCircle size={12} /> START A PROJECT</p><h1>LET’S BUILD<br />SOMETHING<br /><strong>USEFUL.</strong></h1><p>Send a quick project brief first. Creating an account comes afterwards so you can track the request securely in your workspace.</p><div className="contact-promises"><span><CheckCircle2 /> A focused, five-field first step</span><span><CheckCircle2 /> Account setup stays separate</span><span><CheckCircle2 /> Your details stay private</span></div></section><section className="contact-form-new">{sent ? <div className="success"><CheckCircle2 size={42} /><h2>YOUR BRIEF IS IN.</h2><p>Thank you, {name}. Your FerixBuilder project brief is saved. Create an account next to verify your email, keep the brief, and follow the project from your dashboard.</p><div className="brief-next-actions"><Link href="/register" className="primary-button">Create account to track your project</Link><Link href="/login" className="small-link">I already have an account</Link></div></div> : <form onSubmit={submit}><label>Name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" /></label><label>Business<input required value={businessName} onChange={(event) => setBusinessName(event.target.value)} placeholder="Business name" /></label><label>Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@business.com" /></label><label>What do you need?<select required value={serviceType} onChange={(event) => setServiceType(event.target.value as Service | "")}><option value="" disabled>Select a direction</option><option value="business_website">Business website</option><option value="online_store">Online store</option><option value="booking_system">Booking website</option><option value="customer_portal">Customer portal</option><option value="custom_application">Custom application</option></select></label><label className="wide">Project context<textarea required rows={6} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What does your business need to make easier, clearer, or possible?" /></label>{mutation.error && <p className="form-error">Your project brief could not be sent just now. Please try again.</p>}<button className="primary-button" disabled={mutation.isPending}>{mutation.isPending ? <><LoaderCircle className="spin" size={16} /> Sending</> : <>Send project brief <Mail size={16} /></>}</button><p className="brief-account-note">Already have an account? <Link href="/login">Log in</Link> to continue in your dashboard.</p></form>}</section></main></SiteShell>;
}
