# FerixBuilder - Functional Specification

## Purpose
This document defines the complete functional requirements for the FerixBuilder platform. It is intended to be used with the existing prototype to guide the conversion from prototype to production-ready application.

## Usage Instructions for Coding AI

**INPUT 1 - Existing Prototype**
- Use as visual reference
- Preserve design language, layout, responsive behavior
- Preserve existing components where they match specification

**INPUT 2 - This Functional Specification**
- Defines what the platform actually does
- Specifies all pages, screens, flows, and functionality
- Defines business rules, permissions, and security

**INPUT 3 - Technical Architecture**
- Database schema (DATABASE_SCHEMA.md)
- API architecture (API_ARCHITECTURE.md)
- Preview/deployment architecture (PREVIEW_DEPLOYMENT_ARCHITECTURE.md)

**INSTRUCTION TO AI:**
> Compare the existing prototype against this functional specification. Do not blindly reproduce static prototype data. Convert every applicable interface into a production-ready interface backed by real APIs. Where the prototype conflicts with this specification, the specification takes precedence. Where functionality is missing from the prototype, implement the missing functionality while maintaining the existing design system. Do not remove existing functionality unless it conflicts with the specification.

---

## Platform Overview

FerixBuilder is a web development platform that connects customers with professional development services. The platform is built around scope protection, billing transparency, and delivery security.

### Core Business Rules

1. **Scope Protection**: No work outside the approved scope enters development until the customer is informed of additional cost and approves it.
2. **Delivery Protection**: Final source code, production credentials, and final handover remain locked until all required payments are completed.
3. **Revision Protection**: Changes within agreed scope are handled according to included revision allowance. New functionality or work outside scope becomes an additional charge.
4. **Transparency**: Every scope change, price change, approval, message, preview, payment, and delivery event is recorded in project history.

### User Types

- **Guest**: Unauthenticated visitor (public website)
- **Customer**: Authenticated customer who can create and manage projects
- **Admin**: Authenticated Ferixas staff who manage projects and platform

---

# PART 1 - PUBLIC WEBSITE

## Navigation Structure

**Public Website Navigation:**
- Home
- Services
- Plans
- How It Works
- About
- FAQ
- Contact
- [Start a Project] (CTA button)

**Footer Links:**
- Terms of Service
- Privacy Policy
- Contact
- Social Media

---

## Page 1: Landing Page

**URL:** `/`

**Purpose:** Introduce Ferixas and convert visitors into project creators.

**Hero Section:**
- Headline: "Build, Launch & Manage Your Digital Products"
- Subheadline explaining value proposition
- Primary CTA: [Start a Project]
- Secondary CTA: [Explore Services]

**Services Preview:**
- Brief overview of what Ferixas helps customers build:
  - Websites
  - Web Applications
  - E-commerce Platforms
  - SaaS Products
  - Mobile Applications
  - Deploy Applications
  - Manage Hosting
  - Manage Domains
  - Maintain Software

**Trust Indicators:**
- Projects completed
- Happy customers
- Years of experience (if applicable)

**Testimonials (optional):**
- Customer quotes
- Project examples

**Footer:** Standard footer with legal links

**Actions:**
- Click [Start a Project] → Redirect to `/register` (if not logged in) or `/projects/new` (if logged in)
- Click [Explore Services] → Scroll to Services section or redirect to `/services`
- Click navigation links → Navigate to respective pages

**Data Required:**
- Static content (no backend data)
- Optional: Statistics from backend (projects completed, customers)

---

## Page 2: Services / What We Build

**URL:** `/services`

**Purpose:** Detail the services Ferixas offers.

**Content:**
- Detailed description of each service:
  - **Websites**: Static sites, dynamic sites, landing pages
  - **Web Applications**: Custom web apps, dashboards, admin panels
  - **E-commerce**: Online stores, marketplaces, payment integration
  - **SaaS Platforms**: Subscription-based applications, multi-tenant systems
  - **Mobile Applications**: React Native, Flutter, native apps
  - **Custom Software**: Tailored solutions for specific needs

**Service Cards:**
- Icon/illustration
- Service name
- Brief description
- Starting from price (optional)
- [Learn More] or [Get Quote] button

**Actions:**
- Click [Get Quote] → Redirect to `/register` or `/projects/new`
- Click [Learn More] → Expand service details or scroll to detailed section

**Data Required:**
- Static content
- Optional: Service pricing from backend (Plans table)

---

## Page 3: How It Works

**URL:** `/how-it-works`

**Purpose:** Explain the project workflow to set customer expectations.

**Workflow Steps (Visual Timeline):**

1. **Tell us what you want**
   - Submit your project requirements through our detailed wizard
   - Choose a predefined plan or request a custom project

2. **We review your requirements**
   - Ferixas team reviews your submission
   - We may request clarification if needed

3. **Receive your project scope & price**
   - We create a detailed scope document
   - We define included features and timeline
   - We provide a transparent price quote

4. **Approve the project**
   - Review the scope and pricing
   - Approve to begin development
   - Scope becomes locked and serves as the baseline

5. **We build it**
   - Development begins
   - Track progress through your dashboard
   - Receive regular updates

6. **Review private previews**
   - Access isolated preview environments
   - Review work inprogress
   - Protected against unauthorized access

7. **Request changes**
   - Submit change requests for any modifications
   - Changes are evaluated against scope
   - Additional features are quoted before work begins

8. **Approve the final version**
   - Review the final preview
   - Confirm all requirements are met
   - Provide final approval

9. **Complete payment**
   - Receive final invoice
   - Complete payment via secure gateway
   - Payment verification triggers delivery

10. **Receive your project**
    - Download source code
    - Receive documentation
    - Optional: Ferixas deployment and hosting

**Actions:**
- Click [Start a Project] → Redirect to `/register` or `/projects/new`

**Data Required:**
- Static content

---

## Page 4: Plans

**URL:** `/plans`

**Purpose:** Display predefined project packages.

**Plan Cards:**

**Starter Plan**
- Name: Starter
- Description: Perfect for simple websites
- Starting Price: ₦150,000 (example - controlled by backend)
- Features:
  - Homepage
  - About page
  - Contact page
  - Responsive design
  - Basic contact form
  - Basic deployment
- Included Revisions: 2
- CTA: [Choose Starter]

**Business Plan**
- Name: Business
- Description: For growing businesses
- Starting Price: ₦300,000 (example - controlled by backend)
- Features:
  - All Starter features
  - Up to 10 pages
  - Advanced contact form
  - Social media integration
  - Basic analytics
  - SEO optimization
- Included Revisions: 3
- CTA: [Choose Business]

**Professional Plan**
- Name: Professional
- Description: For complex projects
- Starting Price: ₦500,000 (example - controlled by backend)
- Features:
  - All Business features
  - Up to 20 pages
  - Custom functionality
  - Payment integration
  - User authentication
  - Admin panel
- Included Revisions: 5
- CTA: [Choose Professional]

**Custom Project**
- Name: Custom Project
- Description: For unique requirements
- Starting Price: Get a Quote
- Features:
  - Tailored to your needs
  - Custom development
  - Advanced integrations
  - Scalable architecture
- Included Revisions: Defined in scope
- CTA: [Request Custom Project]

**Important:** Prices, features, and availability are controlled by the backend (Plans table). Frontend displays what the backend provides.

**Actions:**
- Click [Choose X Plan] → Redirect to `/register` or `/projects/new?plan=X`
- Click [Request Custom Project] → Redirect to `/register` or `/projects/new/custom`

**Data Required:**
- Plans from backend (Plan table)
- Plan features from backend
- Plan pricing from backend
- Plan availability from backend

---

## Page 5: FAQ

**URL:** `/faq`

**Purpose:** Answer common questions to reduce support burden.

**FAQ Categories:**

