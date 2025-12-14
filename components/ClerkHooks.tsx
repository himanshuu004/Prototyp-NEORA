"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { users, User } from "@/lib/storage";

// Hook to get localStorage user ID from Clerk user
// Only works when inside ClerkProvider
export function useConvexUserId(): string | null {
  const [userId, setUserId] = useState<string | null>(null);
  // This hook must always be called (React rules), but will work only if ClerkProvider exists
  let clerkUser = null;
  try {
    const userData = useUser();
    clerkUser = userData.user;
  } catch {
    // ClerkProvider not available
    return null;
  }

  useEffect(() => {
    if (!clerkUser?.id) {
      setUserId(null);
      return;
    }
    const user = users.getByClerkId(clerkUser.id);
    setUserId(user?._id || null);
  }, [clerkUser]);

  return userId;
}

// Hook to get localStorage user from Clerk user
// Only works when inside ClerkProvider
export function useConvexUser(): User | null {
  const [user, setUser] = useState<User | null>(null);
  // This hook must always be called (React rules), but will work only if ClerkProvider exists
  let clerkUser = null;
  try {
    const userData = useUser();
    clerkUser = userData.user;
  } catch {
    // ClerkProvider not available
    return null;
  }

  useEffect(() => {
    if (!clerkUser?.id) {
      setUser(null);
      return;
    }
    const foundUser = users.getByClerkId(clerkUser.id);
    setUser(foundUser);
  }, [clerkUser]);

  return user;
}
