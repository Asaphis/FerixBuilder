# Admin Portal - Page Structure

## Overview
The Admin Portal is where Ferixas staff manage projects, customers, scope, change requests, billing, and all platform operations.

---

## Authentication Pages

### `/admin/login`
**Purpose:** Admin login

**Components:**
- Login form
  - Email address
  - Password
- "Remember me" checkbox
- Login button
- "Forgot password" link

**Actions:**
- Authenticate admin
- Verify admin role
- Set JWT token
- Redirect to admin dashboard
- Handle 2FA if enabled

**Security:**
- Rate limiting
- Account lockout after failed attempts
- 2FA support

---

### `/admin/forgot-password`
**Purpose:** Initiate admin password reset

**Components:**
- Email input
- "Send reset link" button
- Link back to login

**Actions:**
- Validate admin email exists
- Send password reset email
- Show confirmation message

---

### `/admin/reset-password/:token`
**Purpose:** Complete admin password reset

**Components:**
- New password input
- Confirm password input
- Password strength indicator
- "Reset password" button

**Actions:**
- Validate token
- Update password
- Redirect to login

---

### `/admin/2fa`
**Purpose:** Two-factor authentication setup/verification

**Components:**
- QR code for authenticator app
- Backup codes display
- Verification code input
- "Verify" button
- "Setup 2FA" button (if not enabled)

**Actions:**
- Generate 2FA secret
- Verify 2FA code
- Enable/disable 2FA
- Generate backup codes

---

## Dashboard Pages

### `/admin`
**Purpose:** Admin overview dashboard

**Components:**
- Welcome header
- Quick stats cards
  - Total projects
  - Active projects
  - Pending requests
  - Pending change requests
  - Unpaid invoices
  - Total revenue (month)
  - Total revenue (all time)
- Recent activity feed
  - Last 20 platform events
- Project status breakdown
  - Chart showing projects by status
- Revenue chart
  - Monthly revenue trend
- Quick actions
  - "Review requests" button
  - "View pending CRs" button
  - "View unpaid invoices" button
- Upcoming deadlines
  - Projects due soon
  - Milestones due soon

**Data Required:**
- Project statistics
- Revenue statistics
- Recent activity
- Project status distribution
- Upcoming deadlines

---

### `/admin/projects`
**Purpose:** List all projects

**Components:**
- Page header "All Projects"
- Filter bar
  - Status filter (All, Draft, Submitted, In Review, In Development, Completed, Cancelled)
  - Customer filter
  - Date range filter
  - Search by project name/ID
  - Sort by (Date, Name, Status, Value)
- Project table/cards
  - Project ID (FX-XXXXX)
  - Project name
  - Customer name
  - Status badge
  - Project value
  - Created date
  - Last updated
  - Progress indicator
  - Quick actions (View, Edit)
- Pagination
- Export button (CSV, Excel)

**Actions:**
- View project details
- Filter projects
- Export project list

**Data Required:**
- All projects
- Project customers
- Project values
- Project statuses

---

### `/admin/projects/:id`
**Purpose:** Project detail overview

**Components:**
- Project header
  - Project name
  - Project ID
  - Customer name (clickable)
  - Status badge
  - Project value
  - Created date
  - Last updated
- Quick actions dropdown
  - Edit project
  - View scope
  - Manage features
  - Manage milestones
  - View change requests
  - View previews
  - View billing
  - View messages
  - View activity
  - Delete project (with confirmation)
- Project timeline
  - Visual timeline of milestones
  - Current stage indicator
  - Progress percentage
- Project summary cards
  - Original price
  - Additional work total
  - Current total
  - Amount paid
  - Outstanding balance
  - Revision rounds used
  - Revision rounds remaining
- Team assignment
  - Assign developers
  - Assign project manager
  - Team member roles
- Recent activity
  - Last 15 project events

**Tabs/Sections:**
- Overview (default)
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

**Data Required:**
- Project details
- Project scope
- Project team
- Project timeline
- Project billing
- Recent activity

---

### `/admin/projects/:id/scope`
**Purpose:** Create and edit project scope

**Components:**
- Scope header
  - Project name
  - Scope status (Draft, Sent, Approved, Locked)
- Pricing section
  - Original project price input
  - Currency selector (₦)
  - Payment terms dropdown
    - Final payment
    - Milestone payments (future)
- Timeline section
  - Estimated duration input
  - Start date picker
  - Estimated completion date
