# Customer Portal - Page Structure

## Overview
The Customer Portal is where clients manage their projects, submit requests, review proposals, track progress, and handle payments.

---

## Authentication Pages

### `/register`
**Purpose:** New customer registration

**Components:**
- Registration form
  - Full name
  - Email address
  - Password (with strength indicator)
  - Confirm password
- Terms of service checkbox
- Register button
- Link to login page

**Validation:**
- Email format validation
- Password minimum 8 characters
- Passwords must match
- Email uniqueness check

**Actions:**
- Submit registration
- Redirect to email verification
- Send verification email

---

### `/login`
**Purpose:** Customer login

**Components:**
- Login form
  - Email address
  - Password
- "Remember me" checkbox
- Login button
- "Forgot password" link
- Link to registration page

**Actions:**
- Authenticate user
- Set JWT token
- Redirect to dashboard
- Handle login errors

---

### `/forgot-password`
**Purpose:** Initiate password reset

**Components:**
- Email input
- "Send reset link" button
- Link back to login

**Actions:**
- Validate email exists
- Send password reset email
- Show confirmation message

---

### `/reset-password/:token`
**Purpose:** Complete password reset

**Components:**
- New password input
- Confirm password input
- "Reset password" button

**Actions:**
- Validate token
- Update password
- Redirect to login

---

### `/verify-email/:token`
**Purpose:** Verify email address

**Components:**
- Verification status message
- "Resend verification" link (if failed)

**Actions:**
- Validate token
- Mark email as verified
- Redirect to dashboard

---

## Dashboard Pages

### `/dashboard`
**Purpose:** Customer overview dashboard

**Components:**
- Welcome header with customer name
- Quick stats cards
  - Active projects count
  - Pending approvals count
  - Unpaid invoices count
  - Recent notifications count
- Recent projects list (last 5)
- Recent notifications list (last 5)
- Quick actions
  - "Start new project" button
  - "View all projects" link
  - "View notifications" link

**Data Required:**
- User profile
- Project statistics
- Recent projects
- Recent notifications

---

### `/projects`
**Purpose:** List all customer projects

**Components:**
- Page header "My Projects"
- Filter bar
  - Status filter (All, Draft, Submitted, In Review, In Development, Completed)
  - Search by project name
  - Sort by (Date, Name, Status)
- Project cards/list
  - Project name
  - Project ID (FX-XXXXX)
  - Status badge
  - Created date
  - Last updated
  - Progress indicator
  - Quick actions (View, Edit if draft)
- Pagination
- "Start new project" button

**Data Required:**
- All projects for customer
- Project statuses
- Project progress

---

### `/projects/new`
**Purpose:** Choose project type

**Components:**
- Page header "Start a New Project"
- Two main options:
  1. **Browse Plans** - Predefined packages
  2. **Custom Project** - Detailed wizard
- Plan cards
  - Basic Website (₦150,000)
    - Features list
    - "Choose" button
  - Business Website (₦300,000)
    - Features list
    - "Choose" button
  - Custom Application (Starting from ₦X)
    - Description
    - "Get Quote" button (links to custom wizard)

**Actions:**
- Select plan → Redirect to plan-specific form
- Select custom → Redirect to custom wizard

---

### `/projects/new/custom`
**Purpose:** Custom project submission wizard (12 steps)

**Components:**
- Progress indicator (Step X of 12)
- Back/Next navigation
- Save draft button
- Preview summary button

**Step 1: Basic Information**
- Project name
- Project type (Website, Application, E-commerce, Custom)
- Industry/Category
- Target audience
- Estimated timeline preference

**Step 2: Project Description**
- Project overview
- Primary goals
- Success criteria
- Competitive landscape

**Step 3: Features**
- Feature checklist (with custom add)
- Feature categories
  - Authentication
  - User management
  - Content management
  - E-commerce
  - Payments
  - Social features
  - Analytics
  - Other (custom)
- Priority levels for each feature

**Step 4: Pages**
- Page list
- Page descriptions
- Page hierarchy
- Page count estimate

**Step 5: Branding**
- Brand colors
- Typography preferences
- Style preferences (Modern, Classic, Minimal, Bold)
- Brand guidelines upload (optional)

**Step 6: Logo**
- Logo upload
- Logo format requirements
- Logo usage notes

**Step 7: Images/Assets**
- Image uploads
- Asset categories
  - Product images
  - Team photos
  - Location photos
  - Other assets
- File upload with progress

**Step 8: Content**
- Content availability
  - Have all content ready
  - Need content creation
  - Mixed
- Content notes
- Document uploads (optional)

**Step 9: Design References**
- Reference websites (URLs)
- Design inspiration uploads
- Design notes
- Do's and Don'ts

