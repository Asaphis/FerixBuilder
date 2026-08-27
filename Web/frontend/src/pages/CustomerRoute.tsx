import { useEffect } from "react";
import { useLocation } from "wouter";
import { getPreviewAccount } from "@/lib/customerAccess";

export default function CustomerRoute({ children, allowIncomplete = false }: { children: React.ReactNode; allowIncomplete?: boolean }) {
  const [, navigate] = useLocation();
  const account = getPreviewAccount();

  useEffect(() => {
    if (!account?.signedIn) navigate("/login");
    else if (!account.onboardingComplete && !allowIncomplete) navigate("/workspace/onboarding");
  }, [account?.onboardingComplete, account?.signedIn, allowIncomplete, navigate]);

  if (!account?.signedIn || (!account.onboardingComplete && !allowIncomplete)) return null;
  return <>{children}</>;
}
