# API Architecture - Scope-Based Billing Model

## Overview
The API architecture is built using tRPC for type-safe client-server communication, Express for the HTTP server, and Prisma for database operations. The architecture follows a modular router structure with proper authentication, authorization, and validation.

---

## Technology Stack

- **API Framework**: tRPC (Type-safe RPC)
- **HTTP Server**: Express.js
- **ORM**: Prisma
- **Database**: Neon (PostgreSQL)
- **Authentication**: JWT + bcryptjs
- **Validation**: Zod schemas
- **File Storage**: Cloudinary
- **Email**: Resend
- **Push Notifications**: Firebase Cloud Messaging

---

## Project Structure

```
Backend/
├── _core/
│   ├── index.ts              # Server entry point
│   ├── trpc.ts               # tRPC configuration
│   ├── auth.ts               # Authentication logic
│   ├── prisma.ts             # Prisma client
│   ├── storage.ts            # Cloudinary integration
│   ├── fileProtection.ts     # Source code protection
│   ├── cookies.ts            # Cookie management
│   └── systemRouter.ts       # System health endpoints
├── routers/
│   ├── index.ts              # Main router composition
│   ├── auth.ts               # Authentication endpoints
│   ├── admin.ts              # Admin-only endpoints
│   ├── projects.ts           # Project management
│   ├── requests.ts           # Project requests
│   ├── scope.ts              # Scope management
│   ├── features.ts           # Feature management
│   ├── changeRequests.ts     # Change requests
│   ├── previews.ts           # Preview management
│   ├── billing.ts            # Billing & invoices
│   ├── payments.ts           # Payment processing
│   ├── files.ts              # File management
│   ├── messages.ts           # Communication
│   ├── notifications.ts       # Notifications
│   └── deployments.ts        # Deployment management
└── middleware/
    ├── auth.ts               # Authentication middleware
    ├── admin.ts              # Admin role middleware
    ├── customer.ts           # Customer role middleware
    ├── validation.ts         # Request validation
    └── errorHandler.ts       # Error handling
```

---

## tRPC Configuration

### Core Setup

```typescript
// _core/trpc.ts
import { initTRPC } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(isAuthed).use(isAdmin);
```

### Context Creation

```typescript
// _core/context.ts
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { getUserFromToken } from "./auth";

export async function createContext({ req, res }: CreateExpressContextOptions) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const user = token ? await getUserFromToken(token) : null;
  
  return {
    req,
    res,
    user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
```

---

## Authentication API

### Router: `/api/auth`

#### `register`
Register a new customer account.

```typescript
authRouter.register({
  input: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional(),
  }),
  mutation: async ({ input }) => {
    const result = await registerUser(input);
    return {
      success: true,
      user: result.user,
      tokens: result.tokens,
    };
  },
});
```

#### `login`
Authenticate user and return tokens.

```typescript
authRouter.login({
  input: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  mutation: async ({ input }) => {
    const result = await loginUser(input.email, input.password);
    return {
      success: true,
      user: result.user,
      tokens: result.tokens,
    };
  },
});
```

#### `refresh`
Refresh access token using refresh token.

```typescript
authRouter.refresh({
  input: z.object({
    refreshToken: z.string(),
  }),
  mutation: ({ input }) => {
    const accessToken = refreshAccessToken(input.refreshToken);
    return { success: true, accessToken };
  },
});
```

#### `me`
Get current user information.

```typescript
authRouter.me({
  query: async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return ctx.user;
  },
});
```

#### `logout`
Logout user (invalidate token).

```typescript
authRouter.logout({
  mutation: async ({ ctx }) => {
    // Clear token from client
    return { success: true };
  },
});
```

---

## Projects API

### Router: `/api/projects`

#### `list`
List all projects (filtered by user role).

```typescript
projectsRouter.list({
  input: z.object({
    status: z.enum(ProjectStatus).optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
  }),
  query: async ({ input, ctx }) => {
    const where = ctx.user?.role === "ADMIN" 
      ? {} 
      : { customerId: ctx.user.id };
    
    if (input.status) {
      where.status = input.status;
    }
    
    const projects = await prisma.project.findMany({
      where,
      include: { customer: true },
      orderBy: { createdAt: "desc" },
      skip: input.page ? (input.page - 1) * (input.limit || 10) : 0,
      take: input.limit || 10,
    });
    
    return projects;
  },
});
```