- Revision allowance section
  - Number of rounds input
  - Round definition help text
  - Additional revision cost input
- Included features section
  - Feature categories (expandable)
  - Add feature button
  - Feature items
    - Feature name
    - Feature description
    - Sub-items (if applicable)
    - Delete button
  - Drag to reorder
- Excluded features section
  - Add exclusion button
  - Exclusion items
    - Feature name
    - Reason for exclusion
    - Delete button
- Terms and conditions
  - Text editor for custom terms
- Action buttons
  - Save draft
  - Send to customer
  - Edit (if approved - requires unlock)
  - Lock scope (if approved)

**Actions:**
- Create scope
- Edit scope (if not locked)
- Send scope to customer
- Lock scope (after customer approval)
- Unlock scope (admin override with reason)

**Data Required:**
- Project scope
- Scope features
- Scope exclusions
- Project pricing

---

### `/admin/projects/:id/features`
**Purpose:** Manage detailed project features

**Components:**
- Features header
  - Project name
  - Total features count
- Feature categories
  - Authentication
  - User management
  - Content management
  - E-commerce
  - Payments
  - Social features
  - Analytics
  - Custom
- Add feature button
- Feature list
  - Feature name
  - Feature description
  - Status (Not Started, In Progress, Completed)
  - Priority (Low, Medium, High)
  - Assigned to
  - Due date
  - Progress bar
  - Actions (Edit, Delete)
- Bulk actions
  - Mark as completed
  - Assign to team member
  - Change priority

**Actions:**
- Add feature
- Edit feature
- Delete feature
- Update feature status
- Assign feature
- Reorder features

**Data Required:**
- Project features
- Team members
- Feature statuses

---

### `/admin/projects/:id/milestones`
**Purpose:** Manage project milestones

**Components:**
- Milestones header
  - Project name
  - Timeline view
- Add milestone button
- Milestone list
  - Milestone name
  - Description
  - Due date
  - Status (Not Started, In Progress, Completed, Overdue)
  - Progress percentage
  - Dependencies (if any)
  - Actions (Edit, Delete, Mark complete)
- Gantt chart view (optional)
- Timeline view

**Actions:**
- Add milestone
- Edit milestone
- Delete milestone
- Update milestone status
- Set dependencies

**Data Required:**
- Project milestones
- Milestone dependencies

---

### `/admin/projects/:id/previews`
**Purpose:** Manage preview versions

**Components:**
- Previews header
  - Project name
  - Latest version
- Create preview button
- Preview list
  - Version number
  - Release date
  - Status (Building, Ready, Expired)
  - Review status (Pending, Approved, Changes Requested)
  - Changes summary
  - Preview URL (with copy button)
  - Expiration date
  - Actions (View, Delete, Extend)
- Preview details modal
  - Version notes
  - Changes list
  - Known issues
  - Customer feedback

**Actions:**
- Create new preview
- Delete preview
- Extend preview expiration
- View preview details

**Data Required:**
- Preview versions
- Preview URLs
- Preview statuses

---

### `/admin/projects/:id/messages`
**Purpose:** Project communication

**Components:**
- Messages header
  - Project name
  - Customer name
- Message thread
  - Messages from both admin and customer
  - Timestamps
  - Read/unread indicators
- Message composer
  - Text area
  - Attachment upload
  - Send button
- Message filters
  - All messages
  - Unread only
  - From customer
  - From admin

**Actions:**
- Send message
- Upload attachment
- Mark as read
- Delete message

**Data Required:**
- Project messages
- Message attachments

---

### `/admin/projects/:id/activity`
**Purpose:** View complete project activity log

**Components:**
- Activity header
  - Project name
  - Filter options
- Activity log
  - Timestamp
  - Actor (admin/customer)
  - Action
  - Details
  - IP address (for security)
- Filters
  - Date range
  - Action type
  - Actor
  - Search
- Export button

**Actions:**
- Filter activity
- Export activity log

**Data Required:**
- Project activity log
- User information

---

### `/admin/projects/:id/settings`
**Purpose:** Project-specific settings

**Components:**
- Settings header
  - Project name
- General settings
  - Project status (editable)
  - Priority level
  - Internal notes
- Team settings
  - Add/remove team members
  - Change project manager
- Notification settings
  - Email notifications for customer
  - Email notifications for team
- Archive/Delete section
  - Archive project
  - Delete project (with confirmation)