**Step 10: Technical Requirements**
- Platform preferences (Web, Mobile, Both)
- Technology preferences (if any)
- Integration requirements
  - Payment gateways
  - Third-party APIs
  - Existing systems
- Performance requirements

**Step 11: Domain/Hosting**
- Domain status
  - Have domain
  - Need domain purchase
  - Need domain recommendation
- Hosting preferences
  - Ferixas hosting
  - Own hosting
  - Need recommendation
- SSL requirements

**Step 12: Review & Submit**
- Complete summary of all inputs
- Edit any section
- Terms checkbox
- Submit button

**Actions:**
- Save draft (auto-save)
- Navigate between steps
- Submit project request
- Show confirmation

---

### `/projects/:id`
**Purpose:** Project detail overview

**Components:**
- Project header
  - Project name
  - Project ID
  - Status badge
  - Last updated
- Quick actions
  - View proposal (if available)
  - View change requests
  - View previews
  - View billing
  - Contact support
- Project timeline
  - Key milestones
  - Current stage
  - Progress indicator
- Project scope summary
  - Included features count
  - Excluded features count
  - Revision allowance
- Recent activity
  - Last 10 project events
- Project team (if visible)

**Tabs/Sections:**
- Overview (default)
- Scope
- Change Requests
- Previews
- Billing
- Messages
- Files

**Data Required:**
- Project details
- Project status
- Project timeline
- Project scope
- Recent activity
- Project team

---

### `/projects/:id/proposal`
**Purpose:** View and approve scope proposal

**Components:**
- Proposal header
  - Project name
  - Proposal date
  - Status (Pending, Approved, Rejected)
- Pricing section
  - Original project price
  - Currency (₦)
  - Payment terms
- Timeline section
  - Estimated duration
  - Start date
  - Estimated completion date
- Scope section
  - Included features (expandable)
    - Feature categories
    - Feature details
  - Excluded features (expandable)
    - Exclusion list
    - Reason for exclusion
- Revision allowance
  - Number of included rounds
  - What constitutes a round
  - Additional revision cost
- Terms and conditions
- Action buttons
  - Approve proposal
  - Request changes
  - Decline proposal

**Actions:**
- Approve proposal → Lock scope, start development
- Request changes → Open message thread
- Decline proposal → Cancel project

**Data Required:**
- Project scope
- Scope features
- Scope exclusions
- Project pricing
- Project timeline

---

### `/projects/:id/change-requests`
**Purpose:** List all change requests for project

**Components:**
- Page header "Change Requests"
- Filter bar
  - Status filter (All, Pending, Approved, Rejected, Completed)
  - Sort by (Date, Status)
- Change request cards
  - CR number (CR-XXX)
  - Title
  - Description
  - Status badge
  - Additional cost (if any)
  - Additional time (if any)
  - Created date
  - Quick actions (View details)
- Summary card
  - Total additional cost
  - Total additional time
  - Approved count
  - Pending count
- "New Change Request" button

**Data Required:**
- All change requests for project
- CR statuses
- CR costs
- CR timelines

---

### `/projects/:id/change-requests/new`
**Purpose:** Submit new change request

**Components:**
- Form header "Request Change"
- Change type selection
  - Revision (within scope)
  - Additional feature (outside scope)
  - Bug fix
  - Other
- Title input
- Description textarea
- Attachments upload
- Priority selection (Low, Medium, High, Urgent)
- Category selection
- Submit button
- Cancel button

**Validation:**
- Title required
- Description required
- At least one attachment recommended

**Actions:**
- Submit change request
- Show confirmation
- Redirect to CR list

**Data Required:**
- Project scope (for validation)
- Current revision allowance

---

### `/projects/:id/change-requests/:crId`
**Purpose:** View change request details

**Components:**
- CR header
  - CR number
  - Title
  - Status badge
  - Created date
- CR details
  - Description
  - Attachments list
  - Priority
  - Category
- Admin evaluation (if completed)
  - Scope classification (Included, Revision, Additional)
  - Additional cost (if applicable)
  - Additional time (if applicable)
  - Admin notes
  - Evaluation date
- Approval section (if pending approval)
  - Cost summary
  - Timeline impact
  - New project total
  - Approve button
  - Decline button
- History
  - Status changes
  - Messages exchanged

**Actions:**
- Approve CR → Update project total
- Decline CR → Mark as declined
- Add message to CR

**Data Required:**
- Change request details
- Admin evaluation
- Project current total

---

### `/projects/:id/previews`
**Purpose:** List all preview versions

**Components:**
- Page header "Preview Versions"
- Preview version cards
  - Version number (v0.1, v0.2, etc.)
  - Release date
  - Status badge (Pending Review, Approved, Changes Requested)
  - Changes summary
  - Review status
  - Quick actions (View preview, View details)