#### `getById`
Get project by ID.

```typescript
projectsRouter.getById({
  input: z.object({ id: z.string() }),
  query: async ({ input, ctx }) => {
    const project = await prisma.project.findUnique({
      where: { id: input.id },
      include: {
        customer: true,
        scope: { include: { features: true, exclusions: true } },
        features: true,
        milestones: true,
      },
    });
    
    if (!project) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    
    // Authorization check
    if (ctx.user?.role !== "ADMIN" && project.customerId !== ctx.user.id) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    return project;
  },
});
```

#### `create`
Create new project (from approved request).

```typescript
projectsRouter.create({
  input: z.object({
    requestId: z.string(),
    scopeId: z.string(),
  }),
  mutation: async ({ input, ctx }) => {
    if (ctx.user?.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    const request = await prisma.projectRequest.findUnique({
      where: { id: input.requestId },
    });
    
    const scope = await prisma.scope.findUnique({
      where: { id: input.scopeId },
    });
    
    // Generate project ID
    const projectId = `FX-${String(Date.now()).slice(-5)}`;
    
    const project = await prisma.project.create({
      data: {
        projectId,
        customerId: request.customerId,
        name: request.name,
        description: request.description,
        projectType: request.projectType,
        industry: request.industry,
        status: "SCOPE_PENDING",
        originalPrice: scope.originalPrice,
        currentTotal: scope.originalPrice,
        currency: scope.currency,
        estimatedWeeks: scope.estimatedWeeks,
        startDate: scope.startDate,
        estimatedCompletion: scope.estimatedCompletion,
        revisionAllowance: scope.revisionAllowance,
        requestId: request.id,
        scopeId: scope.id,
      },
    });
    
    // Log activity
    await prisma.activityLog.create({
      data: {
        projectId: project.id,
        userId: ctx.user.id,
        action: "PROJECT_CREATED",
        resource: "Project",
        resourceId: project.id,
        details: { requestId: request.id, scopeId: scope.id },
      },
    });
    
    return project;
  },
});
```

#### `updateStatus`
Update project status.

```typescript
projectsRouter.updateStatus({
  input: z.object({
    id: z.string(),
    status: z.enum(ProjectStatus),
  }),
  mutation: async ({ input, ctx }) => {
    if (ctx.user?.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    const project = await prisma.project.update({
      where: { id: input.id },
      data: { status: input.status },
    });
    
    // Log activity
    await prisma.activityLog.create({
      data: {
        projectId: project.id,
        userId: ctx.user.id,
        action: "STATUS_UPDATED",
        resource: "Project",
        resourceId: project.id,
        details: { oldStatus: project.status, newStatus: input.status },
      },
    });
    
    return project;
  },
});
```

---

## Project Requests API

### Router: `/api/requests`

#### `submit`
Submit new project request (customer).

```typescript
requestsRouter.submit({
  input: z.object({
    name: z.string(),
    description: z.string(),
    projectType: z.enum(ProjectType),
    industry: z.string().optional(),
    features: z.array(z.any()),
    pages: z.array(z.any()),
    // ... other fields
  }),
  mutation: async ({ input, ctx }) => {
    if (ctx.user?.role !== "CUSTOMER") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    const requestId = `REQ-${String(Date.now()).slice(-5)}`;
    
    const request = await prisma.projectRequest.create({
      data: {
        requestId,
        customerId: ctx.user.id,
        ...input,
        status: "SUBMITTED",
      },
    });
    
    // Send notification to admins
    await notifyAdmins("NEW_PROJECT_REQUEST", {
      requestId: request.id,
      customerName: ctx.user.name,
    });
    
    return request;
  },
});
```

#### `list`
List all project requests (admin).

```typescript
requestsRouter.list({
  input: z.object({
    status: z.enum(RequestStatus).optional(),
  }),
  query: async ({ input, ctx }) => {
    if (ctx.user?.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    const requests = await prisma.projectRequest.findMany({
      where: input.status ? { status: input.status } : {},
      include: { customer: true },
      orderBy: { submittedAt: "desc" },
    });
    
    return requests;
  },
});
```