**Actions:**
- Update project settings
- Manage team
- Configure notifications
- Archive/delete project

**Data Required:**
- Project settings
- Team members

---

## Customer Management

### `/admin/customers`
**Purpose:** List all customers

**Components:**
- Page header "Customers"
- Filter bar
  - Status filter (All, Active, Inactive)
  - Registration date range
  - Search by name/email
  - Sort by (Name, Date, Projects, Value)
- Customer table/cards
  - Customer name
  - Email
  - Registration date
  - Total projects
  - Total spent
  - Status badge
  - Last active
  - Quick actions (View, Edit, Message)
- Pagination
- Export button

**Actions:**
- View customer details
- Filter customers
- Export customer list

**Data Required:**
- All customers
- Customer statistics
- Customer projects

---

### `/admin/customers/:id`
**Purpose:** Customer detail view

**Components:**
- Customer header
  - Customer name
  - Email
  - Registration date
  - Status badge
  - Last active
- Quick actions
  - Send message
  - View projects
  - Edit profile
  - View billing
- Customer summary cards
  - Total projects
  - Active projects
  - Completed projects
  - Total spent
  - Outstanding balance
- Customer projects list
  - Project name
  - Project ID
  - Status
  - Value
  - Quick actions (View)
- Customer billing history
  - Invoice list
  - Payment list
- Customer activity log
  - Recent actions
- Customer profile
  - Contact information
  - Company details
  - Address

**Tabs/Sections:**
- Overview (default)
- Projects
- Billing
- Activity
- Messages
- Profile

**Data Required:**
- Customer details
- Customer projects
- Customer billing
- Customer activity

---

## Project Requests

### `/admin/requests`
**Purpose:** List all project requests

**Components:**
- Page header "Project Requests"
- Filter bar
  - Status filter (All, Draft, Submitted, In Review, Approved, Rejected)
  - Date range
  - Search by project name
- Request cards
  - Project name
  - Customer name
  - Project type
  - Status badge
  - Submitted date
  - Estimated value (if quoted)
  - Quick actions (Review, View)
- Summary cards
  - Total requests
  - Pending review
  - Approved today
  - Rejected today

**Actions:**
- Review request
- View request details
- Filter requests

**Data Required:**
- All project requests
- Request statuses
- Request customers

---

### `/admin/requests/:id`
**Purpose:** Review project request

**Components:**
- Request header
  - Project name
  - Customer name
  - Submitted date
  - Status badge
- Request details
  - Project type
  - Industry
  - Target audience
  - Project description
  - Goals
  - Success criteria
- Features requested
  - Feature list
  - Priority levels
- Pages requested
  - Page list
  - Page descriptions
- Branding information
  - Colors
  - Typography
  - Style preferences
- Assets
  - Logo
  - Images
  - Documents
- Design references
  - Reference URLs
  - Uploaded references
- Technical requirements
  - Platform preferences
  - Technology preferences
  - Integration requirements
- Domain/hosting preferences
- Admin notes section
  - Internal notes
  - Questions for customer
- Action buttons
  - Request clarification
  - Create quotation
  - Approve request
  - Reject request (with reason)

**Actions:**
- Send clarification request
- Create quotation/scope
- Approve request (creates project)
- Reject request (with reason)

**Data Required:**
- Project request details
- Request attachments
- Customer information

---

## Change Requests

### `/admin/change-requests`
**Purpose:** List all change requests across all projects

**Components:**
- Page header "Change Requests"
- Filter bar
  - Status filter (All, Pending Review, Quoted, Awaiting Approval, Approved, Rejected, Completed)
  - Priority filter (All, Low, Medium, High, Urgent)
  - Project filter
  - Date range
- CR cards
  - CR number (CR-XXX)
  - Project name
  - Customer name
  - Title
  - Status badge
  - Priority badge
  - Additional cost (if quoted)
  - Created date
  - Quick actions (Review, View)
- Summary cards
  - Total pending
  - Total awaiting approval
  - Total approved today
  - Revenue from additional work (month)

**Actions:**
- Review CR
- View CR details
- Filter CRs

**Data Required:**
- All change requests
- CR statuses
- CR priorities
- CR costs

---

### `/admin/change-requests/:id`
**Purpose:** Review and evaluate change request

**Components:**
- CR header
  - CR number
  - Project name
  - Customer name
  - Title
  - Status badge
  - Priority badge
  - Created date
- CR details
  - Description
  - Category
  - Attachments
  - Customer notes
