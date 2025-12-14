"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import ClerkUserSync from "./ClerkUserSync";

interface ClerkProviderWrapperProps {
  children: ReactNode;
}

export default function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // Always render ClerkProvider if we have any key
  // This prevents hooks from being called outside ClerkProvider
  if (!clerkPublishableKey) {
    // No key at all - render without ClerkProvider
    // This should not happen in production
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <ClerkUserSync />
      {children}
    </ClerkProvider>
  );
}
