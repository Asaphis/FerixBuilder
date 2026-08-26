import { Link } from "wouter";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { startLogin } from "@/const";

const disciplines = ["Business websites", "Commerce systems", "Booking experiences", "Customer portals"];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f5f1e8] text-[#1e1e1b]">
      <header className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="font-sans text-[11px] font-medium uppercase tracking-[0.23em]">FerixBuilder</Link>
        <nav className="hidden items-center gap-8 font-sans text-[10px] uppercase tracking-[0.18em] text-[#5e5a53] md:flex">
          <a href="#approach">Approach</a><a href="#disciplines">What we build</a><a href="#start">Start a project</a>
        </nav>
        <Link href="/admin" className="border-b border-[#1e1e1b] pb-1 font-sans text-[10px] uppercase tracking-[0.18em] transition hover:text-[#a24d35]">Operations</Link>
      </header>

      <main>
        <section className="mx-auto grid max-w-[1440px] px-6 pt-14 md:grid-cols-12 md:px-12 md:pt-24">
          <div className="col-span-3 flex items-start gap-3 font-sans text-[10px] uppercase tracking-[0.22em] text-[#5e5a53]">
            <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-[#a24d35]" /> Digital delivery, considered
          </div>
          <div className="col-span-9 mt-12 md:mt-0">
            <p className="reveal mb-8 max-w-sm font-serif text-xl leading-relaxed text-[#5e5a53] md:ml-[14%]">A disciplined path from business ambition to a digital presence that feels inevitable.</p>
            <h1 className="reveal-late font-display text-[clamp(4.3rem,12vw,11.5rem)] leading-[0.76] tracking-[-0.075em]">Built around<br /><em className="font-normal">your business.</em></h1>
            <div className="mt-16 flex items-end justify-between border-t border-[#1e1e1b]/30 pt-4">
              <p className="max-w-xs font-sans text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#5e5a53]">Websites and business applications, crafted for clarity and delivered with care.</p>
              <a href="#approach" aria-label="Explore the FerixBuilder approach" className="grid h-11 w-11 place-items-center rounded-full border border-[#1e1e1b] transition hover:bg-[#1e1e1b] hover:text-[#f5f1e8] active:scale-[0.97]"><ArrowDown size={16} /></a>
            </div>
          </div>
        </section>

        <section id="approach" className="mx-auto mt-28 max-w-[1440px] px-6 md:mt-44 md:px-12">
          <div className="grid border-y border-[#1e1e1b]/25 md:grid-cols-12">
            <div className="col-span-3 border-b border-[#1e1e1b]/25 py-7 font-sans text-[10px] uppercase tracking-[0.22em] text-[#5e5a53] md:border-b-0">01 / The premise</div>
            <div className="col-span-9 py-10 md:py-16">
              <p className="max-w-4xl font-display text-4xl leading-[0.95] tracking-[-0.05em] md:text-6xl">Your business deserves more than a scattered collection of links, messages, and maybes.</p>
              <p className="mt-8 max-w-2xl font-serif text-xl leading-relaxed text-[#5e5a53]">FerixBuilder brings the development process into one composed experience: tell us what matters, see the work before you pay, and choose whether you would like us to manage what comes next.</p>
            </div>
          </div>
        </section>

        <section id="disciplines" className="mx-auto mt-28 max-w-[1440px] px-6 md:mt-44 md:px-12">
          <div className="mb-6 flex items-end justify-between"><p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#5e5a53]">02 / Disciplines</p><p className="font-serif text-lg italic text-[#5e5a53]">Designed for businesses in motion</p></div>
          <div className="grid border-t border-[#1e1e1b]/25 md:grid-cols-2">
            {disciplines.map((discipline, index) => (
              <div key={discipline} className="group flex min-h-36 items-center justify-between border-b border-[#1e1e1b]/25 py-6 md:px-8 odd:md:border-r">
                <span className="font-sans text-[10px] tracking-[0.18em] text-[#a24d35]">0{index + 1}</span><span className="font-display text-3xl tracking-[-0.04em] md:text-4xl">{discipline}</span><Plus size={16} className="transition group-hover:rotate-90" />
              </div>
            ))}
          </div>
        </section>

        <section id="start" className="mx-auto mt-28 max-w-[1440px] px-6 pb-14 md:mt-44 md:px-12 md:pb-20">
          <div className="relative overflow-hidden bg-[#1e1e1b] px-7 py-12 text-[#f5f1e8] md:grid md:grid-cols-12 md:px-12 md:py-20">
            <div className="absolute right-7 top-6 font-sans text-[10px] uppercase tracking-[0.22em] text-[#f5f1e8]/50">03 / Begin</div>
            <div className="col-span-3 font-sans text-[10px] uppercase tracking-[0.22em] text-[#f5f1e8]/50">A clear process</div>
            <div className="col-span-8 mt-16 md:mt-0">
              <h2 className="font-display text-5xl leading-[0.86] tracking-[-0.065em] md:text-8xl">The work is<br /><em className="font-normal">ready to begin.</em></h2>
              <p className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-[#f5f1e8]/70">Start with your business. We will translate the detail into a clear project, a private preview, and a delivery path that stays in your hands.</p>
              <button onClick={startLogin} className="mt-10 inline-flex items-center gap-3 border border-[#f5f1e8] px-5 py-3 font-sans text-[10px] uppercase tracking-[0.18em] transition hover:bg-[#f5f1e8] hover:text-[#1e1e1b] active:scale-[0.97]">Start your project <ArrowUpRight size={15} /></button>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1440px] items-center justify-between border-t border-[#1e1e1b]/25 px-6 py-5 font-sans text-[9px] uppercase tracking-[0.18em] text-[#5e5a53] md:px-12"><span>FerixBuilder / 2026</span><span>Made for meaningful work</span></footer>
    </div>
  );
}