#### `review`
Review and approve/reject request (admin).

```typescript
requestsRouter.review({
  input: z.object({
    id: z.string(),
    action: z.enum(["APPROVE", "REJECT", "REQUEST_CLARIFICATION"]),
    notes: z.string().optional(),
  }),
  mutation: async ({ input, ctx }) => {
    if (ctx.user?.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    const request = await prisma.projectRequest.update({
      where: { id: input.id },
      data: {
        status: input.action === "APPROVE" ? "APPROVED" : 
               input.action === "REJECT" ? "REJECTED" : 
               "CLARIFICATION_REQUESTED",
        adminNotes: input.notes,
        reviewedAt: new Date(),
        reviewedBy: ctx.user.id,
      },
    });
    
    // Notify customer
    await notifyCustomer(request.customerId, "REQUEST_REVIEWED", {
      status: request.status,
      notes: input.notes,
    });
    
    return request;
  },
});
```

---

## Scope API

### Router: `/api/scope`

#### `create`
Create scope for project (admin).

```typescript
scopeRouter.create({
  input: z.object({
    projectId: z.string(),
    originalPrice: z.number(),
    estimatedWeeks: z.number(),
    startDate: z.date(),
    estimatedCompletion: z.date(),
    revisionAllowance: z.number(),
    features: z.array(z.object({
      category: z.string(),
      name: z.string(),
      description: z.string().optional(),
    })),
    exclusions: z.array(z.object({
      name: z.string(),
      reason: z.string(),
    })),
    terms: z.string(),
  }),
  mutation: async ({ input, ctx }) => {
    if (ctx.user?.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    const scope = await prisma.scope.create({
      data: {
        projectId: input.projectId,
        originalPrice: input.originalPrice,
        estimatedWeeks: input.estimatedWeeks,
        startDate: input.startDate,
        estimatedCompletion: input.estimatedCompletion,
        revisionAllowance: input.revisionAllowance,
        terms: input.terms,
        features: {
          create: input.features.map((f, i) => ({
            ...f,
            sortOrder: i,
          })),
        },
        exclusions: {
          create: input.exclusions.map((e, i) => ({
            ...e,
            sortOrder: i,
          })),
        },
      },
    });
    
    // Update project
    await prisma.project.update({
      where: { id: input.projectId },
      data: {
        scopeId: scope.id,
        originalPrice: input.originalPrice,
        currentTotal: input.originalPrice,
        estimatedWeeks: input.estimatedWeeks,
        startDate: input.startDate,
        estimatedCompletion: input.estimatedCompletion,
        revisionAllowance: input.revisionAllowance,
      },
    });
    
    return scope;
  },
});
```

#### `sendToCustomer`
Send scope to customer for approval.

```typescript
scopeRouter.sendToCustomer({
  input: z.object({ id: z.string() }),
  mutation: async ({ input, ctx }) => {
    if (ctx.user?.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    const scope = await prisma.scope.update({
      where: { id: input.id },
      data: {
        status: "SENT",
        sentToCustomerAt: new Date(),
      },
    });
    
    // Notify customer
    const project = await prisma.project.findUnique({
      where: { scopeId: scope.id },
    });
    
    await notifyCustomer(project.customerId, "SCOPE_SENT", {
      projectId: project.id,
      scopeId: scope.id,
    });
    
    return scope;
  },
});
```

#### `approve`
Customer approves scope.

```typescript
scopeRouter.approve({
  input: z.object({ id: z.string() }),
  mutation: async ({ input, ctx }) => {
    if (ctx.user?.role !== "CUSTOMER") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    const scope = await prisma.scope.update({
      where: { id: input.id },
      data: {
        status: "APPROVED",
        customerApprovedAt: new Date(),
        lockedAt: new Date(),
      },
    });
    
    // Update project
    await prisma.project.update({
      where: { id: scope.projectId },
      data: {
        status: "IN_DEVELOPMENT",
        scopeLockedAt: new Date(),
      },
    });
    
    // Log approval
    await prisma.approval.create({
      data: {
        projectId: scope.projectId,
        approvalType: "SCOPE_APPROVAL",
        approvedBy: ctx.user.id,
      },
    });
    
    return scope;
  },
});
```

---

## Change Requests API

### Router: `/api/change-requests`

