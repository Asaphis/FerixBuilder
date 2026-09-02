# Database Schema - Scope-Based Billing Model

## Overview
This database schema is designed to support the scope-based billing model with proper financial tracking, change request management, and delivery protection.

---

## Core Entities

```
USER
 │
 ├── CUSTOMER (extends USER)
 │
 ├── ADMIN (extends USER)
 │
 └── PROJECT
       │
       ├── PROJECT_REQUEST
       │
       ├── SCOPE
       │     ├── SCOPE_FEATURE
       │     └── SCOPE_EXCLUSION
       │
       ├── FEATURE
       │
       ├── ASSET
       │
       ├── MILESTONE
       │
       ├── PREVIEW_VERSION
       │
       ├── CHANGE_REQUEST
       │     ├── CHANGE_REQUEST_ITEM
       │
       ├── MESSAGE
       │
       ├── ACTIVITY_LOG
       │
       ├── INVOICE
       │     ├── INVOICE_ITEM
       │
       ├── PAYMENT
       │
       ├── APPROVAL
       │
       ├── SOURCE_RELEASE
       │
       └── DEPLOYMENT
```

---

## User Management

### User
Base user table for authentication and profile.

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  passwordHash  String
  name          String?
  phone         String?
  role          Role     @default(CUSTOMER)
  emailVerified Boolean  @default(false)
  lastSignedIn  DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Relations
  customer      Customer?
  admin         Admin?

  @@index([email])
  @@index([role])
}

enum Role {
  CUSTOMER
  ADMIN
}
```

### Customer
Customer-specific profile and business information.

```prisma
model Customer {
  id              String   @id @default(cuid())
  userId          String   @unique
  company         String?
  address         String?
  city            String?
  state           String?
  country         String?
  timezone        String   @default("UTC")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  user            User     @relation(fields: [userId], references: [id])
  projects        Project[]
  invoices        Invoice[]
  payments        Payment[]
  messages        Message[]

  @@index([userId])
}
```

### Admin
Admin-specific profile and permissions.

```prisma
model Admin {
  id              String   @id @default(cuid())
  userId          String   @unique
  title           String?
  department      String?
  twoFactorEnabled Boolean @default(false)
  twoFactorSecret String?
  backupCodes     String[] // JSON array of backup codes
  permissions     String[] // JSON array of permissions
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  user            User     @relation(fields: [userId], references: [id])
  assignedProjects ProjectAssignment[]
  activityLogs    ActivityLog[]
  changeRequests  ChangeRequest[] // Evaluated by

  @@index([userId])
}
```

---

## Project Management

### Project
Main project entity with status and financial tracking.

```prisma
model Project {
  id              String   @id @default(cuid())
  projectId       String   @unique // FX-XXXXX format
  customerId      String
  name            String
  description     String?
  projectType     ProjectType
  industry        String?
  status          ProjectStatus @default(DRAFT)
  priority        Priority @default(MEDIUM)
  
  // Financial tracking
  originalPrice   Decimal  @db.Decimal(12, 2)
  additionalCost  Decimal  @default(0) @db.Decimal(12, 2)
  currentTotal    Decimal  @default(0) @db.Decimal(12, 2)
  amountPaid      Decimal  @default(0) @db.Decimal(12, 2)
  outstandingBalance Decimal @default(0) @db.Decimal(12, 2)
  currency        String   @default("NGN")
  
  // Timeline
  estimatedWeeks  Int?
  startDate       DateTime?
  estimatedCompletion DateTime?
  actualCompletion DateTime?
  deliveredAt     DateTime?
  
  // Revision tracking
  revisionAllowance Int     @default(3)
  revisionRoundsUsed Int    @default(0)
  
  // Scope lock
  scopeLockedAt   DateTime?
  scopeLockedBy   String?
  
  // Final approval
  finalApprovedAt DateTime?
  finalApprovedBy String?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  customer        Customer @relation(fields: [customerId], references: [id])
  request         ProjectRequest?
  scope           Scope?
  features        Feature[]
  assets          Asset[]
  milestones      Milestone[]
  previews        PreviewVersion[]
  changeRequests  ChangeRequest[]
  messages        Message[]
  activityLogs    ActivityLog[]
  invoices        Invoice[]
  payments        Payment[]
  approvals       Approval[]
  sourceReleases  SourceRelease[]
  deployments     Deployment[]
  assignments      ProjectAssignment[]

  @@index([customerId])
  @@index([status])
  @@index([projectId])
}

