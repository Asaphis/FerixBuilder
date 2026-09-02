import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, Mail, MessageCircle } from "lucide-react";
import { SiteShell } from "../components/SiteShell";

type Service = "business_website" | "online_store" | "booking_system" | "customer_portal" | "custom_application";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState<Service | "">("");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!serviceType) return;

    setLoading(true);
    try {
      const API_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:5006/api/trpc";
      const response = await fetch(`${API_URL}/contact.submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { name, businessName, email, serviceType, message },
        }),
      });

      const data = await response.json();
      if (data.result?.data) {
        setSent(true);
      } else {
        alert("Failed to submit contact form. Please try again.");
      }
    } catch (error) {
      alert("Failed to submit contact form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteShell>
      <main className="contact-page-new">
        <section>
          <p className="eyebrow"><MessageCircle size={12} /> START A PROJECT</p>
          <h1>LET'S BUILD<br />SOMETHING<br /><strong>USEFUL.</strong></h1>
          <p>Tell us about the business and the outcome you want. A clear, practical conversation starts here.</p>
          <div className="contact-promises">
            <span><CheckCircle2 /> No generic forms</span>
            <span><CheckCircle2 /> Response after review</span>
            <span><CheckCircle2 /> Your details stay private</span>
          </div>
        </section>
        <section className="contact-form-new">
          {sent ? (
            <div className="success">
              <CheckCircle2 size={42} />
              <h2>YOUR BRIEF IS IN.</h2>
              <p>Thank you, {name}. Your project enquiry has been securely recorded for the FerixBuilder team.</p>
              <button onClick={() => setSent(false)}>Send another brief</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <label>Name<input required value={name} onChange={event => setName(event.target.value)} placeholder="Your name" /></label>
              <label>Business<input required value={businessName} onChange={event => setBusinessName(event.target.value)} placeholder="Business name" /></label>
              <label>Email<input required type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@business.com" /></label>
              <label>What do you need?<select required value={serviceType} onChange={event => setServiceType(event.target.value as Service | "")}><option value="" disabled>Select a direction</option><option value="business_website">Business website</option><option value="online_store">Online store</option><option value="booking_system">Booking system</option><option value="customer_portal">Customer portal</option><option value="custom_application">Custom application</option></select></label>
              <label className="wide">Project context<textarea required rows={6} value={message} onChange={event => setMessage(event.target.value)} placeholder="What does your business need to make easier, clearer, or possible?" /></label>
              <button type="submit" disabled={loading} className="primary-button">
                {loading ? <LoaderCircle size={20} className="spinner" /> : "Send your brief"}
              </button>
            </form>
          )}
        </section>
      </main>
    </SiteShell>
  );
}