- Current version indicator
- "Open Latest Preview" button (if available)

**Data Required:**
- All preview versions
- Preview statuses
- Preview changes

---

### `/projects/:id/previews/:previewId`
**Purpose:** View preview with protection

**Components:**
- Preview header
  - Version number
  - Release date
  - Expiration time
- Preview iframe/window
  - Protected preview environment
  - No screenshot protection
  - No copy protection
  - Watermark overlay
- Review actions
  - Approve this version
  - Request changes
- Change request form (if requesting changes)
  - Link to CR creation
- Preview notes
  - What's new in this version
  - Known limitations

**Actions:**
- Open preview URL (with token)
- Approve preview
- Request changes → Create CR

**Data Required:**
- Preview details
- Preview URL (with access token)
- Preview protection settings

---

### `/projects/:id/billing`
**Purpose:** View billing history and current balance

**Components:**
- Billing summary card
  - Original project price
  - Additional work total
  - Project total
  - Amount paid
  - Outstanding balance
- Invoice list
  - Invoice number
  - Invoice date
  - Amount
  - Status (Paid, Pending, Overdue)
  - Quick actions (View, Pay)
- Payment history
  - Payment date
  - Amount
  - Payment method
  - Reference number
- "Pay Outstanding Balance" button (if balance > 0)

**Data Required:**
- Project invoices
- Project payments
- Project totals

---

### `/projects/:id/invoices/:invoiceId`
**Purpose:** View invoice details

**Components:**
- Invoice header
  - Invoice number
  - Invoice date
  - Due date
  - Status badge
- Invoice details
  - Bill to (customer info)
  - Project reference
- Line items
  - Description
  - Quantity
  - Unit price
  - Total
- Subtotal
- Tax (if applicable)
- Total amount
- Payment status
- Payment actions
  - Pay now button (if unpaid)
  - Download PDF button
  - Print button

**Actions:**
- Pay invoice
- Download invoice PDF

**Data Required:**
- Invoice details
- Invoice line items
- Payment status

---

### `/projects/:id/source`
**Purpose:** Download source code (after payment)

**Components:**
- Source delivery header
  - Project name
  - Delivery status
- Delivery information
  - Release date
  - Package contents
  - File size
  - Expiration time
- Download section
  - Download button (if payment complete)
  - Password field (if encrypted)
- Access requirements
  - Payment must be complete
  - Final approval required
- Documentation links
  - Setup guide
  - Deployment guide
  - API documentation (if applicable)

**Actions:**
- Download source package
- Generate new download link (if expired)

**Data Required:**
- Source release details
- Payment status
- Final approval status

---

## Profile & Settings Pages

### `/profile`
**Purpose:** View and edit customer profile

**Components:**
- Profile header
  - Avatar
  - Name
  - Email
  - Member since
- Profile form
  - Full name
  - Email (read-only)
  - Phone number
  - Company name
  - Address
  - Timezone
- Change password section
  - Current password
  - New password
  - Confirm password
- Save button

**Actions:**
- Update profile
- Change password

**Data Required:**
- User profile

---

### `/notifications`
**Purpose:** View all notifications

**Components:**
- Page header "Notifications"
- Filter bar
  - All, Unread, Read
  - Type filter (Project, Billing, System)
- Notification list
  - Notification type icon
  - Title
  - Message
  - Time ago
  - Read/unread indicator
  - Quick action (if applicable)
- Mark all as read button
- Notification settings link

**Actions:**
- Mark as read
- Mark all as read
- Delete notification
- Navigate to related item

**Data Required:**
- User notifications
- Notification types

---

## Shared Components

### Navigation
- Top navigation bar
  - Logo
  - Dashboard link
  - Projects link
  - Notifications (with badge)
  - Profile dropdown
- Mobile menu toggle

### Footer
- Links
  - About
  - Terms
  - Privacy
  - Contact
- Social media links
- Copyright

### Loading States
- Skeleton loaders
- Spinner components
- Progress indicators

### Empty States
- "No projects yet" message
- "No notifications" message
- "No change requests" message
- Call-to-action buttons

### Error States
- Error messages
- Retry buttons
- Support contact links

---

## Responsive Design

### Mobile (< 768px)
- Hamburger menu
- Stacked layouts
- Simplified cards
- Bottom navigation (optional)

### Tablet (768px - 1024px)
- Adjusted grid layouts
- Moderate card sizes
- Touch-friendly buttons

### Desktop (> 1024px)
- Full navigation
- Multi-column layouts
- Hover states
- Keyboard navigation

---

## Accessibility

- ARIA labels
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus indicators
- Error announcements
