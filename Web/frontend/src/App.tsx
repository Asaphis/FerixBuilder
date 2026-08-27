import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import DetailPage from "./pages/DetailPage";
import Dashboard from "./pages/Dashboard";
import WorkspacePage from "./pages/WorkspacePage";
import AuthPage from "./pages/AuthPage";
import StartProject from "./pages/StartProject";

function Router() {
  return <Switch>
    <Route path="/" component={Home} /><Route path="/services">{() => <DetailPage page="services" />}</Route><Route path="/how-it-works">{() => <DetailPage page="how" />}</Route><Route path="/examples">{() => <DetailPage page="examples" />}</Route><Route path="/pricing">{() => <DetailPage page="pricing" />}</Route><Route path="/about">{() => <DetailPage page="about" />}</Route><Route path="/faq">{() => <DetailPage page="faq" />}</Route><Route path="/contact" component={Contact} /><Route path="/start-project" component={StartProject} />
    <Route path="/dashboard" component={Dashboard} /><Route path="/workspace/project">{() => <WorkspacePage page="project" initialTab="scope" />}</Route><Route path="/workspace/review">{() => <WorkspacePage page="review" initialTab="preview" />}</Route><Route path="/workspace/delivery">{() => <WorkspacePage page="delivery" initialTab="payment" />}</Route><Route path="/workspace/business">{() => <WorkspacePage page="business" initialTab="customers" />}</Route><Route path="/workspace/care">{() => <WorkspacePage page="care" initialTab="request" />}</Route><Route path="/workspace/support">{() => <WorkspacePage page="support" />}</Route><Route path="/workspace/settings">{() => <WorkspacePage page="settings" />}</Route>
    <Route path="/workspace/onboarding">{() => <WorkspacePage page="project" initialTab="brief" />}</Route><Route path="/workspace/files">{() => <WorkspacePage page="project" initialTab="files" />}</Route><Route path="/workspace/preview">{() => <WorkspacePage page="review" initialTab="preview" />}</Route><Route path="/workspace/revisions">{() => <WorkspacePage page="review" initialTab="changes" />}</Route><Route path="/workspace/payments">{() => <WorkspacePage page="delivery" initialTab="payment" />}</Route><Route path="/workspace/downloads">{() => <WorkspacePage page="delivery" initialTab="release" />}</Route><Route path="/workspace/customers">{() => <WorkspacePage page="business" initialTab="customers" />}</Route><Route path="/workspace/products">{() => <WorkspacePage page="business" initialTab="products" />}</Route><Route path="/workspace/bookings">{() => <WorkspacePage page="business" initialTab="bookings" />}</Route><Route path="/workspace/domain">{() => <WorkspacePage page="care" initialTab="domain" />}</Route><Route path="/workspace/technical-care">{() => <WorkspacePage page="care" initialTab="care" />}</Route><Route path="/workspace/management">{() => <WorkspacePage page="care" initialTab="request" />}</Route><Route path="/workspace/system-health">{() => <WorkspacePage page="care" initialTab="health" />}</Route>
    <Route path="/login">{() => <AuthPage mode="login" />}</Route><Route path="/register">{() => <AuthPage mode="register" />}</Route><Route path="/verify-email">{() => <AuthPage mode="verify" />}</Route><Route path="/forgot-password">{() => <AuthPage mode="forgot" />}</Route><Route path="/reset-password">{() => <AuthPage mode="reset" />}</Route><Route component={Home} />
  </Switch>;
}
export default function App() { return <Router />; }