enum ProjectType {
  WEBSITE
  APPLICATION
  E_COMMERCE
  CUSTOM
}

enum ProjectStatus {
  DRAFT
  SUBMITTED
  IN_REVIEW
  SCOPE_PENDING
  IN_DEVELOPMENT
  INTERNAL_QA
  PREVIEW
  CUSTOMER_REVIEW
  REVISION
  FINAL_REVIEW
  COMPLETED
  CANCELLED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}
```

### ProjectRequest
Initial project submission before scope creation.

```prisma
model ProjectRequest {
  id              String   @id @default(cuid())
  projectId       String   @unique
  customerId      String
  name            String
  description     String
  projectType     ProjectType
  industry        String?
  targetAudience  String?
  goals           String?
  successCriteria String?
  
  // Feature requirements
  features        Json     // JSON array of requested features
  pages           Json     // JSON array of requested pages
  
  // Branding
  brandColors     Json?    // JSON array of colors
  typography      String?
  stylePreference String?
  
  // Technical
  platform        String?
  technology      String?
  integrations    Json?    // JSON array of integrations
  
  // Domain/Hosting
  domainStatus    String?
  hostingPreference String?
  
  // Status
  status          RequestStatus @default(SUBMITTED)
  adminNotes      String?
  submittedAt     DateTime @default(now())
  reviewedAt      DateTime?
  reviewedBy      String?

  // Relations
  customer        Customer @relation(fields: [customerId], references: [id])
  project         Project?
  assets          Asset[]

  @@index([customerId])
  @@index([status])
  @@index([projectId])
}

enum RequestStatus {
  DRAFT
  SUBMITTED
  IN_REVIEW
  APPROVED
  REJECTED
  CLARIFICATION_REQUESTED
}
```

### Scope
Approved project scope - the contract between customer and Ferixas.

```prisma
model Scope {
  id              String   @id @default(cuid())
  projectId       String   @unique
  
  // Pricing
  originalPrice   Decimal  @db.Decimal(12, 2)
  currency        String   @default("NGN")
  paymentTerms    String   @default("FINAL_PAYMENT")
  
  // Timeline
  estimatedWeeks  Int
  startDate       DateTime
  estimatedCompletion DateTime
  
  // Revision allowance
  revisionAllowance Int     @default(3)
  revisionDefinition String // What constitutes a revision round
  additionalRevisionCost Decimal @db.Decimal(12, 2)
  
  // Terms
  terms           String   @db.Text
  
  // Status
  status          ScopeStatus @default(DRAFT)
  sentToCustomerAt DateTime?
  customerApprovedAt DateTime?
  lockedAt        DateTime?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  project         Project  @relation(fields: [projectId], references: [id])
  features        ScopeFeature[]
  exclusions      ScopeExclusion[]

  @@index([projectId])
  @@index([status])
}

enum ScopeStatus {
  DRAFT
  SENT
  APPROVED
  LOCKED
}
```

### ScopeFeature
Features included in the approved scope.

```prisma
model ScopeFeature {
  id              String   @id @default(cuid())
  scopeId         String
  category        String
  name            String
  description     String?
  subItems        Json?    // JSON array of sub-items
  sortOrder       Int      @default(0)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  scope           Scope    @relation(fields: [scopeId], references: [id])

  @@index([scopeId])
}
```

### ScopeExclusion
Features explicitly excluded from scope.

```prisma
model ScopeExclusion {
  id              String   @id @default(cuid())
  scopeId         String
  name            String
  reason          String
  sortOrder       Int      @default(0)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  scope           Scope    @relation(fields: [scopeId], references: [id])

  @@index([scopeId])
}
```

### Feature
Detailed feature breakdown for development tracking.

```prisma
model Feature {
  id              String   @id @default(cuid())
  projectId       String
  category        String
  name            String
  description     String?
  status          FeatureStatus @default(NOT_STARTED)
  priority        Priority @default(MEDIUM)
  assignedTo      String?
  dueDate         DateTime?
  completedAt     DateTime?
  sortOrder       Int      @default(0)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  project         Project  @relation(fields: [projectId], references: [id])

  @@index([projectId])
  @@index([status])
  @@index([assignedTo])
}

enum FeatureStatus {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
  BLOCKED
  CANCELLED
}
```

### Asset
Uploaded files (logos, images, documents).

```prisma
model Asset {
  id              String   @id @default(cuid())
  projectId       String?
  requestId       String?
  customerId      String?
  fileName        String
  filePath        String
  fileSize        Int
  fileType        String
  mimeType        String
  category        AssetCategory
  uploadedBy      String
  
  // Cloudinary
  cloudinaryPublicId String?
  cloudinaryUrl   String?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([projectId])
  @@index([requestId])
  @@index([customerId])
  @@index([category])
}

