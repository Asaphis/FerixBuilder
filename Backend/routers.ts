import { systemRouter } from "./_core/systemRouter";
import { router } from "./_core/trpc";
import { adminRouter } from "./routers/admin";
import { contactRouter } from "./routers/contact";
import { authRouter } from "./routers/auth";
import { projectRequestsRouter } from "./routers/projectRequests";
import { projectsRouter } from "./routers/projects";
import { scopesRouter } from "./routers/scopes";
import { billingRouter } from "./routers/billing";

export const appRouter = router({
  system: systemRouter,
  admin: adminRouter,
  contact: contactRouter,
  auth: authRouter,
  projectRequests: projectRequestsRouter,
  projects: projectsRouter,
  scopes: scopesRouter,
  billing: billingRouter,
});

export type AppRouter = typeof appRouter;
