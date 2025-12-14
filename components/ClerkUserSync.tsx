"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { users, User } from "@/lib/storage";

// This component syncs Clerk user to localStorage
export default function ClerkUserSync() {
  // Always call hook (React requirement) - it will work if ClerkProvider is present
  const { user: clerkUser, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !clerkUser) return;
    
    if (clerkUser) {
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
    }
  }, [isLoaded, clerkUser]);

  return null;
}

// Hook to get localStorage user ID from Clerk user
export function useConvexUserId(): string | null {
  const [userId, setUserId] = useState<string | null>(null);
  const { user: clerkUser } = useUser();

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
export function useConvexUser(): User | null {
  const [user, setUser] = useState<User | null>(null);
  const { user: clerkUser } = useUser();

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
