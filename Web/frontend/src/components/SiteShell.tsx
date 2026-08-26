import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, MessageCircle, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { navItems } from "@/data/site";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  return <div className="app-shell">
    <header className="topbar"><Link href="/" className="brand"><span><Sparkles size={15} /></span>Ferix<span>Builder</span></Link><nav className="nav-links">{navItems.map(([label, href]) => <Link key={href} href={href} className={location === href ? "active" : ""}>{label}</Link>)}</nav><div className="top-actions"><Link href="/contact" className="contact-link"><MessageCircle size={15} /> Talk to us</Link><Link href="/contact" className="start-link">Get started <ArrowUpRight size={15} /></Link><button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Open navigation">{open ? <X /> : <Menu />}</button></div></header>
    <AnimatePresence>{open && <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .2 }}>{navItems.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)}>Get started</Link></motion.nav>}</AnimatePresence>
    {children}
    <footer className="site-footer"><div className="brand"><span><Sparkles size={15} /></span>Ferix<span>Builder</span></div><p>Better digital work starts with a clearer route.</p><div>{navItems.slice(1).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/contact">Contact</Link></div></footer>
  </div>;
}