#### `create`
Customer creates change request.

```typescript
changeRequestsRouter.create({
  input: z.object({
    projectId: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    priority: z.enum(Priority).optional(),
    attachments: z.array(z.string()).optional(),
  }),
  mutation: async ({ input, ctx }) => {
    if (ctx.user?.role !== "CUSTOMER") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    // Verify project belongs to customer
    const project = await prisma.project.findUnique({
      where: { id: input.projectId },
    });
    
    if (project.customerId !== ctx.user.id) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    const crNumber = `CR-${String(Date.now()).slice(-5)}`;
    
    const cr = await prisma.changeRequest.create({
      data: {
        projectId: input.projectId,
        crNumber,
        title: input.title,
        description: input.description,
        category: input.category,
        priority: input.priority || "MEDIUM",
        attachments: input.attachments,
        status: "PENDING_REVIEW",
      },
    });
    
    // Notify admins
    await notifyAdmins("NEW_CHANGE_REQUEST", {
      crId: cr.id,
      projectId: project.id,
      customerName: ctx.user.name,
    });
    
    return cr;
  },
});
```

#### `evaluate`
Admin evaluates change request against scope.

```typescript
changeRequestsRouter.evaluate({
  input: z.object({
    id: z.string(),
    classification: z.enum(CRClassification),
    additionalCost: z.number().optional(),
    additionalDays: z.number().optional(),
    evaluationNotes: z.string().optional(),
  }),
  mutation: async ({ input, ctx }) => {
    if (ctx.user?.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    const cr = await prisma.changeRequest.update({
      where: { id: input.id },
      data: {
        classification: input.classification,
        additionalCost: input.additionalCost,
        additionalDays: input.additionalDays,
        evaluationNotes: input.evaluationNotes,
        evaluatedBy: ctx.user.id,
        evaluatedAt: new Date(),
        status: input.classification === "ADDITIONAL_FEATURE" 
          ? "QUOTED" 
          : "APPROVED",
      },
    });
    
    // If additional feature, notify customer for approval
    if (input.classification === "ADDITIONAL_FEATURE") {
      const project = await prisma.project.findUnique({
        where: { id: cr.projectId },
      });
      
      await notifyCustomer(project.customerId, "CR_QUOTED", {
        crId: cr.id,
        additionalCost: input.additionalCost,
        additionalDays: input.additionalDays,
      });
    }
    
    return cr;
  },
});
```

#### `approve`
Customer approves change request.

```typescript
changeRequestsRouter.approve({
  input: z.object({ id: z.string() }),
  mutation: async ({ input, ctx }) => {
    if (ctx.user?.role !== "CUSTOMER") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    const cr = await prisma.changeRequest.update({
      where: { id: input.id },
      data: {
        customerApproved: true,
        customerApprovedAt: new Date(),
        status: "APPROVED",
      },
    });
    
    // Update project total
    if (cr.additionalCost) {
      await prisma.project.update({
        where: { id: cr.projectId },
        data: {
          additionalCost: { increment: cr.additionalCost },
          currentTotal: { increment: cr.additionalCost },
          outstandingBalance: { increment: cr.additionalCost },
        },
      });
    }
    
    // Log approval
    await prisma.approval.create({
      data: {
        projectId: cr.projectId,
        approvalType: "CHANGE_REQUEST_APPROVAL",
        approvedBy: ctx.user.id,
      },
    });
    
    return cr;
  },
});
```

---

## Billing API

### Router: `/api/billing`

#### `generateInvoice`
Generate invoice for project.

```typescript
billingRouter.generateInvoice({
  input: z.object({
    projectId: z.string(),
    items: z.array(z.object({
      description: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      itemType: z.enum(InvoiceItemType),
      referenceId: z.string().optional(),
    })),
    dueDate: z.date(),
    notes: z.string().optional(),
  }),
  mutation: async ({ input, ctx }) => {
    if (ctx.user?.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    const project = await prisma.project.findUnique({
      where: { id: input.projectId },
    });
    
    const invoiceNumber = `INV-${String(Date.now()).slice(-5)}`;
    
    // Calculate totals
    const subtotal = input.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0
    );
    
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        projectId: input.projectId,
        customerId: project.customerId,
        invoiceDate: new Date(),
        dueDate: input.dueDate,
        subtotal,
        total: subtotal,
        currency: project.currency,
        notes: input.notes,
        items: {
          create: input.items.map((item, i) => ({
            ...item,
            total: item.quantity * item.unitPrice,
            sortOrder: i,
          })),
        },
      },
    });
    
    // Send invoice to customer
    await notifyCustomer(project.customerId, "INVOICE_SENT", {
      invoiceId: invoice.id,
      amount: invoice.total,
      dueDate: invoice.dueDate,
    });
    
    return invoice;
  },
});
```