**Development Process**
- Q: How does the development process work?
  A: [Explain the 10-step workflow from How It Works]
- Q: How long does a project take?
  A: Timeline depends on project complexity. Your scope document will include an estimated timeline.
- Q: Can I see progress during development?
  A: Yes, you can track progress through your dashboard and receive regular updates.

**Changes & Revisions**
- Q: Can I request changes?
  A: Yes, you can submit change requests at any time. Changes are evaluated against your approved scope.
- Q: What happens if I request a feature not included in my project?
  A: Features outside your approved scope are quoted as additional work. You must approve the additional cost before work begins.
- Q: How many revisions are included?
  A: The number of included revision rounds is defined in your project scope. Additional revisions incur a fee.

**Payment & Delivery**
- Q: When do I pay?
  A: Payment is due after final approval and before source code delivery.
- Q: When do I receive the source code?
  A: Source code is released after payment is completed and final approval is received.
- Q: What payment methods do you accept?
  A: We accept Paystack, bank transfer, and other methods as specified.

**Hosting & Management**
- Q: Can Ferixas deploy my project?
  A: Yes, we offer deployment services as part of our managed hosting options.
- Q: Can Ferixas manage my domain?
  A: Yes, we can manage your domain registration and DNS configuration.
- Q: Do you offer ongoing maintenance?
  A: Yes, we offer maintenance packages for ongoing support and updates.

**General**
- Q: Can I have multiple projects?
  A: Yes, you can have multiple active projects simultaneously.
- Q: Can I continue development after delivery?
  A: Yes, you can submit new project requests for additional features or new projects.

**Actions:**
- Click FAQ question → Expand answer (accordion style)
- Click [Contact Us] → Redirect to `/contact`

**Data Required:**
- Static content (or managed via CMS in future)

---

## Page 6: About

**URL:** `/about`

**Purpose:** Share company story and build trust.

**Content:**
- Company history
- Mission statement
- Team members (optional)
- Values
- Process overview
- Contact information

**Actions:**
- Click [Contact Us] → Redirect to `/contact`
- Click [Start a Project] → Redirect to `/register` or `/projects/new`

**Data Required:**
- Static content

---

## Page 7: Contact

**URL:** `/contact`

**Purpose:** Allow visitors to send general inquiries.

**Form Fields:**
- Name *
- Email *
- Phone (optional)
- Subject *
- Message *
- [Send Message]

**Actions:**
- Submit form → Send to backend, show success message
- Form validation → Required fields, email format

**Data Required:**
- Form submission to backend (ContactInquiry table or similar)

---

## Page 8: Terms of Service

**URL:** `/terms`

**Purpose:** Legal terms and conditions.

**Content:**
- Terms of service
- Service agreement
- Payment terms
- Intellectual property
- Limitation of liability
- Dispute resolution

**Data Required:**
- Static content

---

## Page 9: Privacy Policy

**URL:** `/privacy`

**Purpose:** Privacy policy and data handling.

**Content:**
- Data collection
- Data usage
- Data storage
- User rights
- Cookie policy
- Contact for privacy concerns

**Data Required:**
- Static content

---

# PART 2 - AUTHENTICATION

## Page 10: Register

**URL:** `/register`

**Purpose:** Create a new customer account.

**Form Fields:**
- Full Name *
- Email Address *
- Phone Number *
- Password *
- Confirm Password *
- [Create Account]

**Validation:**
- Email format validation
- Password minimum 8 characters
- Passwords must match
- Email uniqueness check (backend)
- Phone number format validation

**Actions:**
- Submit form → Create account, send verification email
- Success → Redirect to verification page or show verification message
- Error → Show validation errors
- Click "Don't have an account? Create one" → Navigate to `/register`
- Click "Forgot password?" → Navigate to `/forgot-password`

**Data Required:**
- User creation via backend (User table, Customer table)
- Email sending via Resend

**Post-Registration Flow:**
1. Account created
2. Verification email sent
3. Redirect to `/verify-email` or show inline verification
4. User cannot access protected features until verified

---

## Page 11: Email Verification

**URL:** `/verify-email/:token`

**Purpose:** Verify user's email address.

**Content:**
- "Verify your email"
- "We've sent a verification link to your email"
- [Verify] (if token in URL)
- [Resend Verification] (if no token or expired)

**Actions:**
- Click verification link in email → Navigate to `/verify-email/:token`
- Token valid → Mark email as verified, redirect to dashboard
- Token invalid/expired → Show error, offer resend
- Click [Resend] → Send new verification email

**Data Required:**
- Token validation via backend
- Email verification status update via backend

**Security:**
- Token expiration (e.g., 24 hours)
- Token single-use
- Rate limiting on resend

---

## Page 12: Login

**URL:** `/login`

**Purpose:** Authenticate existing users.

**Form Fields:**
- Email Address *
- Password *
- [Remember me] checkbox
- [Login]

**Actions:**
- Submit form → Authenticate via backend
- Success → Set JWT token, redirect to appropriate dashboard
- Customer → Redirect to `/dashboard`
- Admin → Redirect to `/admin`
- Error → Show error message
- Click "Forgot password?" → Navigate to `/forgot-password`
- Click "Don't have an account? Create one" → Navigate to `/register`

**Data Required:**
- Authentication via backend (auth.ts)
- JWT token generation
- User role determination

**Security:**
- Rate limiting on login attempts
- Account lockout after failed attempts (configurable)
- Secure token storage (httpOnly cookie or localStorage with precautions)

---

## Page 13: Forgot Password

**URL:** `/forgot-password`

**Purpose:** Initiate password reset.

**Form Fields:**
- Email Address *
- [Send Reset Link]

