import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import DetailPage from "./pages/DetailPage";
import Dashboard from "./pages/Dashboard";
import WorkspacePage from "./pages/WorkspacePage";
import AuthPage from "./pages/AuthPage";
import StartProject from "./pages/StartProject";
import VerifyEmail from "./pages/VerifyEmail";
import { ProtectedRoute } from "./components/ProtectedRoute";

function Router() {
  return <Switch>
    <Route path="/" component={Home} /><Route path="/services">{() => <DetailPage page="services" />}</Route><Route path="/how-it-works">{() => <DetailPage page="how" />}</Route><Route path="/examples">{() => <DetailPage page="examples" />}</Route><Route path="/pricing">{() => <DetailPage page="pricing" />}</Route><Route path="/about">{() => <DetailPage page="about" />}</Route><Route path="/faq">{() => <DetailPage page="faq" />}</Route><Route path="/contact" component={Contact} /><Route path="/start-project" component={StartProject} />
    <Route path="/dashboard">{() => <ProtectedRoute><Dashboard /></ProtectedRoute>}</Route><Route path="/workspace/project">{() => <ProtectedRoute><WorkspacePage page="project" initialTab="scope" /></ProtectedRoute>}</Route><Route path="/workspace/review">{() => <ProtectedRoute><WorkspacePage page="review" initialTab="preview" /></ProtectedRoute>}</Route><Route path="/workspace/delivery">{() => <ProtectedRoute><WorkspacePage page="delivery" initialTab="payment" /></ProtectedRoute>}</Route><Route path="/workspace/business">{() => <ProtectedRoute><WorkspacePage page="business" initialTab="customers" /></ProtectedRoute>}</Route><Route path="/workspace/care">{() => <ProtectedRoute><WorkspacePage page="care" initialTab="request" /></ProtectedRoute>}</Route><Route path="/workspace/support">{() => <ProtectedRoute><WorkspacePage page="support" /></ProtectedRoute>}</Route><Route path="/workspace/settings">{() => <ProtectedRoute><WorkspacePage page="settings" /></ProtectedRoute>}</Route>
    <Route path="/workspace/onboarding">{() => <ProtectedRoute><WorkspacePage page="project" initialTab="brief" /></ProtectedRoute>}</Route><Route path="/workspace/files">{() => <ProtectedRoute><WorkspacePage page="project" initialTab="files" /></ProtectedRoute>}</Route><Route path="/workspace/preview">{() => <ProtectedRoute><WorkspacePage page="review" initialTab="preview" /></ProtectedRoute>}</Route><Route path="/workspace/revisions">{() => <ProtectedRoute><WorkspacePage page="review" initialTab="changes" /></ProtectedRoute>}</Route><Route path="/workspace/payments">{() => <ProtectedRoute><WorkspacePage page="delivery" initialTab="payment" /></ProtectedRoute>}</Route><Route path="/workspace/downloads">{() => <ProtectedRoute><WorkspacePage page="delivery" initialTab="release" /></ProtectedRoute>}</Route><Route path="/workspace/customers">{() => <ProtectedRoute><WorkspacePage page="business" initialTab="customers" /></ProtectedRoute>}</Route><Route path="/workspace/products">{() => <ProtectedRoute><WorkspacePage page="business" initialTab="products" /></ProtectedRoute>}</Route><Route path="/workspace/bookings">{() => <ProtectedRoute><WorkspacePage page="business" initialTab="bookings" /></ProtectedRoute>}</Route><Route path="/workspace/domain">{() => <ProtectedRoute><WorkspacePage page="care" initialTab="domain" /></ProtectedRoute>}</Route><Route path="/workspace/technical-care">{() => <ProtectedRoute><WorkspacePage page="care" initialTab="care" /></ProtectedRoute>}</Route><Route path="/workspace/management">{() => <ProtectedRoute><WorkspacePage page="care" initialTab="request" /></ProtectedRoute>}</Route><Route path="/workspace/system-health">{() => <ProtectedRoute><WorkspacePage page="care" initialTab="health" /></ProtectedRoute>}</Route>
    <Route path="/login">{() => <AuthPage mode="login" />}</Route><Route path="/register">{() => <AuthPage mode="register" />}</Route><Route path="/verify-email" component={VerifyEmail} /><Route path="/forgot-password">{() => <AuthPage mode="forgot" />}</Route><Route path="/reset-password">{() => <AuthPage mode="reset" />}</Route><Route component={Home} />
  </Switch>;
}

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}><Router /></QueryClientProvider>;
}