#### `getProjectBilling`
Get complete billing history for project.

```typescript
billingRouter.getProjectBilling({
  input: z.object({ projectId: z.string() }),
  query: async ({ input, ctx }) => {
    const project = await prisma.project.findUnique({
      where: { id: input.projectId },
      include: {
        invoices: { include: { items: true } },
        payments: true,
      },
    });
    
    // Authorization check
    if (ctx.user?.role !== "ADMIN" && project.customerId !== ctx.user.id) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    return {
      project: {
        originalPrice: project.originalPrice,
        additionalCost: project.additionalCost,
        currentTotal: project.currentTotal,
        amountPaid: project.amountPaid,
        outstandingBalance: project.outstandingBalance,
      },
      invoices: project.invoices,
      payments: project.payments,
    };
  },
});
```

---

## Payments API

### Router: `/api/payments`

#### `processPayment`
Process payment (via Paystack).

```typescript
paymentsRouter.processPayment({
  input: z.object({
    invoiceId: z.string(),
    paymentMethod: z.enum(PaymentMethod),
    amount: z.number(),
    reference: z.string(),
  }),
  mutation: async ({ input, ctx }) => {
    if (ctx.user?.role !== "CUSTOMER") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    const invoice = await prisma.invoice.findUnique({
      where: { id: input.invoiceId },
      include: { project: true },
    });
    
    // Verify payment with Paystack
    const paymentResult = await verifyPaystackPayment(input.reference);
    
    if (!paymentResult.success) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Payment verification failed" });
    }
    
    const paymentId = `PAY-${String(Date.now()).slice(-5)}`;
    
    const payment = await prisma.payment.create({
      data: {
        paymentId,
        invoiceId: input.invoiceId,
        projectId: invoice.projectId,
        customerId: ctx.user.id,
        amount: input.amount,
        currency: invoice.currency,
        paymentMethod: input.paymentMethod,
        gateway: "PAYSTACK",
        gatewayResponse: paymentResult,
        referenceNumber: input.reference,
        transactionId: paymentResult.transaction_id,
        status: "COMPLETED",
      },
    });
    
    // Update invoice status
    await prisma.invoice.update({
      where: { id: input.invoiceId },
      data: {
        status: "PAID",
        paidAt: new Date(),
      },
    });
    
    // Update project payment tracking
    await prisma.project.update({
      where: { id: invoice.projectId },
      data: {
        amountPaid: { increment: input.amount },
        outstandingBalance: { decrement: input.amount },
      },
    });
    
    // Notify customer
    await notifyCustomer(ctx.user.id, "PAYMENT_RECEIVED", {
      paymentId: payment.id,
      amount: input.amount,
    });
    
    return payment;
  },
});
```

---

## Previews API

### Router: `/api/previews`

#### `create`
Create new preview version.

```typescript
previewsRouter.create({
  input: z.object({
    projectId: z.string(),
    version: z.string(),
    releaseNotes: z.string(),
    changes: z.array(z.any()),
    knownIssues: z.string().optional(),
    expiresIn: z.number().optional(), // hours
  }),
  mutation: async ({ input, ctx }) => {
    if (ctx.user?.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    // Deploy preview (placeholder - actual deployment logic)
    const previewUrl = await deployPreview(input.projectId, input.version);
    
    // Generate access token
    const accessToken = crypto.randomBytes(32).toString("hex");
    
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + (input.expiresIn || 72));
    
    const preview = await prisma.previewVersion.create({
      data: {
        projectId: input.projectId,
        version: input.version,
        releaseNotes: input.releaseNotes,
        changes: input.changes,
        knownIssues: input.knownIssues,
        previewUrl,
        accessToken,
        expiresAt,
      },
    });
    
    // Notify customer
    const project = await prisma.project.findUnique({
      where: { id: input.projectId },
    });
    
    await notifyCustomer(project.customerId, "PREVIEW_READY", {
      previewId: preview.id,
      version: input.version,
    });
    
    return preview;
  },
});
```

