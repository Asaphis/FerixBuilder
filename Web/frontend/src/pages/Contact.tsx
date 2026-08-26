import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, Mail, MapPin, Phone } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { trpc } from "@/lib/trpc";

type ServiceType = "business_website" | "online_store" | "booking_system" | "customer_portal" | "custom_application";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType | "">("");
  const [message, setMessage] = useState("");
  const submitInquiry = trpc.contact.submit.useMutation({ onSuccess: () => setSubmitted(true) });

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!serviceType) return;
    submitInquiry.mutate({ name, businessName, email, serviceType, message });
  }

  return (
    <SiteShell>
      <main className="contact-page">
        <section className="contact-intro">
          <span>START A PROJECT</span>
          <h1>LET’S GIVE<br />THE WORK<br /><em>ROOM TO GROW.</em></h1>
          <p>Share the essentials. A FerixBuilder project begins with context, not a checkout form.</p>
          <div className="contact-details"><p><Mail size={15} /> hello@ferixbuilder.com</p><p><Phone size={15} /> WhatsApp enquiry welcome</p><p><MapPin size={15} /> Working with businesses remotely</p></div>
        </section>
        <section className="contact-form-wrap">
          {submitted ? <div className="form-success"><CheckCircle2 size={38} /><h2>Your brief is received.</h2><p>Thank you, {name}. Your project enquiry has been securely saved for the FerixBuilder team to review.</p><button onClick={() => { setSubmitted(false); setMessage(""); }}>Send another brief</button></div> :
            <form onSubmit={submit}>
              <label>Your name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" /></label>
              <label>Business name<input required value={businessName} onChange={(event) => setBusinessName(event.target.value)} placeholder="Business name" /></label>
              <label>Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@business.com" /></label>
              <label>What would you like to build?<select required value={serviceType} onChange={(event) => setServiceType(event.target.value as ServiceType | "")}><option value="" disabled>Select a starting point</option><option value="business_website">Business website</option><option value="online_store">Online store</option><option value="booking_system">Booking or service system</option><option value="customer_portal">Customer portal</option><option value="custom_application">Custom application</option></select></label>
              <label className="form-full">Tell us about the work<textarea required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="The business, your audience, the opportunity, and anything that is important to get right." rows={5} /></label>
              {submitInquiry.error && <p className="form-error">We could not send your brief just now. Please try again.</p>}
              <button type="submit" className="dark-button" disabled={submitInquiry.isPending}>{submitInquiry.isPending ? <><LoaderCircle size={15} className="animate-spin" /> Sending</> : "Send project brief"}</button>
              <p className="form-note">Your brief is sent securely to FerixBuilder for review. We use it only to respond to this enquiry and evaluate the project.</p>
            </form>}
        </section>
      </main>
    </SiteShell>
  );
}