enum AssetCategory {
  LOGO
  IMAGE
  DOCUMENT
  DESIGN_REFERENCE
  BRAND_GUIDELINE
  OTHER
}
```

### Milestone
Project milestones for timeline tracking.

```prisma
model Milestone {
  id              String   @id @default(cuid())
  projectId       String
  name            String
  description     String?
  dueDate         DateTime
  status          MilestoneStatus @default(NOT_STARTED)
  completedAt     DateTime?
  sortOrder       Int      @default(0)
  dependencies    Json?    // JSON array of milestone IDs
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  project         Project  @relation(fields: [projectId], references: [id])

  @@index([projectId])
  @@index([status])
}

enum MilestoneStatus {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
  OVERDUE
}
```

### ProjectAssignment
Team members assigned to projects.

```prisma
model ProjectAssignment {
  id              String   @id @default(cuid())
  projectId       String
  adminId         String
  role            ProjectRole
  assignedAt      DateTime @default(now())
  
  // Relations
  project         Project  @relation(fields: [projectId], references: [id])
  admin           Admin    @relation(fields: [adminId], references: [id])

  @@unique([projectId, adminId])
  @@index([projectId])
  @@index([adminId])
}

enum ProjectRole {
  PROJECT_MANAGER
  DEVELOPER
  DESIGNER
  QA_ENGINEER
}
```

---

## Preview System

### PreviewVersion
Preview releases for customer review.

```prisma
model PreviewVersion {
  id              String   @id @default(cuid())
  projectId       String
  version         String   // v0.1, v0.2, etc.
  releaseNotes    String   @db.Text
  changes         Json     // JSON array of changes
  knownIssues     String?
  
  // Preview URL
  previewUrl      String
  accessToken     String   // Token for access
  expiresAt       DateTime
  
  // Review status
  reviewStatus    ReviewStatus @default(PENDING)
  reviewedAt      DateTime?
  reviewedBy      String?
  reviewComments  String?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  project         Project  @relation(fields: [projectId], references: [id])

  @@index([projectId])
  @@index([reviewStatus])
}

enum ReviewStatus {
  PENDING
  APPROVED
  CHANGES_REQUESTED
}
```

---

## Change Request System

### ChangeRequest
Change requests for scope modifications.

```prisma
model ChangeRequest {
  id              String   @id @default(cuid())
  projectId       String
  crNumber        String   @unique // CR-XXX format
  title           String
  description     String   @db.Text
  category        String
  priority        Priority @default(MEDIUM)
  
  // Attachments
  attachments     Json?    // JSON array of asset IDs
  
  // Evaluation
  classification  CRClassification @default(PENDING)
  additionalCost  Decimal? @db.Decimal(12, 2)
  additionalDays  Int?
  evaluationNotes String?
  evaluatedBy     String?
  evaluatedAt     DateTime?
  
  // Approval
  customerApproved Boolean @default(false)
  customerApprovedAt DateTime?
  customerDeclinedAt DateTime?
  declineReason   String?
  
  // Status
  status          CRStatus @default(PENDING_REVIEW)
  completedAt     DateTime?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  project         Project  @relation(fields: [projectId], references: [id])
  items           ChangeRequestItem[]
  evaluatedByAdmin Admin?   @relation(fields: [evaluatedBy], references: [id])

  @@index([projectId])
  @@index([status])
  @@index([crNumber])
}

enum CRClassification {
  PENDING
  INCLUDED_IN_SCOPE
  REVISION
  ADDITIONAL_FEATURE
  BUG_FIX
}

enum CRStatus {
  PENDING_REVIEW
  QUOTED
  AWAITING_APPROVAL
  APPROVED
  DECLINED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}
