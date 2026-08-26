import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, Check, CircleDot } from "lucide-react";
import { Link } from "wouter";
import { processSteps, serviceCards } from "@/data/site";
import { SiteShell } from "@/components/SiteShell";

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };

export default function Home() {
  return <SiteShell><main>
    <section className="hero-grid">
      <motion.div className="hero-kicker" initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5 }}><CircleDot size={13} /> FERIXBUILDER / DIGITAL DELIVERY</motion.div>
      <div className="hero-copy">
        <motion.p className="hero-eyebrow" initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5, delay: 0.08 }}>A clear path from business ambition<br />to a digital presence that performs.</motion.p>
        <motion.h1 initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.65, delay: 0.14 }}>BUILD<br /><span>WHAT’S NEXT.</span></motion.h1>
        <motion.div className="hero-bottom" initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.5, delay: 0.22 }}><p>Websites and applications shaped around the way your business actually works.</p><Link href="/contact" className="round-link" aria-label="Start a FerixBuilder project"><ArrowDownRight /></Link></motion.div>
      </div>
      <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}><img src="/manus-storage/ferixbuilder-metallic-hero_9eabde75.jpg" alt="Abstract metallic architectural form" /><div className="visual-caption"><span>Preview first</span><span>Pay when approved</span></div></motion.div>
      <div className="marquee"><div>CLARITY &nbsp; / &nbsp; CRAFT &nbsp; / &nbsp; CONTROL &nbsp; / &nbsp; CLARITY &nbsp; / &nbsp; CRAFT &nbsp; / &nbsp; CONTROL &nbsp; / &nbsp;</div></div>
    </section>

    <section className="statement-section"><div className="section-index">01 / THE PREMISE</div><div className="statement"><p>YOUR BUSINESS DESERVES MORE THAN A STATUS UPDATE.</p><span>We build considered websites and business applications that make it easier for customers to understand you, choose you, and come back.</span></div></section>

    <section className="services-preview"><div className="section-heading"><div><span>02 / WHAT WE BUILD</span><h2>MADE FOR<br /><em>MOTION.</em></h2></div><Link href="/services" className="text-link">Explore services <ArrowRight size={14} /></Link></div><div className="service-grid">{serviceCards.map((service, index) => <motion.article key={service.title} className="service-card" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}><span>{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><Link href="/services" aria-label={`Learn about ${service.title}`}><ArrowRight size={18} /></Link></motion.article>)}</div></section>

    <section className="proof-section"><div className="proof-dark"><span>THE FERIXBUILDER DIFFERENCE</span><h2>SEE THE WORK.<br /><i>THEN DECIDE.</i></h2><p>You receive a private live preview before final payment. Review the experience, request included changes, approve the work, then unlock delivery.</p><Link href="/how-it-works" className="light-button">How it works <ArrowRight size={15} /></Link></div><div className="proof-list">{["No upfront final payment", "Private responsive preview", "Controlled revision process", "Self-managed or managed service"].map((item) => <div key={item}><Check size={17} /><span>{item}</span></div>)}</div></section>

    <section className="process-section"><div className="section-heading"><div><span>03 / A CLEAR PROCESS</span><h2>FROM BRIEF<br />TO <em>BUILT.</em></h2></div><Link href="/how-it-works" className="text-link">View the process <ArrowRight size={14} /></Link></div><div className="process-grid">{processSteps.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="cta-section"><div className="section-index">04 / START HERE</div><div><h2>LET’S MAKE<br /><em>THE RIGHT FIRST<br />IMPRESSION.</em></h2><p>Tell us about the business and the work in front of you. We’ll take it from there.</p><Link href="/contact" className="dark-button">Start your project <ArrowRight size={15} /></Link></div></section>
  </main></SiteShell>;
}
