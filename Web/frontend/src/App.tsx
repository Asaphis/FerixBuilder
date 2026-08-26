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
import { trpc } from "@/lib/trpc";

function Router() { return <Switch><Route path="/" component={Home} /><Route path="/services">{() => <DetailPage page="services" />}</Route><Route path="/how-it-works">{() => <DetailPage page="how" />}</Route><Route path="/examples">{() => <DetailPage page="examples" />}</Route><Route path="/pricing">{() => <DetailPage page="pricing" />}</Route><Route path="/about">{() => <DetailPage page="about" />}</Route><Route path="/faq">{() => <DetailPage page="faq" />}</Route><Route path="/contact" component={Contact} /><Route path="/dashboard" component={Dashboard} /><Route path="/login">{() => <AuthPage mode="login" />}</Route><Route path="/register">{() => <AuthPage mode="register" />}</Route><Route component={Home} /></Switch>; }
export default function App() { const [queryClient] = useState(() => new QueryClient()); const [client] = useState(() => trpc.createClient({ links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })] })); return <trpc.Provider client={client} queryClient={queryClient}><QueryClientProvider client={queryClient}><Router /></QueryClientProvider></trpc.Provider>; }
