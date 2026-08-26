import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { ArrowUpRight, LockKeyhole, ShieldCheck } from "lucide-react";

export default function AdminEntry() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <main className="grid min-h-screen place-items-center bg-[#f5f1e8] font-sans text-xs uppercase tracking-[0.28em] text-[#5e5a53]">Verifying access</main>;
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#f5f1e8] px-6 py-10 text-[#1e1e1b] md:px-12">
        <div className="mx-auto grid min-h-[80vh] max-w-5xl content-center gap-10 border-y border-[#1e1e1b]/20 py-14 md:grid-cols-[1fr_1.2fr]">
          <div className="flex items-start gap-3 text-xs uppercase tracking-[0.24em] text-[#5e5a53]"><LockKeyhole size={14} /> Internal operations</div>
          <div>
            <p className="mb-5 font-sans text-xs uppercase tracking-[0.25em] text-[#a24d35]">FerixBuilder / Web/admin</p>
            <h1 className="font-display text-5xl leading-[0.9] tracking-[-0.06em] md:text-7xl">Access is intentionally restricted.</h1>
            <p className="mt-8 max-w-md font-serif text-xl leading-relaxed text-[#5e5a53]">Sign in with an authorized internal account to enter the operations workspace.</p>
            <button onClick={startLogin} className="mt-10 inline-flex items-center gap-3 bg-[#1e1e1b] px-5 py-3 font-sans text-xs uppercase tracking-[0.2em] text-[#f5f1e8] transition hover:bg-[#a24d35] active:scale-[0.97]">Sign in <ArrowUpRight size={15} /></button>
          </div>
        </div>
      </main>
    );
  }

  if (user?.role !== "admin") {
    return (
      <main className="min-h-screen bg-[#f5f1e8] px-6 py-10 text-[#1e1e1b] md:px-12">
        <div className="mx-auto grid min-h-[80vh] max-w-5xl content-center gap-10 border-y border-[#1e1e1b]/20 py-14 md:grid-cols-[1fr_1.2fr]">
          <div className="flex items-start gap-3 text-xs uppercase tracking-[0.24em] text-[#5e5a53]"><ShieldCheck size={14} /> Signed in</div>
          <div>
            <p className="mb-5 font-sans text-xs uppercase tracking-[0.25em] text-[#a24d35]">Permission required</p>
            <h1 className="font-display text-5xl leading-[0.9] tracking-[-0.06em] md:text-7xl">This workspace is for the FerixBuilder team.</h1>
            <p className="mt-8 max-w-md font-serif text-xl leading-relaxed text-[#5e5a53]">Your account is authenticated but does not have internal operations access.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f1e8] px-6 py-10 text-[#1e1e1b] md:px-12">
      <div className="mx-auto max-w-6xl border-t border-[#1e1e1b]/25 pt-4">
        <div className="flex items-center justify-between font-sans text-[10px] uppercase tracking-[0.24em] text-[#5e5a53]"><span>FerixBuilder / Web/admin</span><span>Authorized operations</span></div>
        <section className="grid min-h-[70vh] content-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div><p className="mb-5 font-sans text-xs uppercase tracking-[0.25em] text-[#a24d35]">Workspace prepared</p><h1 className="font-display text-6xl leading-[0.85] tracking-[-0.07em] md:text-8xl">Operations, with intention.</h1></div>
          <div className="border-l border-[#1e1e1b]/20 pl-6 font-serif text-xl leading-relaxed text-[#5e5a53]">Project review, payment controls, delivery release, support, and managed-service workflows will live here. Server-side administrator procedures already protect this boundary.</div>
        </section>
      </div>
    </main>
  );
}
