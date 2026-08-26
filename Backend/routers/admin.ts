import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../_core/trpc";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Administrator access is required." });
  }

  return next({ ctx });
});

/** Protected base for future internal operations procedures. */
export const adminRouter = router({
  workspaceStatus: adminProcedure.query(() => ({
    area: "Web/admin" as const,
    status: "prepared" as const,
  })),
});
