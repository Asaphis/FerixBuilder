# FerixBuilder Product Blueprint

## Executive Summary

FerixBuilder is a web development platform that connects customers with professional development services. The platform is built around **scope protection**, **billing transparency**, and **delivery security** to ensure fair business practices for both customers and Ferixas.

### Core Business Rules

1. **Scope Protection**: No work outside the approved scope enters development until the customer is informed of additional cost and approves it.
2. **Delivery Protection**: Final source code, production credentials, and final handover remain locked until all required payments are completed.
3. **Revision Protection**: Changes within agreed scope are handled according to included revision allowance. New functionality or work outside scope becomes an additional charge.
4. **Transparency**: Every scope change, price change, approval, message, preview, payment, and delivery event is recorded in project history.

---

## Business Model

### Project Initiation

Customers can start projects in two ways:

#### A. Predefined Plans
For customers wanting standard solutions:

- **Basic Website** - Starting from ₦150,000
  - Homepage, About, Contact
  - Responsive design
  - Basic contact form
  - Basic deployment

- **Business Website** - ₦300,000
  - More features (to be defined)

- **Custom Application** - Starting from ₦X
  - Requires project request and quotation

#### B. Custom Project
Customer submits detailed requirements:

Example VTU platform request:
- Registration, wallet, airtime, data, electricity
- Admin dashboard, payment integration, referrals
- Ferixas reviews and creates initial scope and price

### Scope System

Every project has a formal Scope defining the contract between customer request and Ferixas agreement.

**Scope Structure:**
- Included features (with sub-items)
- Excluded features
- Price
- Revision allowance (e.g., 3 rounds)
- Timeline
- Payment terms

**Example:**
```
Included:
- Authentication (Registration, Login, Password reset)
- User system (Profile, Dashboard)
- Payments (Paystack integration)
- E-commerce (Products, Cart, Checkout)
- Admin (User/Product/Order management)

Not included:
- Mobile application
- Advanced analytics
- AI chatbot
- Multi-vendor marketplace

Price: ₦800,000
Included revisions: 3 rounds
```

### Change Request System

When customer requests features outside scope:

1. **Request** - Customer submits change request
2. **Evaluation** - Ferixas evaluates against scope
3. **Classification**:
   - **Included** - Already in scope (₦0 additional)
   - **Revision** - Adjustment within scope (₦0 if within allowance)
   - **Additional Feature** - Outside scope (quoted cost)
4. **Quote** - Customer sees cost and timeline
5. **Approval** - Customer must approve before work begins
6. **Accumulation** - Approved charges add to project total

**Change Request Example:**
```
CR-004: Referral System
Requested feature: Referral system
Original scope: Not included
Additional development cost: ₦80,000
Additional time: 4 days
Status: Awaiting approval
```

### Billing System

**Project Financial Ledger:**
```
Original project:           ₦800,000
Additional work:
  CR-001 Referral system:    +₦80,000 ✓
  CR-002 Notifications:      +₦50,000 ✓
  CR-003 Mobile redesign:    +₦30,000 ✓
──────────────────────────────────────
PROJECT TOTAL:              ₦960,000
Amount paid:                 ₦0
Balance:                    ₦960,000
```

**Payment Model (MVP):**
- Final payment before delivery
- Source code locked until payment
- Production credentials locked until payment
- Preview access during development

**Future Enhancement:**
- Milestone payments (Initial, Development, Final)
- Additional features added to current/next invoice

---

## Customer Journey

### Step 1: Account Creation
- Register
- Email verification
- Customer dashboard

### Step 2: Project Initiation
Choose:
- [Browse Plans] - Predefined packages
- [Request Custom Project] - Detailed wizard

### Step 3A: Plan Selection
- View plan details
- See included features
- Choose plan
- Submit information

### Step 3B: Custom Project Wizard
1. Basic information
2. Project description
3. Features
4. Pages
5. Branding
6. Logo upload
7. Images/assets
8. Content
9. Design references
10. Technical requirements
11. Domain/hosting
12. Review & submit

