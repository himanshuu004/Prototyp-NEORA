# ⚠️ Convex Sync Required

The error you're seeing indicates that Convex needs to be synced to regenerate the API types.

## Quick Fix

Run this command in a **separate terminal window**:

```bash
npm run convex:dev
```

Or:

```bash
npx convex dev
```

This will:
1. Sync all Convex functions (including the new `clerk.ts` module)
2. Regenerate the API types
3. Update the schema if needed
4. Keep watching for changes

**Keep this terminal running while developing!**

## Why This Happened

The `clerk.ts` module was added after the last Convex sync, so the generated API file doesn't include it yet. Once you run `npx convex dev`, it will be included automatically.

## After Running Convex Dev

1. The error should disappear
2. The Clerk authentication will work properly
3. All Convex functions will be available

---

**Note:** You need to run `npx convex dev` in one terminal and `npm run dev` in another terminal for the app to work properly.

