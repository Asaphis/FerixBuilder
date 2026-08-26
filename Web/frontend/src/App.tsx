import { Route, Switch } from "wouter";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import InfoPage from "@/pages/InfoPage";

export default function App() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/services">{() => <InfoPage page="services" />}</Route>
    <Route path="/pricing">{() => <InfoPage page="pricing" />}</Route>
    <Route path="/examples">{() => <InfoPage page="examples" />}</Route>
    <Route path="/how-it-works">{() => <InfoPage page="how" />}</Route>
    <Route path="/about">{() => <InfoPage page="about" />}</Route>
    <Route path="/faq">{() => <InfoPage page="faq" />}</Route>
    <Route path="/privacy">{() => <InfoPage page="privacy" />}</Route>
    <Route path="/terms">{() => <InfoPage page="terms" />}</Route>
    <Route path="/refund-policy">{() => <InfoPage page="refund" />}</Route>
    <Route path="/contact" component={Contact} />
    <Route>{() => <InfoPage page="faq" />}</Route>
  </Switch>;
}