#### `getAccessUrl`
Get preview URL with access token.

```typescript
previewsRouter.getAccessUrl({
  input: z.object({ id: z.string() }),
  query: async ({ input, ctx }) => {
    const preview = await prisma.previewVersion.findUnique({
      where: { id: input.id },
      include: { project: true },
    });
    
    // Authorization check
    if (ctx.user?.role !== "ADMIN" && preview.project.customerId !== ctx.user.id) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    
    // Check expiration
    if (new Date() > preview.expiresAt) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Preview has expired" });
    }
    
    return {
      url: `${preview.previewUrl}?token=${preview.accessToken}`,
      expiresAt: preview.expiresAt,
    };
  },
});
```

---

## Files API

### Router: `/api/files`

#### `upload`
Upload file to Cloudinary.

```typescript
filesRouter.upload({
  input: z.object({
    file: z.any(), // File upload
    projectId: z.string().optional(),
    category: z.enum(AssetCategory),
  }),
  mutation: async ({ input, ctx }) => {
    const result = await uploadFile(input.file, {
      folder: input.projectId ? `projects/${input.projectId}` : "general",
      tags: [input.category],
    });
    
    const asset = await prisma.asset.create({
      data: {
        projectId: input.projectId,
        customerId: ctx.user.role === "CUSTOMER" ? ctx.user.id : null,
        fileName: result.publicId,
        filePath: result.url,
        fileSize: result.bytes,
        fileType: result.resourceType,
        mimeType: result.format,
        category: input.category,
        uploadedBy: ctx.user.id,
        cloudinaryPublicId: result.publicId,
        cloudinaryUrl: result.secureUrl,
      },
    });
    
    return asset;
  },
});
```

---

## Middleware

### Authentication Middleware

```typescript
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});
```

### Admin Middleware

```typescript
const isAdmin = t.middleware(({ ctx, next }) => {
  if (ctx.user?.role !== "ADMIN") {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});
```

### Validation Middleware

```typescript
const validateInput = (schema: z.ZodSchema) => 
  t.middleware(async ({ input, next }) => {
    const result = schema.safeParse(input);
    if (!result.success) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Validation failed",
        cause: result.error,
      });
    }
    return next({ input: result.data });
  });
```

---

## Error Handling

### Global Error Handler

```typescript
export const errorHandler = (error: unknown) => {
  if (error instanceof TRPCError) {
    return error;
  }
  
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle Prisma errors
    if (error.code === "P2002") {
      return new TRPCError({
        code: "CONFLICT",
        message: "Record already exists",
      });
    }
  }
  
  return new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred",
  });
};
```

---

## Rate Limiting

### Implementation

```typescript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP",
});

app.use("/api", limiter);
```

---

## Security Considerations

1. **Input Validation**: All inputs validated with Zod schemas
2. **SQL Injection**: Prisma ORM prevents SQL injection
3. **XSS Protection**: Input sanitization, CSP headers
4. **CSRF Protection**: Token-based CSRF protection
5. **Rate Limiting**: API rate limiting per IP
6. **Authentication**: JWT tokens with expiration
7. **Authorization**: Role-based access control
8. **Audit Logging**: All sensitive actions logged
9. **Data Encryption**: Sensitive data encrypted at rest (optional)
10. **HTTPS**: All API calls over HTTPS only

---

## API Versioning

Strategy: URL-based versioning

```
/api/v1/...
/api/v2/...
```

Backward compatibility maintained for at least one major version.

---

## Testing Strategy

1. **Unit Tests**: Test individual procedures
2. **Integration Tests**: Test API endpoints with database
3. **E2E Tests**: Test complete user flows
4. **Load Testing**: Test API performance under load
5. **Security Testing**: Test for vulnerabilities

---

## Documentation

1. **OpenAPI/Swagger**: Auto-generated from tRPC schema
2. **Postman Collection**: API testing collection
3. **Developer Guide**: API usage documentation
4. **Changelog**: API changes and deprecations
