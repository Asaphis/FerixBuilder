import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { verifyEmail, setAuthToken } from "../lib/realAuth";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link. No token provided.");
        return;
      }

      try {
        const result = await verifyEmail(token);

        if (result.success) {
          setStatus("success");
          setMessage(result.alreadyVerified ? "Your email is already verified. You can now log in." : "Email verified successfully! You can now log in.");
          
          // Auto-login after verification
          setAuthToken(token);
          setTimeout(() => setLocation("/dashboard"), 2000);
        }
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Verification failed. The link may be expired or invalid.");
      }
    };

    verify();
  }, [setLocation]);

  return (
    <main className="auth-page">
      <section className="auth-aside">
        <Link href="/" className="brand">
          <span>Ferix</span><span>Builder</span>
        </Link>
        <div>
          <p className="eyebrow">EMAIL VERIFICATION</p>
          <h1>VERIFY YOUR ACCOUNT</h1>
          <p>Complete your registration by verifying your email address.</p>
        </div>
      </section>
      <section className="auth-card">
        <Link href="/" className="back-home">← Back to home</Link>
        <div>
          <p className="eyebrow light">VERIFICATION STATUS</p>
          <h2>
            {status === "loading" && "Verifying..."}
            {status === "success" && "Verification Complete"}
            {status === "error" && "Verification Failed"}
          </h2>
          <div className="verification-status">
            {status === "loading" && <Loader2 className="spinner" size={48} />}
            {status === "success" && <CheckCircle size={48} className="success" />}
            {status === "error" && <XCircle size={48} className="error" />}
          </div>
          <p>{message}</p>
          {status === "success" && <p>Redirecting to dashboard...</p>}
          {status === "error" && (
            <div className="auth-switch">
              <p>Need a new verification link? <Link href="/register">Register again</Link></p>
              <p>Already verified? <Link href="/login">Sign in</Link></p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
