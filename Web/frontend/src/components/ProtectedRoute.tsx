import { useEffect } from "react";
import { useLocation } from "wouter";
import { isAuthenticated, getAuthToken } from "../lib/realAuth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setLocation("/login");
    }
  }, [setLocation]);

  if (!isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}
