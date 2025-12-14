# NEORA Therapy Clinic Web Application

A full-stack therapy clinic web application built with Next.js (App Router), Tailwind CSS, Convex (real-time database), and Clerk (authentication).

## Features

### Public Pages
- Home page with auto-sliding carousel
- About page with vision, mission, and director profile
- Services page with detailed service information
- Disorders page with information about conditions we help with
- Testimonials page
- Gallery page with image slider
- Contact page

### User Features (Login Required)
- Book therapy sessions
- View booked sessions
- Manage child/adult profiles
- Track therapy progress
- View payment history
- User dashboard

### Admin Features (Admin Login Required)
- Slot management (create, view, manage daily slots)
- Client management (create, search, view profiles)
- Session records (view, update status, add progress notes)
- Payment monitoring
- Search and filter capabilities

### Additional Features
- Floating chatbot (rule-based FAQ)
- Real-time updates using Convex
- Role-based authentication with Clerk
- Responsive design
- Therapy-friendly UI with soft colors

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Convex** (Real-time database)
- **Clerk** (Authentication - Google & Phone login)
- **React Icons**

## Prerequisites

- Node.js 18+ and npm
- Convex account (free tier available)
- Clerk account (free tier available)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Convex

```bash
npx convex dev
```

This will:
- Create a Convex account (if you don't have one)
- Set up your database schema
- Generate all necessary API files
- Create/update `.env.local` with your Convex URL

**Keep this terminal running** while developing!

### 3. Set up Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application or use existing one
3. Copy your **Publishable Key** and **Secret Key**
4. Add them to `.env.local`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 4. Configure Environment Variables

Create/update `.env.local` in the root directory:

```env
# Convex (automatically added by `npx convex dev`)
NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 5. Run Development Server

In a **new terminal window** (keep Convex running in the first one):

```bash
npm run dev
```

### 6. Open in Browser

Navigate to `http://localhost:3000`

## Admin Access

The admin account is automatically created when a user signs in with Clerk using:
- **Email**: `priyankarawat00@gmail.com`

This email will automatically get admin role in the system.

## Project Structure

```
/app
  /about          - About page
  /admin          - Admin dashboard and management pages
  /booking        - Session booking page
  /contact        - Contact page
  /dashboard      - User dashboard
  /gallery        - Gallery page
  /login          - Clerk login page
  /signup         - Clerk signup page
  /services       - Services page
  /disorders      - Disorders page
  /testimonials   - Testimonials page

/components
  /Navbar         - Navigation bar with user menu
  /Footer         - Footer component
  /Chatbot        - Rule-based chatbot
  /ClerkUserSync  - Syncs Clerk user to Convex
  /ConvexClientProvider - Convex client provider

/convex
  /schema.ts      - Database schema
  /clerk.ts       - Clerk user sync functions
  /users.ts       - User queries
  /children.ts    - Child profile functions
  /sessions.ts    - Session management
  /slots.ts       - Slot management
  /payments.ts    - Payment tracking
  /progressNotes.ts - Progress notes
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx convex dev` - Start Convex development server (required)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_CONVEX_URL`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. Deploy!

### Convex Production

```bash
npx convex deploy
```

## Troubleshooting

### "Convex API not found" errors
- Make sure `npx convex dev` is running
- Check that `.env.local` has `NEXT_PUBLIC_CONVEX_URL`

### "Clerk publishableKey" errors
- Verify Clerk keys are set in `.env.local`
- Make sure keys start with `pk_test_` or `pk_live_`

### Build errors
- Run `npx convex dev` first to generate API files
- Clear `.next` folder: `rm -rf .next`

## License

Private - NEORA Therapy Clinic
