"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "";

// Only create client if URL is provided
let convex: ConvexReactClient | null = null;
if (convexUrl) {
  try {
    convex = new ConvexReactClient(convexUrl);
  } catch (error) {
    console.error("Failed to initialize Convex client:", error);
  }
}

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  if (!convex || !convexUrl) {
    // If Convex is not configured, render children without ConvexProvider
    // The app will work but won't have real-time database features
    return <>{children}</>;
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

