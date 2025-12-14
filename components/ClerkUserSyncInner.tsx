"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { users } from "@/lib/storage";

// This component syncs Clerk user to localStorage
// Only called when ClerkProvider is available
export default function ClerkUserSyncInner() {
  const { user: clerkUser, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !clerkUser) return;

    // Sync Clerk user to localStorage
    const existingUser = users.getByClerkId(clerkUser.id);
    
    if (existingUser) {
      // Update existing user
      users.update(existingUser._id, {
        email: clerkUser.primaryEmailAddress?.emailAddress || existingUser.email,
        name: clerkUser.fullName || clerkUser.firstName || existingUser.name,
        phone: clerkUser.primaryPhoneNumber?.phoneNumber || existingUser.phone,
      });
    } else {
      // Check if user exists by email
      const existingByEmail = users.getByEmail(clerkUser.primaryEmailAddress?.emailAddress || "");
      
      if (existingByEmail) {
        // Update existing user with clerkId
        users.update(existingByEmail._id, {
          clerkId: clerkUser.id,
          phone: clerkUser.primaryPhoneNumber?.phoneNumber || existingByEmail.phone,
        });
      } else {
        // Create new user
        const isAdmin = clerkUser.primaryEmailAddress?.emailAddress === "priyankarawat00@gmail.com";
        users.create({
          clerkId: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress || "",
          name: clerkUser.fullName || clerkUser.firstName || "User",
          phone: clerkUser.primaryPhoneNumber?.phoneNumber,
          role: isAdmin ? "admin" : "user",
        });
      }
    }
  }, [isLoaded, clerkUser]);

  return null;
}

// Hook to get localStorage user ID from Clerk user
export function useConvexUserId(): string | null {
  // This will be called from components that are inside ClerkProvider
  // Import useUser directly where needed instead
  return null;
}

// Hook to get localStorage user from Clerk user  
export function useConvexUser() {
  // This will be called from components that are inside ClerkProvider
  // Import useUser directly where needed instead
  return null;
}