```

### ChangeRequestItem
Individual items within a change request.

```prisma
model ChangeRequestItem {
  id              String   @id @default(cuid())
  changeRequestId String
  description     String
  additionalCost  Decimal? @db.Decimal(12, 2)
  sortOrder       Int      @default(0)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  changeRequest   ChangeRequest @relation(fields: [changeRequestId], references: [id])

  @@index([changeRequestId])
}
```

---

## Communication

### Message
Project communication between admin and customer.

```prisma
model Message {
  id              String   @id @default(cuid())
  projectId       String
  customerId      String
  senderId        String   // User ID (admin or customer)
  senderRole      Role
  subject         String?
  content         String   @db.Text
  attachments     Json?    // JSON array of asset IDs
  isRead          Boolean  @default(false)
  readAt          DateTime?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  project         Project  @relation(fields: [projectId], references: [id])
  customer        Customer @relation(fields: [customerId], references: [id])

  @@index([projectId])
  @@index([customerId])
  @@index([isRead])
}
```

---

## Billing System

### Invoice
Invoices for billing customers.

```prisma
model Invoice {
  id              String   @id @default(cuid())
  invoiceNumber   String   @unique // INV-XXXXX format
  projectId       String
  customerId      String
  
  // Invoice details
  invoiceDate     DateTime @default(now())
  dueDate         DateTime
  subtotal        Decimal  @db.Decimal(12, 2)
  tax             Decimal  @default(0) @db.Decimal(12, 2)
  total           Decimal  @db.Decimal(12, 2)
  currency        String   @default("NGN")
  
  // Status
  status          InvoiceStatus @default(DRAFT)
  sentAt          DateTime?
  paidAt          DateTime?
  
  // Notes
  notes           String?  @db.Text
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  project         Project  @relation(fields: [projectId], references: [id])
  customer        Customer @relation(fields: [customerId], references: [id])
  items           InvoiceItem[]
  payments        Payment[]

  @@index([projectId])
  @@index([customerId])
  @@index([status])
  @@index([invoiceNumber])
}

enum InvoiceStatus {
  DRAFT
  SENT
  PAID
  OVERDUE
  CANCELLED
}
```

### InvoiceItem
Line items within an invoice.

```prisma
model InvoiceItem {
  id              String   @id @default(cuid())
  invoiceId       String
  description     String
  quantity        Int      @default(1)
  unitPrice       Decimal  @db.Decimal(12, 2)
  total           Decimal  @db.Decimal(12, 2)
  itemType        InvoiceItemType
  referenceId     String?  // CR ID, Project ID, etc.
  sortOrder       Int      @default(0)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  invoice         Invoice  @relation(fields: [invoiceId], references: [id])

  @@index([invoiceId])
  @@index([itemType])
}

enum InvoiceItemType {
  ORIGINAL_PROJECT
  CHANGE_REQUEST
  REVISION
  ADDITIONAL_SERVICE
  HOSTING
  MAINTENANCE
  OTHER
}
```

### Payment
Payment records.

```prisma
model Payment {
  id              String   @id @default(cuid())
  paymentId       String   @unique // PAY-XXXXX format
  invoiceId       String?
  projectId       String
  customerId      String
  
  // Payment details
  amount          Decimal  @db.Decimal(12, 2)
  currency        String   @default("NGN")
  paymentMethod   PaymentMethod
  paymentDate     DateTime @default(now())
  
  // Gateway
  gateway         String   // Paystack, etc.
  gatewayResponse Json?    // Raw gateway response
  referenceNumber String?
  transactionId   String?
  
  // Status
  status          PaymentStatus @default(PENDING)
  
  // Refund
  refundedAmount  Decimal  @default(0) @db.Decimal(12, 2)
  refundedAt      DateTime?
  refundReason    String?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  invoice         Invoice? @relation(fields: [invoiceId], references: [id])
  project         Project  @relation(fields: [projectId], references: [id])
  customer        Customer @relation(fields: [customerId], references: [id])

  @@index([invoiceId])
  @@index([projectId])
  @@index([customerId])
  @@index([status])
  @@index([paymentId])
}

enum PaymentMethod {
  PAYSTACK
  BANK_TRANSFER
  CASH
  OTHER
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
  PARTIALLY_REFUNDED
}
```

---

## Approvals

### Approval
Approval records for scope, previews, etc.

```prisma
model Approval {
  id              String   @id @default(cuid())
  projectId       String
  approvalType    ApprovalType
  approvedBy      String   // User ID
  approvedAt      DateTime @default(now())
  notes           String?
  
  // Relations
  project         Project  @relation(fields: [projectId], references: [id])

  @@index([projectId])
  @@index([approvalType])
}

