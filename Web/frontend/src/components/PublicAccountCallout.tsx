import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import { Link } from "wouter";

export function PublicAccountCallout() {
  return <div className="public-account-callout"><span>Have a project already?</span><Link href="/login"><LogIn size={13} /> Log in</Link><Link href="/register"><UserPlus size={13} /> Create account <ArrowRight size={13} /></Link></div>;
}
