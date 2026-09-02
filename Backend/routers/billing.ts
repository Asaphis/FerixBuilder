import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { z } from "zod";
import { prisma } from "../_core/prisma";

export const billingRouter = router({
  // Create an invoice (admin only)
  createInvoice: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        customerId: z.string(),
        amount: z.number(),
        currency: z.string().optional(),
        dueDate: z.string(),
        paymentTerms: z.string().optional(),
        items: z.array(
          z.object({
            description: z.string(),
            quantity: z.number(),
            unitPrice: z.number(),
            total: z.number(),
          })
        ),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "ADMIN") {
        throw new Error("Only admins can create invoices");
      }

      const invoiceNumber = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const invoice = await prisma.invoice.create({
        data: {
          invoiceNumber,
          projectId: input.projectId,
          customerId: input.customerId,
          amount: input.amount,
          currency: input.currency || "NGN",
          dueDate: new Date(input.dueDate),
          paymentTerms: input.paymentTerms || "NET_30",
          items: input.items,
          notes: input.notes,
          status: "PENDING",
        },
      });

      return invoice;
    }),

  // Get all invoices for the current customer
  getMyInvoices: protectedProcedure.query(async ({ ctx }) => {
    const customer = await prisma.customer.findUnique({
      where: { userId: ctx.user.id },
    });

    if (!customer) {
      throw new Error("Customer profile not found");
    }

    return prisma.invoice.findMany({
      where: { customerId: customer.id },
      orderBy: { createdAt: "desc" },
      include: {
        payments: true,
      },
    });
  }),

  // Get all invoices (admin only)
  getAllInvoices: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "ADMIN") {
      throw new Error("Only admins can view all invoices");
    }

    return prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,
        project: true,
        payments: true,
      },
    });
  }),

  // Get a single invoice by ID
  getInvoiceById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const customer = await prisma.customer.findUnique({
        where: { userId: ctx.user.id },
      });

      const invoice = await prisma.invoice.findUnique({
        where: { id: input.id },
        include: {
          customer: true,
          project: true,
          payments: true,
        },
      });

      if (!invoice) {
        throw new Error("Invoice not found");
      }

      // Check access
      if (ctx.user.role !== "ADMIN" && invoice.customerId !== customer?.id) {
        throw new Error("Access denied");
      }

      return invoice;
    }),

  // Update invoice (admin only)
  updateInvoice: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        amount: z.number().optional(),
        currency: z.string().optional(),
        dueDate: z.string().optional(),
        paymentTerms: z.string().optional(),
        items: z.any().optional(),
        notes: z.string().optional(),
        status: z.enum(["DRAFT", "PENDING", "PAID", "OVERDUE", "CANCELLED"]).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "ADMIN") {
        throw new Error("Only admins can update invoices");
      }

      const { id, ...updateData } = input;

      const data: any = { ...updateData };
      if (data.dueDate) data.dueDate = new Date(data.dueDate);

      return prisma.invoice.update({
        where: { id },
        data,
      });
    }),

  // Create a payment
  createPayment: protectedProcedure
    .input(
      z.object({
        invoiceId: z.string(),
        amount: z.number(),
        paymentMethod: z.enum(["BANK_TRANSFER", "CARD", "PAYPAL", "CRYPTO"]),
        transactionId: z.string(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const customer = await prisma.customer.findUnique({
        where: { userId: ctx.user.id },
      });

      if (!customer) {
        throw new Error("Customer profile not found");
      }

      const invoice = await prisma.invoice.findUnique({
        where: { id: input.invoiceId },
      });

      if (!invoice) {
        throw new Error("Invoice not found");
      }

      if (invoice.customerId !== customer.id) {
        throw new Error("Access denied");
      }

      const payment = await prisma.payment.create({
        data: {
          invoiceId: input.invoiceId,
          customerId: customer.id,
          amount: input.amount,
          currency: invoice.currency,
          paymentMethod: input.paymentMethod,
          transactionId: input.transactionId,
          notes: input.notes,
          status: "PENDING",
        },
      });

      return payment;
    }),

  // Get all payments for the current customer
  getMyPayments: protectedProcedure.query(async ({ ctx }) => {
    const customer = await prisma.customer.findUnique({
      where: { userId: ctx.user.id },
    });

    if (!customer) {
      throw new Error("Customer profile not found");
    }

    return prisma.payment.findMany({
      where: { customerId: customer.id },
      orderBy: { createdAt: "desc" },
      include: {
        invoice: true,
      },
    });
  }),

  // Get all payments (admin only)
  getAllPayments: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "ADMIN") {
      throw new Error("Only admins can view all payments");
    }

    return prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,
        invoice: true,
      },
    });
  }),

  // Update payment status (admin only)
  updatePaymentStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "FAILED", "REFUNDED"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user.role !== "ADMIN") {
        throw new Error("Only admins can update payment status");
      }

      const payment = await prisma.payment.update({
        where: { id: input.id },
        data: { status: input.status },
      });

      // If payment is completed, update invoice
      if (input.status === "COMPLETED") {
        const invoice = await prisma.invoice.findUnique({
          where: { id: payment.invoiceId },
        });

        if (invoice) {
          // Calculate total paid for this invoice
          const payments = await prisma.payment.findMany({
            where: { invoiceId: payment.invoiceId, status: "COMPLETED" },
          });

          const totalPaid = payments.reduce((sum: number, p: { amount: number }) => sum + p.amount, 0);

          // Update invoice status if fully paid
          if (totalPaid >= invoice.amount) {
            await prisma.invoice.update({
              where: { id: payment.invoiceId },
              data: { status: "PAID" },
            });

            // Update project amount paid
            await prisma.project.updateMany({
              where: { id: invoice.projectId },
              data: { amountPaid: { increment: payment.amount } },
            });
          }
        }
      }

      return payment;
    }),
});
