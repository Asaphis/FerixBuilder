import { useEffect } from "react";
import { useLocation } from "wouter";
import { isAuthenticated } from "../lib/realAuth";

export default function CustomerRoute({ children, allowIncomplete = false, allowPreviewDashboard = false }: { children: React.ReactNode; allowIncomplete?: boolean; allowPreviewDashboard?: boolean }) {
  const [, navigate] = useLocation();
  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated && !allowPreviewDashboard) navigate("/login");
  }, [authenticated, allowPreviewDashboard, navigate]);

  if (!authenticated && !allowPreviewDashboard) return null;
  return <>{children}</>;
}
