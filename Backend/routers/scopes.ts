import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import { prisma } from "../_core/prisma";

export const scopesRouter = router({
  // Create a scope for a project (admin only)
  create: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        originalPrice: z.number(),
        currency: z.string().optional(),
        paymentTerms: z.string().optional(),
        estimatedWeeks: z.number(),
        startDate: z.string(),
        estimatedCompletion: z.string(),
        revisionAllowance: z.number().optional(),
        revisionDefinition: z.string(),
        additionalRevisionCost: z.number(),
        terms: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "ADMIN") {
        throw new Error("Only admins can create scopes");
      }

      // Verify project exists
      const project = await prisma.project.findUnique({
        where: { id: input.projectId },
      });

      if (!project) {
        throw new Error("Project not found");
      }

      // Check if scope already exists
      const existingScope = await prisma.scope.findUnique({
        where: { projectId: project.projectId },
      });

      if (existingScope) {
        throw new Error("Scope already exists for this project");
      }

      const scope = await prisma.scope.create({
        data: {
          projectId: project.projectId,
          originalPrice: input.originalPrice,
          currency: input.currency || "NGN",
          paymentTerms: input.paymentTerms || "FINAL_PAYMENT",
          estimatedWeeks: input.estimatedWeeks,
          startDate: new Date(input.startDate),
          estimatedCompletion: new Date(input.estimatedCompletion),
          revisionAllowance: input.revisionAllowance || 3,
          revisionDefinition: input.revisionDefinition,
          additionalRevisionCost: input.additionalRevisionCost,
          terms: input.terms,
          status: "DRAFT",
        },
      });

      // Update project with scope info
      await prisma.project.update({
        where: { id: input.projectId },
        data: {
          originalPrice: input.originalPrice,
          currentTotal: input.originalPrice,
          estimatedWeeks: input.estimatedWeeks,
          startDate: new Date(input.startDate),
          estimatedCompletion: new Date(input.estimatedCompletion),
          revisionAllowance: input.revisionAllowance || 3,
        },
      });

      return scope;
    }),

  // Get scope by project ID
  getByProjectId: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input, ctx }) => {
      const customer = await prisma.customer.findUnique({
        where: { userId: ctx.user.id },
      });

      const project = await prisma.project.findUnique({
        where: { id: input.projectId },
      });

      if (!project) {
        throw new Error("Project not found");
      }

      // Check access
      if (ctx.user.role !== "ADMIN" && project.customerId !== customer?.id) {
        throw new Error("Access denied");
      }

      const scope = await prisma.scope.findUnique({
        where: { projectId: project.projectId },
        include: {
          features: true,
          exclusions: true,
        },
      });

      return scope;
    }),

  // Update scope (admin only)
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        originalPrice: z.number().optional(),
        currency: z.string().optional(),
        paymentTerms: z.string().optional(),
        estimatedWeeks: z.number().optional(),
        startDate: z.string().optional(),
        estimatedCompletion: z.string().optional(),
        revisionAllowance: z.number().optional(),
        revisionDefinition: z.string().optional(),
        additionalRevisionCost: z.number().optional(),
        terms: z.string().optional(),
        status: z.enum(["DRAFT", "SENT", "APPROVED", "LOCKED"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "ADMIN") {
        throw new Error("Only admins can update scopes");
      }

      const { id, ...updateData } = input;

      const data: any = { ...updateData };
      if (data.startDate) data.startDate = new Date(data.startDate);
      if (data.estimatedCompletion) data.estimatedCompletion = new Date(data.estimatedCompletion);

      const scope = await prisma.scope.update({
        where: { id },
        data,
      });

      // If scope is approved, lock it
      if (input.status === "APPROVED") {
        await prisma.scope.update({
          where: { id },
          data: { lockedAt: new Date() },
        });

        // Update project status
        await prisma.project.update({
          where: { projectId: scope.projectId },
          data: { status: "IN_DEVELOPMENT", scopeLockedAt: new Date() },
        });
      }

      return scope;
    }),

  // Add feature to scope (admin only)
  addFeature: protectedProcedure
    .input(
      z.object({
        scopeId: z.string(),
        category: z.string(),
        name: z.string(),
        description: z.string().optional(),
        included: z.boolean().default(true),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "ADMIN") {
        throw new Error("Only admins can add features");
      }

      return prisma.scopeFeature.create({
        data: {
          scopeId: input.scopeId,
          category: input.category,
          name: input.name,
          description: input.description,
          included: input.included,
        },
      });
    }),

  // Add exclusion to scope (admin only)
  addExclusion: protectedProcedure
    .input(
      z.object({
        scopeId: z.string(),
        category: z.string(),
        name: z.string(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "ADMIN") {
        throw new Error("Only admins can add exclusions");
      }

      return prisma.scopeExclusion.create({
        data: {
          scopeId: input.scopeId,
          category: input.category,
          name: input.name,
          description: input.description,
        },
      });
    }),

  // Approve scope (customer only)
  approve: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const customer = await prisma.customer.findUnique({
        where: { userId: ctx.user.id },
      });

      if (!customer) {
        throw new Error("Customer profile not found");
      }

      const scope = await prisma.scope.findUnique({
        where: { id: input.id },
        include: { project: true },
      });

      if (!scope) {
        throw new Error("Scope not found");
      }

      if (scope.project.customerId !== customer.id) {
        throw new Error("Access denied");
      }

      if (scope.status !== "SENT") {
        throw new Error("Scope must be in SENT status to approve");
      }

      return prisma.scope.update({
        where: { id: input.id },
        data: {
          status: "APPROVED",
          customerApprovedAt: new Date(),
          lockedAt: new Date(),
        },
      });
    }),

  // Send scope to customer (admin only)
  sendToCustomer: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "ADMIN") {
        throw new Error("Only admins can send scopes");
      }

      const scope = await prisma.scope.update({
        where: { id: input.id },
        data: {
          status: "SENT",
          sentToCustomerAt: new Date(),
        },
      });

      // Update project status
      await prisma.project.updateMany({
        where: { projectId: scope.projectId },
        data: { status: "SCOPE_PENDING" },
      });

      return scope;
    }),
});