### Step 4: Admin Review
Admin sees new project request:
- Project details
- Customer information
- Status: Submitted
- Actions: Review, Request clarification, Reject

### Step 5: Scope Creation
Admin defines:
- Included features
- Excluded features
- Revision allowance
- Estimated timeline
- Price
- Payment terms
- Sends to customer

### Step 6: Customer Approval
Customer sees proposal:
- Total price
- Timeline
- Included features
- Revision allowance
- Actions: Decline, Request changes, Approve

### Step 7: Development
Status: IN DEVELOPMENT
- Customer sees progress
- Developers work privately

### Step 8: Preview Releases
- v0.1, v0.2, v0.3, v0.4, v1.0
- Each preview has: release date, changes, version, review status

### Step 9: Customer Review
Customer can:
- Approve
- Request changes

### Step 10: Change Request Flow
1. Customer requests change
2. System creates CR
3. Admin evaluates
4. Quote sent to customer
5. Customer approves
6. Project total updated
7. Feature added to queue

### Step 11: Final Preview
Customer sees:
- Final review
- All completed requirements
- Project total
- Actions: Open preview, Request changes, Approve

### Step 12: Final Invoice
System calculates:
- Original project
- All approved additional work
- Total
- Paid amount
- Balance

### Step 13: Payment
Customer pays balance

### Step 14: Delivery
System unlocks:
- Source code
- Documentation
- Production deployment

### Step 15: Optional Management
Customer can purchase:
- Hosting
- Database management
- Domain management
- Maintenance
- Backups
- Monitoring
- Updates
- Technical support

---

## MVP Phases

### MVP 1: Foundation - Authentication
**Customer:**
- Register
- Login
- Verify email
- Forgot password
- Reset password

**Admin:**
- Login
- 2FA
- Roles
- Sessions

### MVP 2: Customer Portal
**Dashboard:**
- Overview
- Projects
- Notifications
- Profile

**Projects:**
- Create project
- Multiple projects
- Project details
- Project status

### MVP 3: Project Submission
- Full wizard (12 steps)
- File uploads
- Form validation
- Draft saving

### MVP 4: Admin Portal
**Dashboard:**
- Overview
- Projects
- Customers
- Project Requests
- Messages
- Change Requests
- Payments
- Files
- Notifications

### MVP 5: Scope & Quotation
**Admin:**
- Create scope
- Define features
- Define exclusions
- Set price
- Set timeline
- Set revision allowance
- Set terms

**Customer:**
- View proposal
- Request clarification
- Approve

### MVP 6: Development Tracking
Statuses:
- Planning
- Development
- Internal QA
- Preview
- Customer Review
- Revision
- Final Review

### MVP 7: Preview System
- Developer project
- Build
- Isolated preview environment
- Private URL
- Customer access
- Preview protection (no screenshots, no copy)

### MVP 8: Review + Change Requests
**Customer:**
- Approve
- Request change

**Change Request:**
- Description
- Attachments
- Category
- Scope classification
- Price
- Timeline
- Approval
- Status

### MVP 9: Billing
- Original price
- Approved additional work
- Payments
- Outstanding balance
- Invoice generation

### MVP 10: Final Approval + Payment
- Final preview
- Final approval
- Invoice
- Payment processing

### MVP 11: Source-Code Delivery
- Payment confirmation
- Release authorization
- Secure source package
- Temporary download URL
- Customer download

---

## Not in MVP (Future Phases)

- Automatic domain purchasing
- Full DNS management
- Customer server dashboard
- Automatic database creation
- Kubernetes
- Advanced CI/CD
- GitHub management
- Infrastructure marketplace
- Complex subscriptions
- Mobile applications
- AI project generation

---

## Database Structure

### Core Entities

