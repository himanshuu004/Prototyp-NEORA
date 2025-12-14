# NEORA Therapy Clinic Web Application

A full-stack therapy clinic web application built with Next.js (App Router), Tailwind CSS, Convex, and Gemini API.

## Features

### Public Pages
- Home page with auto-sliding carousel
- About page with vision, mission, and therapist profile
- Services page with detailed service information
- Disorders page with information about conditions we help with
- Testimonials page
- Gallery page
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
- Floating chatbot powered by Gemini API
- Real-time updates using Convex
- Role-based authentication
- Responsive design
- Therapy-friendly UI with soft colors

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Convex** (Real-time database)
- **Gemini API** (Chatbot)
- **React Icons**

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Convex**
   ```bash
   npx convex dev
   ```
   This will create a Convex project and provide you with a deployment URL.

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_CONVEX_URL=your_convex_url_here
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
/app
  /about          - About page
  /services       - Services page
  /disorders      - Disorders page
  /testimonials   - Testimonials page
  /gallery        - Gallery page
  /contact        - Contact page
  /login          - Login page
  /signup         - Signup page
  /booking        - Booking page (login required)
  /dashboard      - User dashboard
  /admin          - Admin dashboard
/components       - Reusable components
/convex           - Convex database schema and functions
```

## User Roles

1. **Public Visitor**: Can view all public pages but cannot book sessions
2. **Registered User**: Can book sessions, view dashboard, manage profiles
3. **Admin**: Full access to admin dashboard for managing slots, clients, sessions, and payments

## Database Schema

- `users` - User accounts (email, password, role)
- `children` - Child profiles
- `slots` - Available time slots
- `sessions` - Booked sessions
- `payments` - Payment records
- `progressNotes` - Therapy progress notes

## Notes

- Password hashing is handled with bcryptjs
- Authentication is managed via localStorage (can be upgraded to JWT/sessions)
- All database operations are handled through Convex
- Chatbot requires Gemini API key to function
- Convex provides real-time updates automatically

## Future Enhancements

- Email notifications
- Payment gateway integration
- File uploads for documents
- Calendar view for appointments
- SMS reminders
- Advanced analytics dashboard


