"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { users, User } from "@/lib/storage";

// This component syncs Clerk user to localStorage
export default function ClerkUserSync() {
  const { user: clerkUser, isLoaded } = useUser();
  const [convexUser, setConvexUser] = useState<User | null>(null);

  useEffect(() => {
    if (isLoaded && clerkUser) {
      // Sync Clerk user to localStorage
      const existingUser = users.getByClerkId(clerkUser.id);
      
      if (existingUser) {
        // Update existing user
        const updated = users.update(existingUser._id, {
          email: clerkUser.primaryEmailAddress?.emailAddress || existingUser.email,
          name: clerkUser.fullName || clerkUser.firstName || existingUser.name,
          phone: clerkUser.primaryPhoneNumber?.phoneNumber || existingUser.phone,
        });
        setConvexUser(updated);
      } else {
        // Check if user exists by email
        const existingByEmail = users.getByEmail(clerkUser.primaryEmailAddress?.emailAddress || "");
        
        if (existingByEmail) {
          // Update existing user with clerkId
          const updated = users.update(existingByEmail._id, {
            clerkId: clerkUser.id,
            phone: clerkUser.primaryPhoneNumber?.phoneNumber || existingByEmail.phone,
          });
          setConvexUser(updated);
        } else {
          // Create new user
          const isAdmin = clerkUser.primaryEmailAddress?.emailAddress === "priyankarawat00@gmail.com";
          const newUser = users.create({
            clerkId: clerkUser.id,
            email: clerkUser.primaryEmailAddress?.emailAddress || "",
            name: clerkUser.fullName || clerkUser.firstName || "User",
            phone: clerkUser.primaryPhoneNumber?.phoneNumber,
            role: isAdmin ? "admin" : "user",
          });
          setConvexUser(newUser);
        }
      }
    } else if (isLoaded && !clerkUser) {
      setConvexUser(null);
    }
  }, [isLoaded, clerkUser]);

  return null;
}

// Hook to get localStorage user ID from Clerk user
export function useConvexUserId(): string | null {
  const { user: clerkUser } = useUser();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (clerkUser?.id) {
      const user = users.getByClerkId(clerkUser.id);
      setUserId(user?._id || null);
    } else {
      setUserId(null);
    }
  }, [clerkUser]);

  return userId;
}

// Hook to get localStorage user from Clerk user
export function useConvexUser(): User | null {
  const { user: clerkUser } = useUser();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (clerkUser?.id) {
      const foundUser = users.getByClerkId(clerkUser.id);
      setUser(foundUser);
    } else {
      setUser(null);
    }
  }, [clerkUser]);

  return user;
}
