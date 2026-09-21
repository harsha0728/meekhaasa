# AGENTS.md

## Project Overview

This project is a restaurant website built using Next.js.

The website allows customers to explore the restaurant, view available services and events, and make bookings.

The application will be hosted entirely on GitHub Pages.

Because GitHub Pages provides static hosting, the application must work completely as a client-side/static application.

Supabase will be used for backend-related functionality, including:

- Database
- Authentication
- User management
- Data persistence
- Booking data
- Event data

---

## Core Technical Requirements

### Next.js

Use Next.js with React.

The project must remain compatible with static export and GitHub Pages.

Do not introduce functionality that requires a persistent Next.js/Node.js server.

Prefer client-side React functionality wherever interaction with external services is required.

The production build must be deployable as static files.

---

## Hosting

The website will be hosted on GitHub Pages.

All implementation decisions must therefore remain compatible with GitHub Pages static hosting.

Do not introduce:

- Next.js API routes
- Server Actions
- Server-side database access
- Server-only authentication
- Server-side sessions
- Server-side rendering that requires a Node.js server
- Backend code that must run inside the Next.js application
- Any feature requiring a continuously running server

When suggesting or implementing a new feature, first consider whether it works with a static GitHub Pages deployment.

---

## Supabase

Supabase is the backend service for this project.

Use Supabase for:

- PostgreSQL database
- Authentication
- User accounts
- Persistent application data
- Restaurant event data
- Booking information
- Customer-related data

The Next.js frontend should communicate with Supabase directly from the browser using the Supabase JavaScript client where appropriate.

Never expose privileged Supabase credentials in frontend code.

Only public/client-safe configuration such as the Supabase project URL and publishable/anon key may be used in the browser.

Never expose the Supabase service-role key or other server secrets.

Use Supabase Row Level Security (RLS) policies to protect database tables accessed from the client.

---

## Authentication

Authentication should be implemented using Supabase Auth.

The website may support features such as:

- User registration
- User login
- User logout
- Authentication state
- Customer accounts
- Protected customer functionality
- Booking history

Authentication must work without requiring a custom Next.js backend.

Do not implement authentication that depends on Next.js server sessions.

---

## Restaurant Website

This is a restaurant-focused website.

The UI should feel:

- Premium
- Modern
- Clean
- Elegant
- Responsive
- Mobile friendly
- Easy to navigate

Avoid making the website look like a generic admin dashboard unless working specifically on an admin interface.

---

## Restaurant Features

The architecture should be able to support features including:

### Restaurant Information

- Restaurant details
- About section
- Location
- Contact information
- Opening hours
- Images/gallery
- Food and menu information

### Events

The restaurant may organize and host multiple types of events.

Users should be able to:

- Browse events
- View event details
- See event dates and times
- Check availability
- View pricing when applicable
- Book events when booking is available

Event information should be stored in Supabase rather than hardcoded when practical.

### Bookings

The website will contain multiple things that customers can book.

Design booking-related code so it can be extended for different booking types.

Examples may include:

- Restaurant/table bookings
- Event bookings
- Special experiences
- Private events
- Other restaurant services

Booking data should be persisted in Supabase.

A booking may contain information such as:

- User/customer
- Booking type
- Date
- Time
- Number of guests
- Booking status
- Related event or service
- Customer notes
- Created timestamp

Exact fields can evolve as the project develops.

---

## Database Design

Use Supabase PostgreSQL as the primary database.

Keep database design normalized and maintainable.

Use clear table and column names.

Possible entities may include:

- profiles
- events
- bookings
- booking_types
- restaurant_tables
- menu_items
- categories

Do not create unnecessary tables.

Database structure should evolve based on actual application requirements.

Use relationships and foreign keys where appropriate.

---

## Security

Security is important because the frontend communicates directly with Supabase.

Always assume that client-side code can be inspected and modified by users.

Never rely only on client-side checks for authorization.

Use Supabase Row Level Security policies for authorization.

Users should only be able to access or modify data they are authorized to access.

Never store secret credentials in:

- React components
- Client-side JavaScript
- Public environment variables
- GitHub repositories

Never use the Supabase service-role key in client-side code.

---

## Environment Variables

Use environment variables for Supabase configuration.

Client-safe values may use Next.js public environment variables.

For example:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

Do not commit actual secrets or private credentials to Git.

Provide placeholders in `.env.example` when configuration documentation is needed.

---

## React and Component Guidelines

Use React functional components.

Prefer reusable components instead of duplicating UI.

Keep components focused on a single responsibility.

Shared restaurant UI components should be placed in appropriate component directories.

Possible reusable components include:

- Navbar
- Footer
- EventCard
- EventList
- BookingForm
- DatePicker
- MenuCard
- Gallery
- LoginForm
- SignupForm

Avoid unnecessarily large components.

Extract reusable logic when it improves maintainability.

---

## Styling

Use Tailwind CSS for styling.

Prefer Tailwind utility classes instead of creating unnecessary custom CSS.

The design should remain consistent throughout the website.

Use reusable styling patterns for:

- Buttons
- Cards
- Forms
- Inputs
- Headings
- Sections
- Modals

All pages must work properly on:

- Mobile
- Tablet
- Desktop

---

## Client-Side Data Access

Supabase operations will normally happen from the client.

Handle:

- Loading states
- Empty states
- Authentication states
- Network failures
- Database errors
- Permission errors

Do not assume Supabase requests will always succeed.

Provide appropriate user feedback when an operation fails.

---

## GitHub Pages Compatibility

Before adding a dependency or Next.js feature, verify that it can work with static deployment.

Avoid features that require a Node.js runtime after deployment.

The application should be buildable as a static Next.js export suitable for GitHub Pages.

Navigation, assets, authentication callbacks, and routes must be designed with GitHub Pages deployment in mind.

---

## Code Quality

When modifying this project:

1. Keep code simple and readable.
2. Avoid unnecessary abstractions.
3. Reuse existing components when possible.
4. Follow the existing project structure.
5. Do not add dependencies unless they provide clear value.
6. Remove unused imports.
7. Handle asynchronous operations correctly.
8. Handle errors gracefully.
9. Maintain responsive design.
10. Preserve GitHub Pages compatibility.

---

## Important Rule for AI Agents

Before implementing any requested feature, check whether the proposed solution is compatible with:

1. Next.js
2. Static export
3. GitHub Pages
4. Client-side execution
5. Supabase

Do not silently introduce a server-side dependency.

If a requested feature cannot safely or technically be implemented with the current GitHub Pages + Supabase architecture, explain the limitation and suggest a compatible alternative.

The preferred architecture is:

User Browser
    |
    v
Next.js Static Frontend
    |
    v
Supabase
    |
    +-- Authentication
    +-- PostgreSQL Database
    +-- Storage (when required)

GitHub Pages hosts the static Next.js frontend.

Supabase provides backend services.

Keep this architecture unless the project's requirements are explicitly changed.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