**Actions:**
- Submit form → Check if email exists, send reset email
- Success → Show "Check your email for reset link"
- Error → Show error (don't reveal if email exists for security)
- Click "Back to Login" → Navigate to `/login`

**Data Required:**
- Email lookup via backend
- Password reset email via Resend
- Reset token generation

**Security:**
- Don't reveal if email exists
- Token expiration (e.g., 1 hour)
- Rate limiting

---

## Page 14: Reset Password

**URL:** `/reset-password/:token`

**Purpose:** Complete password reset.

**Form Fields:**
- New Password *
- Confirm Password *
- [Reset Password]

**Validation:**
- Password minimum 8 characters
- Passwords must match
- Token validity check

**Actions:**
- Submit form → Validate token, update password
- Success → Redirect to `/login` with success message
- Error → Show error (invalid/expired token)
- Click "Resend Reset Link" → Send new reset email

**Data Required:**
- Token validation via backend
- Password update via backend
- Password hashing (bcrypt)

**Security:**
- Token expiration
- Token single-use
- Invalidate old tokens after reset

---

# PART 3 - CUSTOMER DASHBOARD

## Navigation Structure

**Customer Dashboard Navigation:**
- Dashboard
- Projects
- Notifications
- Profile
- [Logout]

**Mobile Navigation:** Hamburger menu with same options

---

## Page 15: Customer Dashboard Home

**URL:** `/dashboard`

**Purpose:** Provide overview of customer's account and projects.

**Header:**
- "Welcome, [Name]"
- "Good [morning/afternoon/evening]"

**Statistics Cards:**
- Projects: [Count]
- Active: [Count]
- Awaiting Your Review: [Count]
- Outstanding Balance: [Amount]

**Recent Projects:**
- List of last 5 projects
- Each project shows:
  - Project name
  - Status badge
  - Progress percentage (if in development)
  - Last updated

**Quick Actions:**
- [+ Start New Project] → Navigate to `/projects/new`
- [View All Projects] → Navigate to `/projects`
- [View Notifications] → Navigate to `/notifications`

**Recent Activity:**
- Last 5 activities across all projects
- Each activity shows:
  - Activity description
  - Project name
  - Time ago

**Actions:**
- Click project → Navigate to `/projects/:id`
- Click notification → Navigate to `/notifications`
- Click [Start New Project] → Navigate to `/projects/new`

**Data Required:**
- User profile via backend
- Project statistics via backend
- Recent projects via backend
- Recent activity via backend
- Outstanding balance via backend (sum of unpaid invoices)

**Permissions:**
- Customer only
- Can only see own projects

---

## Page 16: Projects List

**URL:** `/projects`

**Purpose:** List all customer projects.

**Header:**
- "My Projects"

**Filter Bar:**
- Status filter: [All] [Draft] [Submitted] [In Review] [In Development] [Completed]
- Search: [Search by project name]
- Sort: [Date] [Name] [Status]

**Project Cards/List:**
Each project shows:
- Project name
- Project ID (FX-XXXXX)
- Status badge
- Created date
- Last updated
- Progress indicator (if in development)
- Quick actions: [View] [Edit if draft]

**Empty State:**
- "No projects yet"
- [+ Start New Project] button

**Actions:**
- Click project → Navigate to `/projects/:id`
- Click [Edit] (if draft) → Navigate to `/projects/:id/edit`
- Click [+ Start New Project] → Navigate to `/projects/new`
- Apply filters → Update list
- Search → Filter list

**Data Required:**
- All projects for customer via backend
- Project statuses via backend
- Project progress via backend

**Permissions:**
- Customer only
- Can only see own projects

---

## Page 17: Notifications

**URL:** `/notifications`

**Purpose:** View all notifications for the customer.

**Header:**
- "Notifications"

**Filter Bar:**
- [All] [Unread] [Read]
- Type filter: [All] [Project] [Billing] [System]

**Notification List:**
Each notification shows:
- Type icon
- Title
- Message
- Time ago
- Read/unread indicator
- Quick action (if applicable, e.g., [View Preview])

**Notification Types:**
- Project update
- Scope approved
- Preview ready
- Change request quoted
- Invoice sent
- Payment received
- Source released
- System notifications

**Actions:**
- Click notification → Mark as read, navigate to related item
- Click [Mark all as read] → Mark all as read
- Apply filters → Update list

**Data Required:**
- Notifications for user via backend
- Notification read status via backend

**Permissions:**
- Customer only
- Can only see own notifications

---

## Page 18: Customer Profile

**URL:** `/profile`

**Purpose:** View and edit customer profile.

**Header:**
- "Profile"

**Profile Form:**
- Avatar (upload)
- Full Name *
- Email (read-only)
- Phone Number
- Company Name
- Address
- City
- State
- Country
- Timezone
- [Save Changes]

**Change Password Section:**
- Current Password *
- New Password *
- Confirm Password *
- [Change Password]

**Actions:**
- Submit profile form → Update profile via backend
- Submit password form → Change password via backend
- Upload avatar → Upload to Cloudinary, update profile

**Data Required:**
- User profile via backend
- Avatar upload via Cloudinary
- Password update via backend

**Permissions:**
- Customer only
- Can only edit own profile

---

# PART 4 - PROJECT CREATION

## Page 19: Choose Project Type

**URL:** `/projects/new`

**Purpose:** Select project type to begin creation.

**Header:**
- "Start a New Project"
- "What would you like to build?"

**Project Type Options:**
- ○ Website
- ○ Web Application
- ○ E-commerce
- ○ SaaS
- ○ Mobile Application
- ○ API / Backend
- ○ Custom Software

**Alternative:**
- [Not sure? Tell us what you need]

**Actions:**
- Select project type → Navigate to `/projects/new/plan-selection`
- Click [Not sure?] → Navigate to `/projects/new/custom` (skip type selection)

**Data Required:**
- None (selection only)

---

## Page 20: Plan Selection

**URL:** `/projects/new/plan-selection`

**Purpose:** Choose between predefined plan or custom project.

**Header:**
- "How would you like to start?"

**Options:**

**Option A: Choose a Ferixas Plan**
- Display plan cards (from Plans page)
- Each plan shows:
  - Plan name
  - Price
  - Features
  - Included revisions
  - [Choose Plan] button

**Option B: Request Custom Project**
- Description: For unique requirements
- [Request Custom Project] button

**Actions:**
- Click [Choose Plan] → Navigate to `/projects/new/plan/:planId` (pre-filled form)
- Click [Request Custom Project] → Navigate to `/projects/new/custom`

**Data Required:**
- Plans from backend (Plan table)

---

## Page 21: Custom Project Wizard (12 Steps)

**URL:** `/projects/new/custom`

**Purpose:** Submit detailed custom project requirements.

**Wizard Structure:**
- Progress indicator: Step X of 12
- [Back] [Next] navigation
- [Save Draft] button
- [Cancel] button

### Step 1: Basic Information
**Fields:**
- Project Name *
- Business/Company Name
- Project Description *
- What problem should this project solve?
- Who is it for?

### Step 2: Project Type
**Fields:**
- Project Type * (dropdown: Website, Web Application, E-commerce, SaaS, Mobile Application, API/Backend, Custom Software)
- Industry/Category
- Target Audience

### Step 3: Features
**Fields:**
Feature categories with checkboxes:

**Authentication:**
- ☐ Registration
- ☐ Login
- ☐ Social login
- ☐ 2FA
- ☐ Password reset

**User Management:**
- ☐ User profiles
- ☐ User dashboard
- ☐ Role-based access
- ☐ Admin panel

**Payments:**
- ☐ Paystack
- ☐ Flutterwave
- ☐ Stripe
- ☐ Wallet system
- ☐ Payment history

**E-commerce:**
- ☐ Products
- ☐ Categories
- ☐ Cart
- ☐ Checkout
- ☐ Orders
- ☐ Reviews
- ☐ Inventory

**Content Management:**
- ☐ Blog
- ☐ Pages
- ☐ Media library
- ☐ Rich text editor

**Social Features:**
- ☐ Comments
- ☐ Ratings
- ☐ Social sharing
- ☐ Follow/subscribe

**Analytics:**
- ☐ User analytics
- ☐ Traffic analytics
- ☐ Conversion tracking

**Other Features:**
- [Add custom feature]

Each feature can have priority: [Low] [Medium] [High]

### Step 4: Pages/Screens
**Fields:**
**Required Pages:**
- ☑ Homepage
- ☑ Login
- ☑ Register
- ☑ Dashboard
- ☑ Contact

**Additional Pages:**
- [Add page]
- Page name
- Page description

### Step 5: Branding
**Fields:**
- Logo upload
- Primary color (color picker)
- Secondary color (color picker)
- Accent color (color picker)
- Preferred font (dropdown)
- Brand guidelines upload (PDF)

### Step 6: Design References
**Fields:**
- Upload screenshot
- Upload design file
- Upload PDF
- Paste website URL
- "Tell us what you like about this reference"

### Step 7: Content and Assets
**Fields:**
- Upload Images
- Upload Videos
- Upload PDFs
- Upload Product information
- Upload Documents
- Upload Other files

### Step 8: Technical Requirements
**Fields:**
- Do you have a preferred technology?
  - ○ No preference
  - ○ Yes
- Preferred technology: [text input]
- Integrations:
  - ☐ Payment gateway
  - ☐ SMS
  - ☐ WhatsApp
  - ☐ Email
  - ☐ Maps
  - ☐ AI
  - ☐ Other API (specify)

### Step 9: Domain and Deployment
**Fields:**
- Do you have a domain?
  - ○ Yes
  - ○ No
- Domain: [text input]
- Do you want Ferixas to manage deployment?
  - ○ Yes
  - ○ No
  - ○ Decide later

### Step 10: Timeline
**Fields:**
- Preferred timeline: [text input]
- Deadline (if any): [date picker]
- Urgency: [Low] [Medium] [High]

### Step 11: Budget
**Fields:**
- Budget range: [dropdown]
- Currency: [NGN] [USD] [EUR]
- Additional notes about budget

### Step 12: Review & Submit
**Fields:**
- Project summary display:
  - Project name
  - Type
  - Features count
  - Pages count
  - Assets count
- [Edit] button for each section
- Checkbox: "I confirm that the information provided accurately represents what I want built"
- [Submit Project] button

**Actions:**
- Navigate between steps via [Back] [Next]
- [Save Draft] → Save to database as draft
- [Cancel] → Confirm, then redirect to `/projects`
- [Submit Project] → Create ProjectRequest, redirect to success page

**Data Required:**
- All form data via backend
- File uploads via Cloudinary
- Draft saving via backend (ProjectRequest table)

**Validation:**
- Required fields per step
- File size limits
- File type validation

---

## Page 22: Project Submission Success

**URL:** `/projects/new/success`

**Purpose:** Confirm successful project submission.

**Content:**
- "Project submitted successfully"
- Project ID: FX-2026-XXXXX
- Status: Under Review
- "We'll review your requirements and prepare your project scope"
- [View Project] button
- [Back to Projects] button

**Actions:**
- Click [View Project] → Navigate to `/projects/:id`
- Click [Back to Projects] → Navigate to `/projects`

**Data Required:**
- Created project request ID via backend

---

# PART 5 - CUSTOMER PROJECT WORKSPACE

## Navigation Structure

**Project Workspace Navigation:**
- Overview
- Requirements
- Scope & Pricing
- Milestones
- Preview
- Changes
- Messages
- Files
- Billing
- Activity
- Delivery (when available)

---

## Page 23: Project Overview

**URL:** `/projects/:id`

**Purpose:** Provide overview of project status and next actions.

**Header:**
- Project Name
- Project ID (FX-XXXXX)
- Status badge
- Last updated

**Quick Actions Dropdown:**
- [View Scope]
- [View Change Requests]
- [View Previews]
- [View Billing]
- [Contact Support]

**Project Statistics:**
- Original Price: [Amount]
- Additional Work: [Amount]
- Current Total: [Amount]
- Outstanding Balance: [Amount]
- Revision Rounds Used: [X] of [Y]

**Timeline/Status:**
- Visual status indicator:
  - ✓ Requirements
  - ✓ Planning
  - ● Development (current)
  - ○ Preview
  - ○ Final Review
  - ○ Delivery

**Progress:**
- Progress percentage: [X]%
- Current version: Preview vX.X

**Next Action:**
- Based on current status:
  - If awaiting scope approval: [Review Scope]
  - If preview ready: [Review Preview vX.X]
  - If awaiting payment: [Pay Outstanding Balance]
  - If awaiting final approval: [Review Final Preview]

**Recent Activity:**
- Last 10 project events

**Actions:**
- Click next action → Navigate to appropriate section
- Click navigation tabs → Navigate to respective sections

**Data Required:**
- Project details via backend
- Project status via backend
- Project pricing via backend
- Project timeline via backend
- Recent activity via backend

**Permissions:**
- Customer only
- Can only view own projects

---

## Page 24: Requirements

**URL:** `/projects/:id/requirements`

**Purpose:** View submitted project requirements.

**Header:**
- "Project Requirements"

**Sections:**

**Basic Information:**
- Project name
- Project type
- Description
- Problem statement
- Target audience

**Features:**
- List of requested features
- Feature categories
- Priority levels

**Pages:**
- List of requested pages
- Page descriptions

**Branding:**
- Logo (display)
- Colors
- Typography
- Brand guidelines (download link)

**Design References:**
- Uploaded references
- Reference URLs
- Notes

**Content & Assets:**
- List of uploaded assets
- Download links

**Technical Requirements:**
- Technology preferences
- Integrations

**Domain & Deployment:**
- Domain status
- Deployment preference

**Status Indicator:**
- If scope approved: "Requirements locked"
- If scope not approved: [Edit Requirements] button

**Actions:**
- Click [Edit Requirements] (if not approved) → Navigate to edit wizard
- Download assets → Download from Cloudinary

**Data Required:**
- Project request details via backend
- Assets via backend

**Permissions:**
- Customer only
- Can edit only if scope not approved

---

## Page 25: Scope & Pricing

**URL:** `/projects/:id/scope`

**Purpose:** View approved project scope and pricing.

**Header:**
- "Project Scope"
- Scope Status badge (Draft, Sent, Approved, Locked)

**Pricing Section:**
- Original Project Price: [Amount]
- Currency: [NGN/USD/EUR]
- Payment Terms: [Final Payment / Milestone Payments]

**Timeline Section:**
- Estimated Duration: [X] weeks
- Start Date: [Date]
- Estimated Completion: [Date]

**Revision Allowance:**
- Included Revision Rounds: [X]
- Revision Definition: [Text explaining what constitutes a round]
- Additional Revision Cost: [Amount]

**Included Features:**
- Expandable list by category
- Each feature shows:
  - Feature name
  - Description
  - Sub-items (if any)

**Excluded Features:**
- List of explicitly excluded features
- Each exclusion shows:
  - Feature name
  - Reason for exclusion

**Terms & Conditions:**
- Display project terms

**Actions (based on status):**
- If Draft/Sent (admin only): [Edit Scope]
- If Sent: [Approve Project] [Request Clarification] [Decline]
- If Approved/Locked: View only

**Customer Actions:**
- [Approve Project] → Approve scope, lock it, start development
- [Request Clarification] → Open message thread with admin
- [Decline] → Cancel project with reason

**Data Required:**
- Scope details via backend
- Scope features via backend
- Scope exclusions via backend
- Project pricing via backend

**Permissions:**
- Customer: Can view, approve (if sent)
- Admin: Can create, edit, send

---

## Page 26: Milestones

**URL:** `/projects/:id/milestones`

**Purpose:** View project milestones and timeline.

**Header:**
- "Project Milestones"

**Timeline View:**
- Visual timeline of milestones
- Current milestone highlighted
- Completed milestones marked
- Upcoming milestones shown

**Milestone List:**
Each milestone shows:
- Milestone name
- Description
- Due date
- Status (Not Started, In Progress, Completed, Overdue)
- Progress bar

**Actions:**
- View only for customer
- Admin can edit milestones

**Data Required:**
- Milestones via backend
- Milestone statuses via backend

**Permissions:**
- Customer: View only
- Admin: Edit

---

## Page 27: Preview

**URL:** `/projects/:id/preview`

**Purpose:** View and access preview versions.

**Header:**
- "Preview Versions"

**Preview List:**
Each preview shows:
- Version number (v0.1, v0.2, etc.)
- Release date
- Status badge (Pending Review, Approved, Changes Requested)
- Changes summary
- Review status
- Expiration time
- [Open Preview] button (if available)
- [View Details] button

**Current Version:**
- Highlight latest version
- [Open Latest Preview] button

**Empty State:**
- "No previews available yet"
- "Previews will appear here when development releases them"

**Actions:**
- Click [Open Preview] → Open preview in new tab with protection
- Click [View Details] → Show preview details modal

**Preview Details Modal:**
- Version number
- Release notes
- Changes list
- Known issues
- Expiration time

**Data Required:**
- Preview versions via backend
- Preview URLs via backend
- Preview access tokens via backend

**Permissions:**
- Customer only
- Can only access own project previews

---

## Page 28: Preview Viewer

**URL:** `/projects/:id/preview/:previewId`

**Purpose:** View preview with protection.

**Header:**
- Version number
- Release date
- Expiration countdown

**Preview Frame:**
- Iframe displaying preview URL
- Watermark overlay
- No screenshot protection
- No copy protection
- No right-click
- No keyboard shortcuts

**Review Actions:**
- [Approve This Version]
- [Request Changes]

**Change Request Form (if requesting changes):**
- Description *
- Category: [Design] [Functionality] [Content] [Bug] [Other]
- Attachments
- Priority: [Low] [Medium] [High]
- [Submit Request]

**Actions:**
- [Approve] → Mark preview as approved
- [Request Changes] → Create change request

**Data Required:**
- Preview details via backend
- Preview URL with access token via backend

**Security:**
- Token-based access
- URL expiration
- Client-side protections (no screenshot, no copy, etc.)

---

## Page 29: Change Requests

**URL:** `/projects/:id/change-requests`

**Purpose:** View and manage change requests.

**Header:**
- "Change Requests"

**Filter Bar:**
- Status filter: [All] [Pending] [Quoted] [Approved] [Rejected] [Completed]

**Change Request List:**
Each CR shows:
- CR number (CR-XXX)
- Title
- Description
- Status badge
- Priority badge
- Additional cost (if quoted)
- Additional time (if quoted)
- Created date
- [View Details] button

**Summary Card:**
- Total Additional Cost: [Amount]
- Total Additional Time: [X] days
- Approved: [X]
- Pending: [X]

**[New Change Request] button**

**Actions:**
- Click [New Change Request] → Navigate to `/projects/:id/change-requests/new`
- Click [View Details] → Navigate to `/projects/:id/change-requests/:crId`

**Data Required:**
- Change requests via backend
- CR statuses via backend
- CR costs via backend

**Permissions:**
- Customer: View, create
- Admin: View, evaluate, approve

---

## Page 30: New Change Request

**URL:** `/projects/:id/change-requests/new`

**Purpose:** Submit new change request.

**Header:**
- "Request Change"

**Form Fields:**
- Title *
- Description *
- Category: [Design] [Functionality] [Content] [Bug] [Other]
- Attachments (upload)
- Priority: [Low] [Medium] [High]
- [Submit Request]
- [Cancel]

**Validation:**
- Title required
- Description required
- At least one attachment recommended

**Actions:**
- Submit → Create change request, redirect to CR list
- Cancel → Return to CR list

**Data Required:**
- CR creation via backend
- Attachment upload via Cloudinary

**Permissions:**
- Customer only

---

## Page 31: Change Request Details

**URL:** `/projects/:id/change-requests/:crId`

**Purpose:** View change request details and evaluation.

**Header:**
- CR number
- Title
- Status badge
- Created date

**CR Details:**
- Description
- Attachments list
- Priority
- Category

**Admin Evaluation (if completed):**
- Classification: [Included in Scope] [Revision] [Additional Feature]
- Additional Cost: [Amount] (if applicable)
- Additional Time: [X] days (if applicable)
- Admin Notes
- Evaluation Date

**Approval Section (if pending approval):**
- Cost Summary
- Timeline Impact
- New Project Total: [Amount]
- [Approve] button
- [Decline] button

**History:**
- Status changes
- Messages exchanged

**Actions:**
- [Approve] → Approve CR, update project total
- [Decline] → Decline CR with reason
- Add message to CR

**Data Required:**
- CR details via backend
- Admin evaluation via backend
- Project current total via backend

**Permissions:**
- Customer: View, approve (if quoted)
- Admin: View, evaluate

---

## Page 32: Messages

**URL:** `/projects/:id/messages`

**Purpose:** Project-specific communication.

**Header:**
- "Project Messages"
- Customer name

**Message Thread:**
- Messages from both admin and customer
- Each message shows:
  - Sender name
  - Sender role (Customer/Admin)
  - Timestamp
  - Message content
  - Attachments (if any)
  - Read/unread indicator

**Message Composer:**
- Text area
- Attachment upload
- [Send] button

**Filter Bar:**
- [All Messages] [Unread Only] [From Customer] [From Admin]

**Actions:**
- Send message → Add to thread
- Upload attachment → Upload to Cloudinary
- Mark as read → Update read status

**Data Required:**
- Messages via backend
- Message attachments via backend

**Permissions:**
- Customer: Send, view own
- Admin: Send, view all

---

## Page 33: Files

**URL:** `/projects/:id/files`

**Purpose:** View and manage project files.

**Header:**
- "Project Files"

**Filter Bar:**
- Type filter: [All] [Images] [Documents] [Logos] [Other]

**File Grid/List:**
Each file shows:
- Filename
- File type
- File size
- Upload date
- Uploader
- [Download] button
- [Delete] button (if uploader)

**[Upload File] button**

**Storage Usage:**
- Total storage used
- Storage by type

**Actions:**
- Upload file → Upload to Cloudinary
- Download file → Download from Cloudinary
- Delete file → Delete from Cloudinary and database

**Data Required:**
- Files via backend
- File metadata via backend

**Permissions:**
- Customer: Upload, download, delete own uploads
- Admin: Upload, download, delete all

---

## Page 34: Billing

**URL:** `/projects/:id/billing`

**Purpose:** View billing history and current balance.

**Header:**
- "Project Billing"

**Billing Summary Card:**
- Original Project Price: [Amount]
- Additional Work Total: [Amount]
- Project Total: [Amount]
- Amount Paid: [Amount]
- Outstanding Balance: [Amount]

**Invoice List:**
Each invoice shows:
- Invoice number
- Invoice date
- Amount
- Status badge (Paid, Pending, Overdue)
- [View] button
- [Pay] button (if unpaid)

**Payment History:**
Each payment shows:
- Payment date
- Amount
- Payment method
- Reference number

**[Pay Outstanding Balance] button** (if balance > 0)

**Actions:**
- Click [View Invoice] → Navigate to `/projects/:id/invoices/:invoiceId`
- Click [Pay] → Navigate to payment flow
- Click [Pay Outstanding Balance] → Navigate to payment flow

**Data Required:**
- Invoices via backend
- Payments via backend
- Project totals via backend

**Permissions:**
- Customer: View, pay
- Admin: View, manage

---

## Page 35: Invoice Details

**URL:** `/projects/:id/invoices/:invoiceId`

**Purpose:** View invoice details and pay.

**Header:**
- Invoice number
- Invoice date
- Due date
- Status badge

**Invoice Details:**
- Bill to (customer info)
- Project reference

**Line Items:**
Each item shows:
- Description
- Quantity
- Unit price
- Total

**Subtotal:**
- Amount

**Tax (if applicable):**
- Amount

**Total:**
- Amount

**Payment Status:**
- Amount Paid: [Amount]
- Outstanding Balance: [Amount]

**Actions:**
- [Pay Now] button (if unpaid)
- [Download PDF] button
- [Print] button

**Payment Flow:**
- Click [Pay Now] → Open payment modal
- Select payment method
- Complete payment via Paystack
- Verify payment
- Update invoice status

**Data Required:**
- Invoice details via backend
- Invoice line items via backend
- Payment status via backend

**Permissions:**
- Customer: View, pay
- Admin: View, manage

---

## Page 36: Activity

**URL:** `/projects/:id/activity`

**Purpose:** View complete project activity log.

**Header:**
- "Project Activity"

**Filter Bar:**
- Date range
- Action type filter
- Actor filter (Customer/Admin)

**Activity Log:**
Each activity shows:
- Timestamp
- Actor (Customer/Admin)
- Action
- Details
- IP address (for security)

**Activity Types:**
- Project created
- Requirements submitted
- Requirements reviewed
- Scope created
- Scope approved
- Development started
- Preview vX.X released
- Change request submitted
- Change request evaluated
- Change request approved
- Additional cost added
- Preview vX.X approved
- Final approval
- Invoice created
- Payment received
- Source code released

**Actions:**
- Apply filters → Update log
- Export log → Download CSV

**Data Required:**
- Activity log via backend

**Permissions:**
- Customer: View
- Admin: View

---

## Page 37: Delivery

**URL:** `/projects/:id/delivery`

**Purpose:** Download source code and documentation (after payment).

**Header:**
- "Project Delivery"

**Delivery Status:**
- ✓ Final approval
- ✓ Payment
- ✓ Build completed

**Source Code Section:**
- Release date
- Package contents (list of files/folders)
- Package size
- Expiration time (24 hours from first download)
- Download count (X of Y allowed)
- [Download] button (if payment complete and final approval received)

**Source Code Protection Details:**
- Source code is encrypted before packaging
- Download URL is token-based and expires after 24 hours
- Maximum 3 download attempts per release
- Each download is logged with IP address and timestamp
- Package is password-protected (password provided after download)
- Source code contains watermarks for traceability

**Documentation Section:**
- Setup guide (how to run the project locally)
- Deployment guide (how to deploy to hosting)
- Environment variables guide
- Database setup guide
- API documentation (if applicable)
- Admin credentials (initial)
- [Download] buttons for each document

**Access Requirements:**
- Payment must be 100% complete
- Final approval must be received
- Project status must be COMPLETED

**Download Flow:**
1. Customer clicks [Download Source]
2. System verifies payment status and final approval
3. System generates one-time download token
4. System creates encrypted package (if not already created)
5. Customer receives download link
6. Customer downloads package
7. Customer receives password via separate email
8. Download token expires after 24 hours
9. After 3 downloads or 24 hours, link expires

**Actions:**
- [Download Source] → Generate download token, initiate download
- [Download Documentation] → Download documentation files
- [Request New Download Link] → Generate new token (if expired)

**Data Required:**
- Source release details via backend
- Payment status via backend
- Final approval status via backend
- Download tracking via backend

**Permissions:**
- Customer only
- Only accessible after payment and final approval
- Download attempts limited

**Security:**
- Source code encrypted with AES-256
- Download token expires after 24 hours
- Maximum 3 download attempts
- Each download logged (IP, timestamp, user agent)
- Password protection on package
- Watermarking in source code
- Package integrity verification (checksum)

---

# PART 6 - ADMIN PORTAL

## Navigation Structure

**Admin Dashboard Navigation:**
- Dashboard
- Projects
- Project Requests
- Customers
- Change Requests
- Invoices
- Payments
- Files
- Notifications
- Activity Logs
- Settings
- [Logout]

---

## Page 38: Admin Login

**URL:** `/admin/login`

**Purpose:** Authenticate admin users.

**Form Fields:**
- Email Address *
- Password *
- [Remember me] checkbox
- [Login]

**2FA (if enabled):**
- Enter 2FA code
- [Verify]

**Actions:**
- Submit form → Authenticate via backend
- Success → Set JWT token, redirect to `/admin`
- Error → Show error message
- Click "Forgot password?" → Navigate to `/admin/forgot-password`

**Data Required:**
- Authentication via backend
- 2FA verification via backend

**Security:**
- Rate limiting
- Account lockout
- 2FA support

---

## Page 39: Admin Dashboard

**URL:** `/admin`

**Purpose:** Admin overview dashboard.

**Header:**
- "Admin Dashboard"

**Quick Stats Cards:**
- Total Projects: [Count]
- Active Projects: [Count]
- Pending Requests: [Count]
- Pending Change Requests: [Count]
- Unpaid Invoices: [Count]
- Total Revenue (Month): [Amount]
- Total Revenue (All Time): [Amount]

**Recent Activity Feed:**
- Last 20 platform events

**Project Status Breakdown:**
- Chart showing projects by status

**Revenue Chart:**
- Monthly revenue trend

**Quick Actions:**
- [Review Requests]
- [View Pending CRs]
- [View Unpaid Invoices]

**Upcoming Deadlines:**
- Projects due soon
- Milestones due soon

**Data Required:**
- Project statistics via backend
- Revenue statistics via backend
- Recent activity via backend
- Project status distribution via backend
- Upcoming deadlines via backend

**Permissions:**
- Admin only

---

## Page 40: Admin Projects List

**URL:** `/admin/projects`

**Purpose:** List all projects.

**Header:**
- "All Projects"

**Filter Bar:**
- Status filter
- Customer filter
- Date range filter
- Search by project name/ID
- Sort by (Date, Name, Status, Value)

**Project Table:**
Each project shows:
- Project ID (FX-XXXXX)
- Project name
- Customer name
- Status badge
- Project value
- Created date
- Last updated
- Progress indicator
- [View] button

**Pagination**
**Export button** (CSV, Excel)

**Actions:**
- Click [View] → Navigate to `/admin/projects/:id`
- Apply filters → Update list
- Export → Download CSV/Excel

**Data Required:**
- All projects via backend
- Project customers via backend
- Project values via backend

**Permissions:**
- Admin only

---

## Page 41: Admin Project Detail

**URL:** `/admin/projects/:id`

**Purpose:** Manage project from admin side.

**Header:**
- Project name
- Project ID
- Customer name (clickable)
- Status badge
- Project value
- Created date
- Last updated

**Quick Actions Dropdown:**
- [Edit Project]
- [View Scope]
- [Manage Features]
- [Manage Milestones]
- [View Change Requests]
- [View Previews]
- [View Billing]
- [View Messages]
- [View Activity]
- [Delete Project] (with confirmation)

**Tabs/Sections:**
- Overview
- Scope
- Features
- Milestones
- Change Requests
- Previews
- Messages
- Billing
- Files
- Activity
- Settings

**Each section contains detailed management interface.**

**Data Required:**
- Project details via backend
- All related data via backend

**Permissions:**
- Admin only

---

## Page 42: Admin Scope Management

**URL:** `/admin/projects/:id/scope`

**Purpose:** Create and edit project scope.

**Header:**
- "Project Scope"
- Scope Status badge

**Pricing Section:**
- Original Project Price input
- Currency selector
- Payment Terms dropdown

**Timeline Section:**
- Estimated Duration input
- Start Date picker
- Estimated Completion Date

**Revision Allowance Section:**
- Number of Rounds input
- Round Definition help text
- Additional Revision Cost input

**Included Features Section:**
- Feature categories (expandable)
- [Add Feature] button
- Feature items with edit/delete
- Drag to reorder

**Excluded Features Section:**
- [Add Exclusion] button
- Exclusion items with edit/delete

**Terms and Conditions:**
- Text editor for custom terms

**Action Buttons:**
- [Save Draft]
- [Send to Customer]
- [Edit] (if approved - requires unlock)
- [Lock Scope] (if approved)

**Actions:**
- Create scope
- Edit scope (if not locked)
- Send scope to customer
- Lock scope (after customer approval)
- Unlock scope (admin override with reason)

**Data Required:**
- Scope details via backend
- Scope features via backend
- Scope exclusions via backend

**Permissions:**
- Admin only

---

## Page 43: Admin Change Request Evaluation

**URL:** `/admin/change-requests/:crId`

**Purpose:** Evaluate change request against scope.

**Header:**
- CR number
- Project name
- Customer name
- Title
- Status badge
- Priority badge

**CR Details:**
- Description
- Category
- Attachments
- Customer notes

**Scope Evaluation Section:**
- Classification radio buttons:
  - ○ Included in Scope
  - ○ Revision (within scope)
  - ○ Additional Feature (outside scope)
- Evaluation notes
- Reference to scope items

**Cost Estimation Section (if additional feature):**
- Additional Cost input
- Currency
- Cost breakdown
- Reasoning

**Timeline Estimation Section (if applicable):**
- Additional Days input
- Impact on Delivery Date

**Admin Notes:**
- Internal notes
- Discussion points

**Action Buttons:**
- [Save Evaluation]
- [Send Quote to Customer]
- [Mark as Included] (no charge)
- [Reject CR] (with reason)

**Actions:**
- Evaluate CR against scope
- Quote additional cost
- Send quote to customer
- Mark as included
- Reject CR

**Data Required:**
- CR details via backend
- Project scope via backend
- Project features via backend

**Permissions:**
- Admin only

---

## Page 44: Admin Billing Management

**URL:** `/admin/billing`

**Purpose:** Manage invoices and payments.

**Header:**
- "Billing Management"

**Invoice List:**
Each invoice shows:
- Invoice number
- Project name
- Customer name
- Invoice date
- Due date
- Amount
- Status badge
- [View] [Send] [Mark Paid] buttons

**[Create Invoice] button**

**Payment List:**
Each payment shows:
- Payment ID
- Invoice number
- Amount
- Payment method
- Status badge
- [View] [Refund] buttons

**Summary Cards:**
- Total Invoices (Month)
- Outstanding Amount
- Overdue Amount
- Paid Amount (Month)

**Actions:**
- [Create Invoice] → Navigate to invoice creation
- [View Invoice] → View invoice details
- [Send Invoice] → Send to customer
- [Mark Paid] → Mark as paid
- [Refund] → Process refund

**Data Required:**
- Invoices via backend
- Payments via backend

**Permissions:**
- Admin only

---

## Page 45: Admin Settings

**URL:** `/admin/settings`

**Purpose:** Platform settings configuration.

**Tabs/Sections:**

**General Settings:**
- Platform name
- Platform URL
- Default currency
- Timezone
- Date format

**Plan Settings:**
- Manage predefined plans
- Add/edit plan
- Plan name, price, features, description

**Payment Settings:**
- Payment gateway configuration
- Paystack API keys
- Payment terms
- Late payment fees

**Email Settings:**
- SMTP configuration
- Email templates
- Welcome email
- Verification email
- Invoice email
- Payment confirmation
- Password reset

**Notification Settings:**
- Email notification preferences
- Push notification preferences (Firebase)
- SMS notifications (future)

**Security Settings:**
- Password requirements
- Session timeout
- 2FA requirements
- IP whitelist (if applicable)

**Integration Settings:**
- Cloudinary configuration
- Cloudflare configuration
- Firebase configuration
- Resend configuration

**Backup Settings:**
- Database backup schedule
- File backup schedule
- Backup retention

**Audit Settings:**
- Audit log retention
- Activity logging level

**Actions:**
- Update settings
- Test email configuration
- Test payment gateway
- Configure integrations

**Data Required:**
- Platform settings via backend
- Integration configurations via backend

**Permissions:**
- Super Admin only (some settings)

---

# PART 7 - SECURITY & PERMISSIONS

## Security Model

### Authentication
- JWT tokens with expiration
- Refresh token mechanism
- Secure token storage
- Password hashing (bcrypt)
- 2FA support for admins

### Authorization
- Role-based access control (Customer, Admin)
- Customer can only access own projects
- Admin access based on permissions
- Sensitive actions require specific permissions

### Data Protection
- Files are private
- Source code is private
- Preview access is controlled
- Payment status verified server-side
- Download permission checked server-side

### API Security
- All endpoints require authorization
- Rate limiting
- Input validation
- SQL injection prevention (Prisma)
- XSS protection
- CSRF protection

### Audit Logging
- All sensitive actions logged
- IP address tracking
- User agent tracking
- Timestamp tracking

### Secrets Management
- Secrets never in frontend code
- Database credentials never to customers
- API keys in environment variables
- Encrypted storage for sensitive data

## Permissions Matrix

| Action | Customer | Admin | Super Admin |
|--------|----------|-------|-------------|
| View own projects | ✓ | ✓ | ✓ |
| View all projects | ✗ | ✓ | ✓ |
| Create projects | ✓ | ✓ | ✓ |
| Edit own projects (draft) | ✓ | ✓ | ✓ |
| Edit any project | ✗ | ✓ | ✓ |
| Delete projects | ✗ | ✓ | ✓ |
| View scope | ✓ (own) | ✓ | ✓ |
| Create scope | ✗ | ✓ | ✓ |
| Approve scope | ✓ (own) | ✗ | ✗ |
| Send scope | ✗ | ✓ | ✓ |
| Create change requests | ✓ (own) | ✓ | ✓ |
| Evaluate change requests | ✗ | ✓ | ✓ |
| Approve change requests | ✓ (own) | ✗ | ✗ |
| View billing | ✓ (own) | ✓ | ✓ |
| Create invoices | ✗ | ✓ | ✓ |
| Process payments | ✓ (own) | ✓ | ✓ |
| View previews | ✓ (own) | ✓ | ✓ |
| Create previews | ✗ | ✓ | ✓ |
| Release source code | ✗ | ✓ | ✓ |
| Download source code | ✓ (own, after payment) | ✓ | ✓ |
| View activity logs | ✓ (own) | ✓ | ✓ |
| View all activity logs | ✗ | ✓ | ✓ |
| Manage customers | ✗ | ✓ | ✓ |
| Manage plans | ✗ | ✗ | ✓ |
| Platform settings | ✗ | ✗ | ✓ |

---

# PART 8 - PROJECT STATUSES

## Status Flow

```
DRAFT → SUBMITTED → IN_REVIEW → SCOPE_PENDING → IN_DEVELOPMENT → INTERNAL_QA → PREVIEW → CUSTOMER_REVIEW → REVISION → FINAL_REVIEW → COMPLETED
```

**Status Definitions:**

- **DRAFT**: Project request saved as draft, not submitted
- **SUBMITTED**: Project request submitted, awaiting admin review
- **IN_REVIEW**: Admin reviewing project request
- **SCOPE_PENDING**: Scope created, awaiting customer approval
- **IN_DEVELOPMENT**: Development in progress
- **INTERNAL_QA**: Internal quality assurance
- **PREVIEW**: Preview released, awaiting customer review
- **CUSTOMER_REVIEW**: Customer reviewing preview
- **REVISION**: Changes being implemented
- **FINAL_REVIEW**: Final preview awaiting approval
- **COMPLETED**: Project completed and delivered

**Status-Specific Actions:**

- DRAFT: Edit, Submit
- SUBMITTED: View, Cancel
- IN_REVIEW: View (admin: Approve, Reject, Request Clarification)
- SCOPE_PENDING: View, Approve Scope (customer)
- IN_DEVELOPMENT: View progress
- PREVIEW: Review Preview
- CUSTOMER_REVIEW: Approve, Request Changes
- REVISION: View progress
- FINAL_REVIEW: Approve Final, Request Final Changes
- COMPLETED: View, Download Source

---

# PART 9 - NOTIFICATION TYPES

## Customer Notifications

- **PROJECT_UPDATE**: General project update
- **SCOPE_APPROVED**: Scope approved by customer
- **SCOPE_SENT**: Scope sent for approval
- **PREVIEW_READY**: New preview available for review
- **CHANGE_REQUEST_QUOTED**: Change request has been quoted
- **CHANGE_REQUEST_APPROVED**: Change request approved
- **INVOICE_SENT**: New invoice created
- **PAYMENT_RECEIVED**: Payment successfully processed
- **SOURCE_RELEASED**: Source code available for download
- **MESSAGE_RECEIVED**: New message in project
- **SYSTEM**: System notifications

## Admin Notifications

- **NEW_PROJECT_REQUEST**: New project request submitted
- **SCOPE_APPROVED**: Customer approved scope
- **NEW_CHANGE_REQUEST**: New change request submitted
- **PAYMENT_RECEIVED**: Customer made payment
- **FINAL_APPROVAL**: Customer approved final version
- **SYSTEM**: System notifications

---

# PART 10 - BUSINESS RULES

## Scope Protection Rule

> No work outside the approved scope should enter development until the customer has been informed of the additional cost and approved it.

**Implementation:**
- Scope locked after customer approval
- Any change request evaluated against scope
- Additional features quoted before work
- Customer must approve additional cost
- Project total updated only after approval

## Delivery Protection Rule

> Final source code, production credentials, and final handover remain locked until all required payments have been successfully completed.

**Implementation:**
- Source code release table tracks releases
- Download requires payment verification
- Download links are time-limited
- Source code encrypted
- Production credentials never shared before payment

## Revision Protection Rule

> Changes within the agreed scope are handled according to the project's included revision allowance. New functionality or work outside the approved scope becomes an additional charge.

**Implementation:**
- Revision allowance defined in scope
- Revision rounds tracked
- Changes classified as:
  - Included in scope (no charge)
  - Revision within allowance (no charge if allowance not exceeded)
  - Additional feature (charged)
- Additional revision cost defined in scope

## Transparency Rule

> Every scope change, price change, approval, message, preview, payment, and delivery event is recorded in project history.

**Implementation:**
- Activity log table records all events
- Events include: actor, action, resource, details, timestamp
- Activity log viewable by customer and admin
- Activity log exportable

---

# PART 11 - MVP SCOPE

**IMPORTANT: The MVP is focused on the core development and delivery workflow. Hosting, database management, domain management, and infrastructure services are Phase 2 (future).**

### MVP Core Flow

**User Journey:**
1. User submits project requirements (wizard)
2. Ferixas reviews and creates scope with pricing
3. User approves scope
4. Ferixas builds the project
5. Ferixas releases protected previews
6. User reviews previews
7. User requests changes (change requests)
8. Ferixas evaluates changes against scope
9. User approves additional costs (if outside scope)
10. Ferixas implements changes
11. Cycle continues until final approval
12. User approves final version
13. User pays final invoice
14. User downloads protected source code
15. User deploys on their own hosting (MVP)

**What MVP DOES NOT include (Phase 2):**
- ❌ Hosting management by Ferixas
- ❌ Database management by Ferixas
- ❌ Domain management by Ferixas
- ❌ DNS configuration by Ferixas
- ❌ SSL management by Ferixas
- ❌ Server provisioning by Ferixas
- ❌ Production deployment by Ferixas
- ❌ Environment variable management by Ferixas
- ❌ CI/CD by Ferixas
- ❌ Git integration
- ❌ Developer collaboration
- ❌ Subscriptions
- ❌ Maintenance plans

**MVP Focus:**
- ✓ Project submission and requirements gathering
- ✓ Scope creation and approval
- ✓ Development tracking
- ✓ Protected preview system
- ✓ Change request and evaluation
- ✓ Billing and payment
- ✓ Source code delivery with protection
- ✓ User can deploy on their own hosting after receiving source code

### Customer MVP

**Public Website:**
- Landing page
- Services
- Plans
- How It Works
- FAQ
- Contact
- Terms
- Privacy

**Authentication:**
- Register
- Login
- Email verification
- Forgot password
- Reset password

**Dashboard:**
- Overview
- Projects list
- Notifications
- Profile

**Project Management:**
- Create project (12-step wizard)
- Project overview
- Requirements view
- Scope view (read-only for customer)
- Milestones view (read-only for customer)
- Preview access (protected)
- Change requests (create, view, approve)
- Messages
- Files (upload, download)
- Billing (view invoices, pay)
- Activity (view log)
- Delivery (download protected source code after payment)

### Admin MVP

**Authentication:**
- Admin login
- 2FA (optional for MVP)

**Dashboard:**
- Overview statistics
- Recent activity
- Quick actions

**Project Management:**
- Projects list
- Project detail
- Project requests review
- Scope creation (define features, exclusions, pricing, timeline)
- Feature management
- Milestone management
- Preview creation and management
- Change request evaluation (classify as included/revision/additional)
- Messages
- Billing management (create invoices, view payments)
- Files management
- Activity logs

**Platform Management:**
- Customers list
- Notifications
- Settings (basic - plans, email templates, payment gateway)

### Phase 2 - Hosting & Infrastructure (Future - NOT MVP)

**Customer Features:**
- Request Ferixas hosting
- Request domain management
- Request database management
- View production deployment status
- View server health
- View backup status
- Request SSL certificates
- Manage environment variables

**Admin Features:**
- Provision servers
- Configure DNS
- Manage SSL certificates
- Set up databases
- Configure backups
- Monitor server health
- Deploy to production
- Manage CI/CD pipelines
- Environment variable management

### Phase 3 - Advanced Features (Future - NOT MVP)

**Customer Features:**
- Git repository access
- Branch management
- Collaboration tools
- Subscription management
- Maintenance plan management
- Automated deployment requests

**Admin Features:**
- Git integration
- Developer collaboration tools
- Subscription management
- Maintenance plan management
- Advanced infrastructure
- Automated deployments

---

# PART 12 - DATA VALIDATION RULES

## Form Validation

**Registration:**
- Email: Valid email format, unique
- Password: Minimum 8 characters
- Phone: Valid phone format
- Name: Required

**Project Creation:**
- Project name: Required, max 100 characters
- Description: Required, max 1000 characters
- Features: At least one required
- File uploads: Max 10MB per file, allowed types

**Change Request:**
- Title: Required, max 100 characters
- Description: Required, max 1000 characters
- Category: Required

## Backend Validation

**API Endpoints:**
- All inputs validated with Zod schemas
- Type checking
- Range checking
- Format checking

**Database Constraints:**
- Unique constraints on key fields
- Foreign key constraints
- Not null constraints
- Check constraints

---

# PART 13 - ERROR HANDLING

## Client-Side Errors

**Form Errors:**
- Display inline with field
- Clear error messages
- Highlight invalid fields

**API Errors:**
- User-friendly error messages
- Retry options where applicable
- Contact support link

## Server-Side Errors

**Validation Errors:**
- Return 400 with validation details
- Include field-level errors

**Authentication Errors:**
- Return 401 for unauthorized
- Return 403 for forbidden
- Clear error messages

**Not Found Errors:**
- Return 404 for missing resources
- Suggest related resources

**Server Errors:**
- Return 500 for unexpected errors
- Log error details
- Return generic message to user

---

# PART 14 - PERFORMANCE REQUIREMENTS

**Page Load Time:**
- Target: < 2 seconds
- Measure: Lighthouse score > 90

**API Response Time:**
- Target: < 200ms for simple queries
- Target: < 500ms for complex queries

**Preview Load Time:**
- Target: < 3 seconds

**File Upload:**
- Progress indicator
- Chunked upload for large files
- Resume capability

---

# PART 15 - ACCESSIBILITY

**WCAG 2.1 AA Compliance:**
- Keyboard navigation
- Screen reader support
- ARIA labels
- Focus indicators
- Color contrast ratio > 4.5:1
- Alt text for images
- Skip to main content link

---

# PART 16 - RESPONSIVE DESIGN

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile Adaptations:**
- Hamburger menu
- Stacked layouts
- Simplified tables
- Touch-friendly buttons
- Bottom navigation (optional)

**Tablet Adaptations:**
- Adjusted grid layouts
- Collapsible sidebar
- Moderate card sizes

**Desktop Adaptations:**
- Full navigation
- Multi-column layouts
- Hover states
- Keyboard navigation

---

# CONCLUSION

This functional specification defines the complete behavior of the FerixBuilder platform. When combined with the existing prototype and technical architecture documents, it provides everything needed to convert the prototype into a production-ready application.

**Key Principles:**
1. Preserve existing design language and components
2. Add missing functionality as defined in this specification
3. Replace static data with real API calls
4. Implement all business rules defined above
5. Follow security and permission models
6. Ensure data validation and error handling
7. Meet performance and accessibility requirements

**Implementation Priority:**
1. Foundation (authentication, database, API)
2. Customer MVP (dashboard, project creation, basic project management)
3. Admin MVP (dashboard, project management, scope, billing)
4. Advanced features (change requests, previews, delivery)
5. Phase 2 features (hosting, infrastructure)
