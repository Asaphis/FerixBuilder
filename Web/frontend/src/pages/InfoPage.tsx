import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { pageContent, type PageKey } from "@/data/site";
import { SiteShell } from "@/components/SiteShell";

export default function InfoPage({ page }: { page: PageKey }) {
  const content = pageContent[page];
  return <SiteShell><main className="info-page"><motion.section className="page-hero" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}><span>{content.eyebrow}</span><h1>{content.title}</h1><p>{content.lead}</p></motion.section><section className="content-list">{content.sections.map((section, index) => <motion.article key={section.heading} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: index * 0.05 }}><span>0{index + 1}</span><h2>{section.heading}</h2><p>{section.body}</p></motion.article>)}</section><section className="inline-cta"><p>Have a project in mind?</p><Link href="/contact">Start the conversation <ArrowRight size={15} /></Link></section></main></SiteShell>;
}
