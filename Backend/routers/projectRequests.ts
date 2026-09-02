import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import { prisma } from "../_core/prisma";

export const projectRequestsRouter = router({
  // Create a new project request
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        projectType: z.enum(["WEBSITE", "APPLICATION", "E_COMMERCE", "CUSTOM"]),
        industry: z.string().optional(),
        targetAudience: z.string().optional(),
        goals: z.string().optional(),
        successCriteria: z.string().optional(),
        features: z.any(),
        pages: z.any(),
        brandColors: z.any().optional(),
        typography: z.string().optional(),
        stylePreference: z.string().optional(),
        platform: z.string().optional(),
        technology: z.string().optional(),
        integrations: z.any().optional(),
        domainStatus: z.string().optional(),
        hostingPreference: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Get customer from user
      const customer = await prisma.customer.findUnique({
        where: { userId: ctx.user.id },
      });

      if (!customer) {
        throw new Error("Customer profile not found");
      }

      // Generate project ID
      const projectId = `PRJ-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const request = await prisma.projectRequest.create({
        data: {
          projectId,
          customerId: customer.id,
          name: input.name,
          description: input.description,
          projectType: input.projectType,
          industry: input.industry,
          targetAudience: input.targetAudience,
          goals: input.goals,
          successCriteria: input.successCriteria,
          features: input.features,
          pages: input.pages,
          brandColors: input.brandColors,
          typography: input.typography,
          stylePreference: input.stylePreference,
          platform: input.platform,
          technology: input.technology,
          integrations: input.integrations,
          domainStatus: input.domainStatus,
          hostingPreference: input.hostingPreference,
          status: "SUBMITTED",
        },
      });

      return request;
    }),

  // Get all project requests for the current customer
  getMyRequests: protectedProcedure.query(async ({ ctx }) => {
    const customer = await prisma.customer.findUnique({
      where: { userId: ctx.user.id },
    });

    if (!customer) {
      throw new Error("Customer profile not found");
    }

    return prisma.projectRequest.findMany({
      where: { customerId: customer.id },
      orderBy: { submittedAt: "desc" },
    });
  }),

  // Get a single project request by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const customer = await prisma.customer.findUnique({
        where: { userId: ctx.user.id },
      });

      if (!customer) {
        throw new Error("Customer profile not found");
      }

      const request = await prisma.projectRequest.findFirst({
        where: {
          id: input.id,
          customerId: customer.id,
        },
      });

      if (!request) {
        throw new Error("Project request not found");
      }

      return request;
    }),

  // Update project request (only if in DRAFT status)
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        projectType: z.enum(["WEBSITE", "APPLICATION", "E_COMMERCE", "CUSTOM"]).optional(),
        industry: z.string().optional(),
        targetAudience: z.string().optional(),
        goals: z.string().optional(),
        successCriteria: z.string().optional(),
        features: z.any().optional(),
        pages: z.any().optional(),
        brandColors: z.any().optional(),
        typography: z.string().optional(),
        stylePreference: z.string().optional(),
        platform: z.string().optional(),
        technology: z.string().optional(),
        integrations: z.any().optional(),
        domainStatus: z.string().optional(),
        hostingPreference: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const customer = await prisma.customer.findUnique({
        where: { userId: ctx.user.id },
      });

      if (!customer) {
        throw new Error("Customer profile not found");
      }

      const request = await prisma.projectRequest.findFirst({
        where: {
          id: input.id,
          customerId: customer.id,
        },
      });

      if (!request) {
        throw new Error("Project request not found");
      }

      if (request.status !== "DRAFT") {
        throw new Error("Can only update requests in DRAFT status");
      }

      const { id, ...updateData } = input;

      return prisma.projectRequest.update({
        where: { id },
        data: updateData,
      });
    }),

  // Submit project request (change status from DRAFT to SUBMITTED)
  submit: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const customer = await prisma.customer.findUnique({
        where: { userId: ctx.user.id },
      });

      if (!customer) {
        throw new Error("Customer profile not found");
      }

      const request = await prisma.projectRequest.findFirst({
        where: {
          id: input.id,
          customerId: customer.id,
        },
      });

      if (!request) {
        throw new Error("Project request not found");
      }

      if (request.status !== "DRAFT") {
        throw new Error("Request is not in DRAFT status");
      }

      return prisma.projectRequest.update({
        where: { id: input.id },
        data: { status: "SUBMITTED" },
      });
    }),
});
