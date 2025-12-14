"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import ClerkUserSyncInner from "./ClerkUserSyncInner";

interface ClerkProviderWrapperProps {
  children: ReactNode;
}

export default function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Only render ClerkProvider if we have a valid-looking key
  // Valid Clerk keys start with pk_test_ or pk_live_
  const isValidKey = clerkPublishableKey && (
    clerkPublishableKey.startsWith("pk_test_") || 
    clerkPublishableKey.startsWith("pk_live_")
  );

  if (!isValidKey) {
    // Render without ClerkProvider - app will work but auth features won't
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <ClerkUserSyncInner />
      {children}
    </ClerkProvider>
  );
}
