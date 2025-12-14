# Clerk Authentication Setup Guide

## Overview
The application now uses Clerk for authentication with Google and Phone Number login options. Clerk handles all authentication, and user data is synced to Convex database.

## Setup Steps

### 1. Create a Clerk Account
1. Go to [https://clerk.com](https://clerk.com)
2. Sign up for a free account
3. Create a new application

### 2. Configure Clerk Application
1. In your Clerk dashboard, go to **API Keys**
2. Copy your **Publishable Key** and **Secret Key**
3. Add these to your `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### 3. Configure Authentication Methods
1. In Clerk dashboard, go to **User & Authentication** → **Social Connections**
2. Enable **Google** OAuth
3. Go to **Phone Numbers** and enable phone number authentication
4. Configure your OAuth redirect URLs:
   - Development: `http://localhost:3000`
   - Production: Your production domain

### 4. Admin User Setup
The admin user is automatically created when someone signs in with the email:
- **Email**: `priyankarawat00@gmail.com`
- This email will automatically get `admin` role in the Convex database

### 5. Run the Application
1. Make sure Convex is running: `npm run convex:dev`
2. Start Next.js: `npm run dev`
3. Visit `http://localhost:3000`

## How It Works

1. **User Signs In**: User authenticates via Clerk (Google or Phone)
2. **Auto-Sync**: `ClerkUserSync` component automatically syncs Clerk user to Convex database
3. **Role Assignment**: 
   - Email `priyankarawat00@gmail.com` → `admin` role
   - All other emails → `user` role
4. **Data Storage**: User data is stored in Convex `users` table with `clerkId` as the primary identifier

## Features

- ✅ Google OAuth login
- ✅ Phone number login
- ✅ Automatic user sync to Convex
- ✅ Role-based access control (admin/user)
- ✅ Protected routes via middleware
- ✅ Session management handled by Clerk

## Migration Notes

- Old users with `localStorage` authentication will need to sign up again via Clerk
- Existing Convex users can be migrated by matching email addresses
- The `password` field in the schema is now optional (only for legacy users)

