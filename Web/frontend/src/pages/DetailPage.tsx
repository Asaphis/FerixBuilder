import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { detailContent, type DetailKey } from "@/data/site";
import { SiteShell } from "@/components/SiteShell";

export default function DetailPage({ page }: { page: DetailKey }) { const content = detailContent[page]; return <SiteShell><main className="detail-page"><section className="detail-hero"><p className="eyebrow"><Sparkles size={12} /> {content.eyebrow}</p><h1>{content.title}</h1><p>{content.intro}</p><Link href="/contact" className="primary-button">Start a conversation <ArrowRight size={16} /></Link></section><section className="detail-list">{content.items.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{body}</p></article>)}</section></main></SiteShell>; }
