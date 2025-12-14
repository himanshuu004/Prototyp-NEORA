# NEORA Therapy Clinic Web Application

A full-stack therapy clinic web application built with Next.js (App Router), Tailwind CSS, Convex (real-time database), and Clerk (authentication).

## Features

### Public Pages
- Home page with auto-sliding carousel
- About page with director information
- Services page
- Disorders page
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
- Floating chatbot for FAQ
- Real-time updates using Convex
- Role-based authentication with Clerk
- Responsive design
- Therapy-friendly UI with soft colors

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Convex** (Real-time database)
- **Clerk** (Authentication - Google & Phone)
- **React Icons**

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Initialize Convex

Run this command to set up Convex:

```bash
npx convex dev
```

This will:
- Create a Convex account (if you don't have one)
- Generate all the proper `_generated` files
- Provide you with a deployment URL
- Watch for changes to your Convex functions

**Important:** Keep this command running in a separate terminal window during development.

After running `npx convex dev`, it will create a `.env.local` file with your `NEXT_PUBLIC_CONVEX_URL`.

### 3. Configure Environment Variables

Create or update `.env.local` file in the root directory:

```env
# Convex (automatically added by 'npx convex dev')
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here

# Clerk Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

Get your Clerk keys from: https://dashboard.clerk.com/

### 4. Run Development Server

In a **new terminal window** (keep Convex running in the first one):

```bash
npm run dev
```

### 5. Open in Browser

Navigate to `http://localhost:3000`

## Admin Access

The admin user is automatically created when you sign in with Clerk using:
- **Email:** `priyankarawat00@gmail.com`

Users with this email will automatically get admin role.

## Project Structure

```
/app
  /about          - About page
  /admin          - Admin dashboard and management
  /booking        - Session booking page
  /dashboard      - User dashboard
  /login          - Clerk login page
  /signup         - Clerk signup page
/components       - Reusable React components
/convex           - Convex functions (database queries/mutations)
/public           - Static assets (images, logos, etc.)
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_CONVEX_URL`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. Deploy

### Deploy Convex

Run:
```bash
npx convex deploy
```

This will deploy your Convex functions to production.

## Important Notes

- The app uses Clerk for authentication (Google and Phone login)
- All data is stored in Convex (real-time database)
- Admin users are automatically assigned based on email address
- The chatbot is a simple rule-based FAQ system (no external API needed)

## Troubleshooting

### Error: "api is not defined" or "api.clerk.syncUser is not a function"

This means Convex hasn't been initialized yet. Run `npx convex dev` first.

### Error: "Missing publishableKey" or Clerk errors

Make sure you've added your Clerk keys to `.env.local`:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

### Build errors about Convex

Make sure to run `npx convex dev` at least once to generate the `_generated` files.
