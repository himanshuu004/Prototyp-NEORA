# Quick Start Guide

## ⚠️ Important: The app requires Convex to be initialized first!

### Step 1: Initialize Convex (REQUIRED)

Open a terminal and run:

```bash
npx convex dev
```

This will:
- Create a Convex account (if needed)
- Set up your database
- Generate all necessary API files
- Create `.env.local` with your Convex URL

**Keep this terminal running!**

### Step 2: Start Next.js (in a new terminal)

Open a **second terminal window** and run:

```bash
npm run dev
```

### Step 3: Optional - Add Gemini API Key

If you want the chatbot to work, add your Gemini API key to `.env.local`:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

Get your key from: https://makersuite.google.com/app/apikey

### Step 4: Open Browser

Navigate to: http://localhost:3000

---

## What You'll See

- If Convex is **not** initialized: You'll see a helpful error message with instructions
- If Convex **is** initialized: The app will load normally

## Common Issues

### "Convex Not Configured" message
→ Run `npx convex dev` in a terminal

### Portal positioning errors / blank page
→ This happens when Convex isn't initialized. The app can't render without it.

### TypeScript errors
→ These will disappear once you run `npx convex dev` which generates the proper API files

---

## Next Steps After Setup

1. **Create an admin account**: Go to `/signup` and select "Admin" role
2. **Create slots**: Use the admin dashboard to create available time slots
3. **Create user accounts**: Users can sign up and book sessions
4. **Test the booking flow**: Login as a user and try booking a session