```
USER
 │
 ├── CUSTOMER
 │
 ├── ADMIN
 │
 └── PROJECT
       │
       ├── PROJECT_REQUEST (Draft submission)
       │
       ├── SCOPE (Approved scope definition)
       │     ├── SCOPE_FEATURE (Included features)
       │     └── SCOPE_EXCLUSION (Excluded features)
       │
       ├── FEATURE (Detailed feature breakdown)
       │
       ├── ASSET (Uploaded files, images, logos)
       │
       ├── MILESTONE (Development milestones)
       │
       ├── PREVIEW_VERSION (Preview releases)
       │
       ├── CHANGE_REQUEST (CRs)
       │     ├── CR_ITEM (Items within a CR)
       │
       ├── MESSAGE (Project communications)
       │
       ├── ACTIVITY_LOG (All project events)
       │
       ├── INVOICE (Billing invoices)
       │     ├── INVOICE_ITEM (Line items)
       │
       ├── PAYMENT (Payment records)
       │
       ├── APPROVAL (Approval records)
       │
       ├── SOURCE_RELEASE (Source code deliveries)
       │
       └── DEPLOYMENT (Deployment records)
```

### Key Design Principles

1. **Financial Ledger**: Don't store single price. Use invoice items for transparency.
2. **Audit Trail**: Every change logged in activity log.
3. **Scope Protection**: Scope locked after approval, changes via CR only.
4. **Revision Tracking**: Track revision rounds against allowance.
5. **Preview Versioning**: Each preview is a version with changes tracked.

---

## Page/Screen Structure

### Customer Portal

**Authentication:**
- /register
- /login
- /forgot-password
- /reset-password
- /verify-email

**Dashboard:**
- /dashboard (Overview)
- /projects (Project list)
- /projects/:id (Project details)
- /notifications
- /profile

**Project Creation:**
- /projects/new (Plan selection)
- /projects/new/custom (Custom wizard - 12 steps)

**Project Actions:**
- /projects/:id/proposal (View scope proposal)
- /projects/:id/change-requests (CR list)
- /projects/:id/change-requests/new (New CR)
- /projects/:id/previews (Preview list)
- /projects/:id/previews/:id (Preview viewer)
- /projects/:id/billing (Billing history)
- /projects/:id/invoices/:id (Invoice details)
- /projects/:id/source (Source downloads)

### Admin Portal

**Dashboard:**
- /admin (Overview)
- /admin/projects (All projects)
- /admin/projects/:id (Project details)
- /admin/customers (Customer list)
- /admin/customers/:id (Customer details)
- /admin/requests (Project requests)
- /admin/requests/:id (Request review)
- /admin/change-requests (All CRs)
- /admin/change-requests/:id (CR review)
- /admin/payments (Payment history)
- /admin/files (File management)
- /admin/notifications
- /admin/profile
- /admin/settings

**Project Management:**
- /admin/projects/:id/scope (Create/edit scope)
- /admin/projects/:id/features (Manage features)
- /admin/projects/:id/milestones (Manage milestones)
- /admin/projects/:id/previews (Manage previews)
- /admin/projects/:id/messages (Project messages)
- /admin/projects/:id/activity (Activity log)

---

## API Architecture

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh
- POST /api/auth/forgot-password
- POST /api/auth/reset-password
- GET /api/auth/me

### Projects
- GET /api/projects
- POST /api/projects
- GET /api/projects/:id
- PUT /api/projects/:id
- DELETE /api/projects/:id

### Project Requests
- GET /api/requests
- POST /api/requests
- GET /api/requests/:id
- PUT /api/requests/:id (Approve/Reject)

### Scope
- GET /api/projects/:id/scope
- POST /api/projects/:id/scope
- PUT /api/projects/:id/scope
- POST /api/projects/:id/scope/approve

### Change Requests
- GET /api/projects/:id/change-requests
- POST /api/projects/:id/change-requests
- GET /api/change-requests/:id
- PUT /api/change-requests/:id (Admin evaluation)
- POST /api/change-requests/:id/approve
- POST /api/change-requests/:id/decline

### Previews
- GET /api/projects/:id/previews
- POST /api/projects/:id/previews
- GET /api/previews/:id
- POST /api/previews/:id/approve
- POST /api/previews/:id/request-changes