enum ApprovalType {
  SCOPE_APPROVAL
  PREVIEW_APPROVAL
  FINAL_APPROVAL
  CHANGE_REQUEST_APPROVAL
}
```

---

## Source Code Delivery

### SourceRelease
Source code release records.

```prisma
model SourceRelease {
  id              String   @id @default(cuid())
  projectId       String
  version         String
  packagePath     String
  packageSize     Int
  checksum        String
  downloadUrl     String
  accessToken     String
  expiresAt       DateTime
  releasedBy      String
  downloadCount   Int      @default(0)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  project         Project  @relation(fields: [projectId], references: [id])

  @@index([projectId])
}
```

---

## Deployment

### Deployment
Deployment records.

```prisma
model Deployment {
  id              String   @id @default(cuid())
  projectId       String
  environment     DeploymentEnvironment
  url             String
  deployedBy      String
  deployedAt      DateTime @default(now())
  status          DeploymentStatus @default(PENDING)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  project         Project  @relation(fields: [projectId], references: [id])

  @@index([projectId])
  @@index([environment])
}

enum DeploymentEnvironment {
  PREVIEW
  STAGING
  PRODUCTION
}

enum DeploymentStatus {
  PENDING
  DEPLOYING
  SUCCESS
  FAILED
}
```

---

## Activity Logging

### ActivityLog
Comprehensive activity logging for audit trail.

```prisma
model ActivityLog {
  id              String   @id @default(cuid())
  projectId       String?
  userId          String?
  action          String
  resource        String?
  resourceId      String?
  details         Json?
  ipAddress       String?
  userAgent       String?
  status          String   @default("SUCCESS")
  
  createdAt       DateTime @default(now())

  // Relations
  project         Project? @relation(fields: [projectId], references: [id])
  admin           Admin?   @relation(fields: [userId], references: [id])

  @@index([projectId])
  @@index([userId])
  @@index([action])
  @@index([createdAt])
}
```

---

## Notifications

### Notification
User notifications.

```prisma
model Notification {
  id              String   @id @default(cuid())
  userId          String
  type            NotificationType
  title           String
  message         String   @db.Text
  link            String?
  isRead          Boolean  @default(false)
  readAt          DateTime?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([userId])
  @@index([isRead])
  @@index([type])
}

enum NotificationType {
  PROJECT_UPDATE
  SCOPE_APPROVED
  PREVIEW_READY
  CHANGE_REQUEST_QUOTED
  INVOICE_SENT
  PAYMENT_RECEIVED
  SOURCE_RELEASED
  SYSTEM
}
```

---

## Plans (Predefined Packages)

### Plan
Predefined project plans.

```prisma
model Plan {
  id              String   @id @default(cuid())
  name            String
  description     String
  price           Decimal  @db.Decimal(12, 2)
  currency        String   @default("NGN")
  features        Json     // JSON array of included features
  isActive        Boolean  @default(true)
  sortOrder       Int      @default(0)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([isActive])
}
```

---

## Index Summary

### Performance Indexes
- User: email, role
- Customer: userId
- Admin: userId
- Project: customerId, status, projectId
- ProjectRequest: customerId, status, projectId
- Scope: projectId, status
- Feature: projectId, status, assignedTo
- Milestone: projectId, status
- PreviewVersion: projectId, reviewStatus
- ChangeRequest: projectId, status, crNumber
- Invoice: projectId, customerId, status, invoiceNumber
- Payment: projectId, customerId, status, paymentId
- ActivityLog: projectId, userId, action, createdAt
- Notification: userId, isRead, type

---

## Data Integrity

### Unique Constraints
- User.email
- Customer.userId
- Admin.userId
- Project.projectId
- ProjectRequest.projectId
- Scope.projectId
- ChangeRequest.crNumber
- Invoice.invoiceNumber
- Payment.paymentId
- ProjectAssignment.projectId + adminId

### Foreign Key Relationships
All relations are properly defined with foreign key constraints.

---

## Security Considerations

1. **Password Hashing**: All passwords stored as bcrypt hashes
2. **Sensitive Data**: Financial data encrypted at rest (optional enhancement)
3. **Audit Trail**: All sensitive actions logged in ActivityLog
4. **Access Control**: Role-based access enforced at application level
5. **Data Retention**: Configurable retention policies for logs and old data

---

## Migration Strategy

1. **Phase 1**: Create core user and project tables
2. **Phase 2**: Add scope and feature tables
3. **Phase 3**: Add change request and billing tables
4. **Phase 4**: Add preview and deployment tables
5. **Phase 5**: Add activity logging and notifications

---

## Future Enhancements

1. **Soft Deletes**: Add deletedAt field for soft delete support
2. **Versioning**: Add version tracking for scope changes
3. **Advanced Analytics**: Separate analytics tables for reporting
4. **Subscription Management**: Tables for recurring services
5. **Marketplace**: Tables for third-party integrations
