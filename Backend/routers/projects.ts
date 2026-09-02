import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import { prisma } from "../_core/prisma";

export const projectsRouter = router({
  // Create a project from a project request (admin only)
  createFromRequest: protectedProcedure
    .input(
      z.object({
        requestId: z.string(),
        name: z.string(),
        description: z.string().optional(),
        projectType: z.enum(["WEBSITE", "APPLICATION", "E_COMMERCE", "CUSTOM"]),
        industry: z.string().optional(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
        originalPrice: z.number(),
        estimatedWeeks: z.number().optional(),
        startDate: z.string().optional(),
        estimatedCompletion: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Verify admin role
      if (ctx.user.role !== "ADMIN") {
        throw new Error("Only admins can create projects");
      }

      // Get the project request
      const request = await prisma.projectRequest.findUnique({
        where: { id: input.requestId },
      });

      if (!request) {
        throw new Error("Project request not found");
      }

      // Generate project ID
      const projectId = `PRJ-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const project = await prisma.project.create({
        data: {
          projectId,
          customerId: request.customerId,
          requestId: request.projectId,
          name: input.name,
          description: input.description,
          projectType: input.projectType,
          industry: input.industry,
          priority: input.priority || "MEDIUM",
          originalPrice: input.originalPrice,
          currentTotal: input.originalPrice,
          estimatedWeeks: input.estimatedWeeks,
          startDate: input.startDate ? new Date(input.startDate) : null,
          estimatedCompletion: input.estimatedCompletion ? new Date(input.estimatedCompletion) : null,
          status: "SCOPE_PENDING",
        },
      });

      // Update request status
      await prisma.projectRequest.update({
        where: { id: input.requestId },
        data: { status: "APPROVED" },
      });

      return project;
    }),

  // Get all projects for the current customer
  getMyProjects: protectedProcedure.query(async ({ ctx }) => {
    const customer = await prisma.customer.findUnique({
      where: { userId: ctx.user.id },
    });

    if (!customer) {
      throw new Error("Customer profile not found");
    }

    return prisma.project.findMany({
      where: { customerId: customer.id },
      orderBy: { createdAt: "desc" },
      include: {
        scope: true,
        milestones: true,
        previews: true,
      },
    });
  }),

  // Get all projects (admin only)
  getAll: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "ADMIN") {
      throw new Error("Only admins can view all projects");
    }

    return prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,
        scope: true,
        milestones: true,
      },
    });
  }),

  // Get a single project by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const customer = await prisma.customer.findUnique({
        where: { userId: ctx.user.id },
      });

      if (!customer && ctx.user.role !== "ADMIN") {
        throw new Error("Access denied");
      }

      const project = await prisma.project.findUnique({
        where: { id: input.id },
        include: {
          customer: true,
          scope: true,
          features: true,
          milestones: true,
          previews: true,
          changeRequests: true,
          invoices: true,
          payments: true,
        },
      });

      if (!project) {
        throw new Error("Project not found");
      }

      // Check access
      if (ctx.user.role !== "ADMIN" && project.customerId !== customer?.id) {
        throw new Error("Access denied");
      }

      return project;
    }),

  // Update project
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        projectType: z.enum(["WEBSITE", "APPLICATION", "E_COMMERCE", "CUSTOM"]).optional(),
        industry: z.string().optional(),
        status: z.enum(["DRAFT", "SUBMITTED", "IN_REVIEW", "SCOPE_PENDING", "IN_DEVELOPMENT", "INTERNAL_QA", "PREVIEW", "CUSTOMER_REVIEW", "REVISION", "FINAL_REVIEW", "COMPLETED", "CANCELLED"]).optional(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
        additionalCost: z.number().optional(),
        estimatedWeeks: z.number().optional(),
        startDate: z.string().optional(),
        estimatedCompletion: z.string().optional(),
        actualCompletion: z.string().optional(),
        deliveredAt: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const customer = await prisma.customer.findUnique({
        where: { userId: ctx.user.id },
      });

      const project = await prisma.project.findUnique({
        where: { id: input.id },
      });

      if (!project) {
        throw new Error("Project not found");
      }

      // Check access
      if (ctx.user.role !== "ADMIN" && project.customerId !== customer?.id) {
        throw new Error("Access denied");
      }

      const { id, ...updateData } = input;

      // Convert date strings to Date objects
      const data: any = { ...updateData };
      if (data.startDate) data.startDate = new Date(data.startDate);
      if (data.estimatedCompletion) data.estimatedCompletion = new Date(data.estimatedCompletion);
      if (data.actualCompletion) data.actualCompletion = new Date(data.actualCompletion);
      if (data.deliveredAt) data.deliveredAt = new Date(data.deliveredAt);

      // Recalculate totals if additional cost changed
      if (data.additionalCost !== undefined) {
        data.currentTotal = project.originalPrice + data.additionalCost;
        data.outstandingBalance = data.currentTotal - project.amountPaid;
      }

      return prisma.project.update({
        where: { id },
        data,
      });
    }),

  // Delete project (admin only)
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "ADMIN") {
        throw new Error("Only admins can delete projects");
      }

      return prisma.project.delete({
        where: { id: input.id },
      });
    }),
});
