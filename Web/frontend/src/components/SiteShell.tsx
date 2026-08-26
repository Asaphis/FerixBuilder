import { AnimatePresence, motion } from "framer-motion";
import { Menu, MoveUpRight, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { navigation } from "@/data/site";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return <div className="site-shell">
    <header className="site-header">
      <Link href="/" className="wordmark" onClick={() => setOpen(false)}>FERIX<span>BUILDER</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => <Link key={item.href} href={item.href} className={location === item.href ? "is-active" : ""}>{item.label}</Link>)}
      </nav>
      <div className="header-actions"><Link href="/contact" className="header-contact">Start a project <MoveUpRight size={13} /></Link><button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X size={20} /> : <Menu size={20} />}</button></div>
    </header>
    <AnimatePresence>{open && <motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }} className="mobile-menu" aria-label="Mobile navigation">
      {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)}>Start a project</Link>
    </motion.nav>}</AnimatePresence>
    {children}
    <footer className="site-footer"><div><span className="wordmark">FERIX<span>BUILDER</span></span><p>Professional digital work, delivered with clarity.</p></div><div className="footer-links"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refund-policy">Refund policy</Link><Link href="/contact">Contact</Link></div><p className="footer-mark">© 2026</p></footer>
  </div>;
}