### Billing
- GET /api/projects/:id/invoices
- POST /api/projects/:id/invoices
- GET /api/invoices/:id
- POST /api/invoices/:id/pay

### Files
- POST /api/files/upload
- GET /api/files/:id
- DELETE /api/files/:id

---

## Preview/Deployment Architecture

### Development Flow
```
Developer Project
       ↓
Build Process
       ↓
Isolated Preview Environment (Cloudflare Workers/Edge)
       ↓
Private URL (Token-based access)
       ↓
Customer Access (With preview protection)
```

### Preview Protection
- No screenshots (browser API detection)
- No text selection/copying
- No right-click
- No keyboard shortcuts (PrintScreen, Ctrl+C, etc.)
- Watermark overlay
- Token-based URL expiration

### Delivery Flow
```
Payment Confirmed
       ↓
Release Authorized
       ↓
Source Package Created (Encrypted)
       ↓
Temporary Download URL Generated
       ↓
Customer Downloads
       ↓
URL Expires (24 hours)
```

---

## Implementation Order

### Phase 1: Foundation (Week 1-2)
1. Database schema implementation
2. Authentication system
3. Basic user management
4. API foundation

### Phase 2: Customer Portal (Week 3-4)
1. Dashboard
2. Project list
3. Project creation wizard
4. Profile management

### Phase 3: Admin Portal (Week 5-6)
1. Admin dashboard
2. Project request management
3. Customer management
4. Basic admin features

### Phase 4: Scope System (Week 7-8)
1. Scope creation
2. Feature management
3. Proposal generation
4. Customer approval flow

### Phase 5: Development Tracking (Week 9)
1. Status management
2. Milestone tracking
3. Activity logging

### Phase 6: Preview System (Week 10-11)
1. Preview environment setup
2. Preview versioning
3. Preview protection
4. Preview access control

### Phase 7: Change Requests (Week 12)
1. CR creation
2. CR evaluation
3. CR approval flow
4. CR pricing

### Phase 8: Billing (Week 13)
1. Invoice generation
2. Payment processing
3. Financial ledger
4. Balance tracking

### Phase 9: Final Delivery (Week 14)
1. Final approval flow
2. Source packaging
3. Secure delivery
4. Download management

### Phase 10: Testing & Polish (Week 15-16)
1. End-to-end testing
2. Bug fixes
3. Performance optimization
4. Documentation

---

## Technology Stack

### Backend
- Node.js + Express
- Neon (PostgreSQL)
- Prisma ORM
- tRPC for API
- Cloudflare (Edge/Preview)
- Cloudinary (Storage)
- Firebase (Push notifications)
- Resend (Email)
- bcryptjs (Password hashing)
- jsonwebtoken (Authentication)

### Frontend
- React
- TypeScript
- TailwindCSS
- shadcn/ui
- Wouter (Routing)
- TanStack Query (Data fetching)

### Deployment
- Cloudflare Workers (Edge)
- Cloudflare Pages (Frontend)
- Neon (Database)

---

## Security Considerations

1. **Authentication**: JWT tokens with refresh mechanism
2. **Authorization**: Role-based access control (Customer, Admin)
3. **Data Encryption**: Sensitive data encrypted at rest
4. **Preview Protection**: Client-side protections + server-side validation
5. **Source Protection**: Encrypted storage with time-limited access
6. **Audit Logging**: All sensitive actions logged
7. **Rate Limiting**: API rate limiting to prevent abuse
8. **Input Validation**: All inputs validated with Zod schemas

---

## Success Metrics

### Customer Metrics
- Project submission rate
- Scope approval rate
- Change request approval rate
- Time to final delivery
- Customer satisfaction

### Business Metrics
- Average project value
- Additional work revenue
- Payment completion rate
- Project completion rate
- Revision utilization

### Operational Metrics
- Admin response time
- Development timeline accuracy
- Preview release frequency
- Bug fix turnaround time