- Scope evaluation section
  - Classification radio buttons
    - Included in scope
    - Revision (within scope)
    - Additional feature (outside scope)
  - Evaluation notes
  - Reference to scope items
- Cost estimation section (if additional feature)
  - Additional cost input
  - Currency (₦)
  - Cost breakdown
  - Reasoning
- Timeline estimation section (if applicable)
  - Additional days input
  - Impact on delivery date
- Admin notes
  - Internal notes
  - Discussion points
- Action buttons
  - Save evaluation
  - Send quote to customer
  - Mark as included (no charge)
  - Reject CR (with reason)

**Actions:**
- Evaluate CR against scope
- Quote additional cost
- Send quote to customer
- Mark as included
- Reject CR

**Data Required:**
- Change request details
- Project scope
- Project features

---

## Billing Management

### `/admin/payments`
**Purpose:** View all payments

**Components:**
- Page header "Payments"
- Filter bar
  - Status filter (All, Pending, Completed, Failed, Refunded)
  - Date range
  - Payment method filter
  - Project filter
- Payment table
  - Payment ID
  - Invoice number
  - Project name
  - Customer name
  - Amount
  - Payment method
  - Status badge
  - Payment date
  - Reference number
  - Quick actions (View, Refund if applicable)
- Summary cards
  - Total payments (month)
  - Total payments (all time)
  - Pending payments
  - Failed payments

**Actions:**
- View payment details
- Process refund
- Filter payments
- Export payment list

**Data Required:**
- All payments
- Payment statuses
- Invoice information

---

### `/admin/payments/:id`
**Purpose:** View payment details

**Components:**
- Payment header
  - Payment ID
  - Invoice number
  - Status badge
- Payment details
  - Amount
  - Payment method
  - Payment date
  - Reference number
  - Transaction ID
- Related invoice
  - Invoice number (clickable)
  - Invoice amount
  - Invoice date
- Related project
  - Project name (clickable)
  - Project ID
- Customer information
  - Customer name
  - Customer email
- Payment gateway response
  - Raw response data
- Actions
  - Process refund (if applicable)
  - Resend receipt
  - Mark as failed (if needed)

**Actions:**
- Process refund
- Resend receipt
- Update payment status

**Data Required:**
- Payment details
- Invoice details
- Project details
- Gateway response

---

### `/admin/invoices`
**Purpose:** List all invoices

**Components:**
- Page header "Invoices"
- Filter bar
  - Status filter (All, Draft, Sent, Paid, Overdue, Cancelled)
  - Date range
  - Project filter
  - Customer filter
- Invoice table
  - Invoice number
  - Project name
  - Customer name
  - Invoice date
  - Due date
  - Amount
  - Status badge
  - Quick actions (View, Send, Mark paid)
- Summary cards
  - Total invoices (month)
  - Outstanding amount
  - Overdue amount
  - Paid amount (month)

**Actions:**
- View invoice
- Send invoice
- Mark as paid
- Create invoice
- Filter invoices

**Data Required:**
- All invoices
- Invoice statuses
- Invoice totals

---

### `/admin/invoices/:id`
**Purpose:** View and manage invoice

**Components:**
- Invoice header
  - Invoice number
  - Status badge
  - Invoice date
  - Due date
- Invoice details
  - Bill to (customer info)
  - Project reference
- Line items
  - Description
  - Quantity
  - Unit price
  - Total
  - Actions (Edit, Delete)
- Add line item button
- Subtotal
- Tax (if applicable)
- Total amount
- Payment status
  - Amount paid
  - Outstanding balance
- Payment history
  - Payment list
- Actions
  - Add payment
  - Send invoice to customer
  - Mark as paid
  - Cancel invoice
  - Download PDF
  - Print

**Actions:**
- Add line item
- Edit line item
- Delete line item
- Add payment
- Send invoice
- Mark as paid
- Cancel invoice
- Download PDF

**Data Required:**
- Invoice details
- Invoice line items
- Payment history

---

## File Management

### `/admin/files`
**Purpose:** Manage all uploaded files

**Components:**
- Page header "File Management"
- Filter bar
  - Type filter (All, Images, Documents, Logos, Other)
  - Project filter
  - Date range
  - Search by filename
- File grid/table
  - Filename
  - File type
  - File size
  - Upload date
  - Project (if applicable)
  - Uploader
  - Quick actions (View, Download, Delete)
