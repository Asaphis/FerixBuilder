import { useEffect } from "react";
import { useLocation } from "wouter";
import { getPreviewAccount } from "@/lib/customerAccess";

export default function CustomerRoute({ children, allowIncomplete = false, allowPreviewDashboard = false }: { children: React.ReactNode; allowIncomplete?: boolean; allowPreviewDashboard?: boolean }) {
  const [, navigate] = useLocation();
  const account = getPreviewAccount();

  useEffect(() => {
    if (!account?.signedIn && !allowPreviewDashboard) navigate("/login");
    else if (account?.signedIn && !account.onboardingComplete && !allowIncomplete) navigate("/workspace/onboarding");
  }, [account?.onboardingComplete, account?.signedIn, allowIncomplete, allowPreviewDashboard, navigate]);

  if ((!account?.signedIn && !allowPreviewDashboard) || (account?.signedIn && !account.onboardingComplete && !allowIncomplete)) return null;
  return <>{children}</>;
}
