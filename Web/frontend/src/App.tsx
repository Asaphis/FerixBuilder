import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import superjson from "superjson";
import { Route, Switch } from "wouter";
import AuthPage from "@/pages/AuthPage";
import Contact from "@/pages/Contact";
import Dashboard from "@/pages/Dashboard";
import DetailPage from "@/pages/DetailPage";
import Home from "@/pages/Home";
import WorkspacePage from "@/pages/WorkspacePage";
import { trpc } from "@/lib/trpc";

function Router() { return <Switch><Route path="/" component={Home} /><Route path="/services">{() => <DetailPage page="services" />}</Route><Route path="/how-it-works">{() => <DetailPage page="how" />}</Route><Route path="/examples">{() => <DetailPage page="examples" />}</Route><Route path="/pricing">{() => <DetailPage page="pricing" />}</Route><Route path="/about">{() => <DetailPage page="about" />}</Route><Route path="/faq">{() => <DetailPage page="faq" />}</Route><Route path="/contact" component={Contact} /><Route path="/dashboard" component={Dashboard} /><Route path="/workspace/onboarding">{() => <WorkspacePage page="onboarding" />}</Route><Route path="/workspace/project">{() => <WorkspacePage page="project" />}</Route><Route path="/workspace/files">{() => <WorkspacePage page="files" />}</Route><Route path="/workspace/preview">{() => <WorkspacePage page="preview" />}</Route><Route path="/workspace/revisions">{() => <WorkspacePage page="revisions" />}</Route><Route path="/workspace/payments">{() => <WorkspacePage page="payments" />}</Route><Route path="/workspace/downloads">{() => <WorkspacePage page="downloads" />}</Route><Route path="/workspace/customers">{() => <WorkspacePage page="customers" />}</Route><Route path="/workspace/products">{() => <WorkspacePage page="products" />}</Route><Route path="/workspace/bookings">{() => <WorkspacePage page="bookings" />}</Route><Route path="/workspace/domain">{() => <WorkspacePage page="domain" />}</Route><Route path="/workspace/technical-care">{() => <WorkspacePage page="technical-care" />}</Route><Route path="/workspace/management">{() => <WorkspacePage page="management" />}</Route><Route path="/workspace/system-health">{() => <WorkspacePage page="system-health" />}</Route><Route path="/workspace/support">{() => <WorkspacePage page="support" />}</Route><Route path="/workspace/settings">{() => <WorkspacePage page="settings" />}</Route><Route path="/login">{() => <AuthPage mode="login" />}</Route><Route path="/register">{() => <AuthPage mode="register" />}</Route><Route component={Home} /></Switch>; }
export default function App() { const [queryClient] = useState(() => new QueryClient()); const [client] = useState(() => trpc.createClient({ links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })] })); return <trpc.Provider client={client} queryClient={queryClient}><QueryClientProvider client={queryClient}><Router /></QueryClientProvider></trpc.Provider>; }