- Storage usage
  - Total storage used
  - Storage by type
  - Storage by project
- Upload button

**Actions:**
- Upload file
- View file
- Download file
- Delete file
- Filter files

**Data Required:**
- All files
- File metadata
- Storage statistics

---

## Notifications

### `/admin/notifications`
**Purpose:** View admin notifications

**Components:**
- Page header "Notifications"
- Filter bar
  - All, Unread, Read
  - Type filter (Project, Billing, System, Customer)
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
- Admin notifications
- Notification types

---

## Settings

### `/admin/settings`
**Purpose:** Platform settings

**Components:**
- Settings header
- Tabs/Sections

**General Settings**
- Platform name
- Platform URL
- Default currency
- Timezone
- Date format

**Plan Settings**
- Manage predefined plans
  - Basic Website
  - Business Website
  - Custom Application
- Add/edit plan
  - Name
  - Price
  - Features
  - Description

**Payment Settings**
- Payment gateway configuration
  - Paystack API keys
  - Other gateways (future)
- Payment terms
  - Default payment terms
  - Late payment fees

**Email Settings**
- SMTP configuration
- Email templates
  - Welcome email
  - Verification email
  - Invoice email
  - Payment confirmation
  - Password reset

**Notification Settings**
- Email notification preferences
- Push notification preferences (Firebase)
- SMS notifications (future)

**Security Settings**
- Password requirements
- Session timeout
- 2FA requirements
- IP whitelist (if applicable)

**Integration Settings**
- Cloudinary configuration
- Cloudflare configuration
- Firebase configuration
- Resend configuration

**Backup Settings**
- Database backup schedule
- File backup schedule
- Backup retention

**Audit Settings**
- Audit log retention
- Activity logging level

**Actions:**
- Update settings
- Test email configuration
- Test payment gateway
- Configure integrations

**Data Required:**
- Platform settings
- Integration configurations

---

## Profile

### `/admin/profile`
**Purpose:** Admin profile management

**Components:**
- Profile header
  - Avatar
  - Name
  - Email
  - Role
  - Last active
- Profile form
  - Full name
  - Email (read-only)
  - Phone number
  - Bio
- Change password section
  - Current password
  - New password
  - Confirm password
- 2FA section
  - 2FA status
  - Setup 2FA button
  - View backup codes
- Session management
  - Active sessions list
  - Revoke session button
- Activity log
  - Recent admin actions

**Actions:**
- Update profile
- Change password
- Setup 2FA
- Revoke sessions

**Data Required:**
- Admin profile
- Active sessions
- Admin activity

---

## Shared Components

### Navigation
- Top navigation bar
  - Logo
  - Dashboard link
  - Projects dropdown
    - All Projects
    - Project Requests
  - Customers link
  - Change Requests link
  - Billing dropdown
    - Payments
    - Invoices
  - Files link
  - Notifications (with badge)
  - Settings dropdown
    - Platform Settings
    - Profile
- Mobile menu toggle

### Sidebar (optional)
- Quick navigation
- Project shortcuts
- Recent items

### Footer
- Platform version
- Support link
- Documentation link

### Loading States
- Skeleton loaders
- Spinner components
- Progress indicators

### Empty States
- "No projects" message
- "No requests" message
- "No change requests" message
- Call-to-action buttons

### Error States
- Error messages
- Retry buttons
- Support contact links

### Modals
- Confirm delete modal
- Quick view modal
- Edit modal
- Message composer modal

---

## Responsive Design

### Mobile (< 768px)
- Hamburger menu
- Stacked layouts
- Simplified tables
- Bottom navigation (optional)

### Tablet (768px - 1024px)
- Adjusted grid layouts
- Collapsible sidebar
- Touch-friendly buttons

### Desktop (> 1024px)
- Full navigation
- Multi-column layouts
- Hover states
- Keyboard navigation
- Sidebar navigation

---

## Accessibility

- ARIA labels
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus indicators
- Error announcements
- Skip to main content link

---

## Admin Permissions

### Super Admin
- Full access to all features
- Can manage other admins
- Can access platform settings
- Can view all financial data

### Project Manager
- Manage assigned projects
- Create and edit scope
- Evaluate change requests
- Manage previews
- View project billing

### Developer
- View assigned projects
- Update feature status
- Upload files
- View project scope
- Cannot access financial data

### Support
- View customer information
- Send messages
- View project status
- Cannot access financial data
- Cannot modify scope
