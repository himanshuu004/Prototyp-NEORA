"use client";

// Re-export hooks from ClerkHooks
export { useConvexUserId, useConvexUser } from "./ClerkHooks";

// This component syncs Clerk user to localStorage
// Only renders when ClerkProvider is available
export default function ClerkUserSync() {
  // This component is now a no-op when ClerkProvider is not available
  // The actual sync logic is handled in ClerkUserSyncInner
  return null;
}
