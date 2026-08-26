import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import { Link } from "wouter";

export function PublicAccountCallout() {
  return <div className="public-account-callout"><span>Have a project already?</span><Link href="/dashboard"><LogIn size={13} /> Log in</Link><Link href="/dashboard"><UserPlus size={13} /> Create account <ArrowRight size={13} /></Link></div>;
}
