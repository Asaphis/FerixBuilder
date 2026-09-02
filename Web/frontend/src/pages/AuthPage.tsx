import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { registerUser, loginUser, setAuthToken } from "../lib/realAuth";

export default function AuthPage({ mode }: { mode: "login" | "register" | "verify" | "forgot" | "reset" }) {
  const isLogin = mode === "login";
  const isRegister = mode === "register";
  const isVerify = mode === "verify";
  const isForgot = mode === "forgot";
  const [, setLocation] = useLocation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const heading = isLogin ? "PICK UP WHERE YOU LEFT OFF." : isVerify ? "VERIFY YOUR ACCOUNT." : isForgot || mode === "reset" ? "GET BACK INTO YOUR ACCOUNT." : "START WITH A CLEARER FIRST STEP.";
  const title = isLogin ? "Welcome back" : isVerify ? "Check your email" : isForgot ? "Forgot your password?" : mode === "reset" ? "Create a new password" : "Create your account";
  const intro = isLogin ? "Sign in to continue with the project you have already set up." : isVerify ? "We sent a verification link to your email address." : isForgot ? "Enter your email and we will prepare a reset route." : mode === "reset" ? "Choose a new password for your account." : "Create your account first. Business and project details come next in a guided setup.";
  const passwordIsValid = password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password);

  const submit = async () => {
    setFeedback("");
    setLoading(true);

    try {
      if (isRegister) {
        if (!fullName.trim() || !email.trim() || !phone.trim() || !passwordIsValid || password !== confirmPassword || !acceptedTerms) {
          setFeedback("Complete every field, use a strong password, and accept the terms.");
          setLoading(false);
          return;
        }

        const result = await registerUser({ email, password, name: fullName });

        if (result.success) {
          if (result.emailSent) {
            setLocation("/verify-email");
          } else {
            setFeedback("Registration successful but email verification failed. Please contact support.");
          }
        }
      }

      if (isLogin) {
        const result = await loginUser(email, password);

        if (result.success && result.tokens) {
          setAuthToken(result.tokens.accessToken);
          setLocation("/dashboard");
        }
      }

      if (isForgot) {
        if (!email.trim()) {
          setFeedback("Enter the email address connected to your account.");
          setLoading(false);
          return;
        }
        setFeedback("Password reset link sent to your email.");
      }

      if (mode === "reset") {
        if (!passwordIsValid || password !== confirmPassword) {
          setFeedback("Use matching strong passwords: 8+ characters with uppercase, lowercase, number, and special character.");
          setLoading(false);
          return;
        }
        setFeedback("Password updated. You can now sign in.");
      }
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-aside">
        <Link href="/" className="brand">
          <span><Sparkles size={15} /></span>Ferix<span>Builder</span>
        </Link>
        <div>
          <p className="eyebrow"><ShieldCheck size={12} /> CUSTOMER PROJECT WORKSPACE</p>
          <h1>
            {heading.split(" ").map((word, index) => (
              <span key={`${word}-${index}`}>
                {index === heading.split(" ").length - 1 ? <strong>{word}</strong> : word} {index === 1 && <br />}
              </span>
            ))}
          </h1>
          <p>{isLogin ? "A returning customer signs in and continues directly to the dashboard once onboarding is complete." : "Registration remains quick. The project brief is collected only after the account has been verified."}</p>
        </div>
        <div className="auth-benefits">
          <span><CheckCircle2 /> Separate account and project setup</span>
          <span><CheckCircle2 /> Email verification before onboarding</span>
          <span><CheckCircle2 /> Returning customers go to their dashboard</span>
        </div>
      </section>
      <section className="auth-card">
        <Link href="/" className="back-home">← Back to home</Link>
        <div>
          <p className="eyebrow light">{isLogin ? "WELCOME BACK" : isVerify ? "VERIFY EMAIL" : isForgot || mode === "reset" ? "ACCOUNT RECOVERY" : "CREATE YOUR ACCOUNT"}</p>
          <h2>{title}</h2>
          <p>{intro}</p>
          {isVerify && <p className="auth-inline-note">Check your email for the verification link. Click the link to verify your account.</p>}
          <div className="auth-form">
            {isRegister && (
              <>
                <label>Full name<input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Your name" /></label>
                <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
                <label>WhatsApp or phone number<input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+234 000 000 0000" /></label>
              </>
            )}
            {(isLogin || isForgot) && <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>}
            {(isRegister || isLogin || mode === "reset") && (
              <>
                <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" /></label>
                {(isRegister || mode === "reset") && <label>Confirm password<input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="••••••••" /></label>}
              </>
            )}
            {isRegister && (
              <label className="checkbox-label">
                <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />
                <span>I accept the terms and conditions</span>
              </label>
            )}
            {feedback && <p className="auth-feedback">{feedback}</p>}
            <button type="button" onClick={submit} disabled={loading} className="auth-submit">
              {loading ? "Processing..." : (isLogin ? "Sign in" : isVerify ? "Resend verification" : isForgot ? "Send reset link" : mode === "reset" ? "Update password" : "Create account")} <ArrowRight size={18} />
            </button>
          </div>
          <div className="auth-switch">
            {isLogin ? <p>New to FerixBuilder? <Link href="/register">Create an account</Link></p> : isRegister ? <p>Already have an account? <Link href="/login">Sign in</Link></p> : isVerify ? <p>Didn't receive the email? <button type="button" onClick={submit}>Resend</button></p> : isForgot && <p>Remember your password? <Link href="/login">Sign in</Link></p>}
          </div>
        </div>
      </section>
    </main>
  );
}
