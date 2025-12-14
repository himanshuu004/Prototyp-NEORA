"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

// This component syncs Clerk user to Convex database
export default function ClerkUserSync() {
  const { user: clerkUser, isLoaded } = useUser();
  const syncUser = useMutation(api.clerk.syncUser);

  useEffect(() => {
    if (isLoaded && clerkUser) {
      // Sync Clerk user to Convex
      const email = clerkUser.primaryEmailAddress?.emailAddress;
      const name = clerkUser.fullName || clerkUser.firstName || email?.split('@')[0] || "User";
      const phone = clerkUser.primaryPhoneNumber?.phoneNumber;

      if (clerkUser.id && email) {
        syncUser({
          clerkId: clerkUser.id,
          email,
          name,
          phone: phone || undefined,
        });
      }
    }
  }, [isLoaded, clerkUser, syncUser]);

  return null;
}

// Hook to get Convex user ID from Clerk user
export function useConvexUserId(): Id<"users"> | null {
  const { user: clerkUser } = useUser();
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  
  // Query Convex for the user using their Clerk ID
  const convexUser = useQuery(
    api.clerk.getByClerkId,
    clerkUser?.id ? { clerkId: clerkUser.id } : "skip"
  );

  useEffect(() => {
    if (convexUser?._id) {
      setUserId(convexUser._id);
    } else {
      setUserId(null);
    }
  }, [convexUser]);

  return userId;
}

// Hook to get Convex user from Clerk user
export function useConvexUser() {
  const { user: clerkUser } = useUser();
  
  // Query Convex for the user using their Clerk ID
  const convexUser = useQuery(
    api.clerk.getByClerkId,
    clerkUser?.id ? { clerkId: clerkUser.id } : "skip"
  );

  return convexUser;
}
