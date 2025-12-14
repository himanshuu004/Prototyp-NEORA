import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import ClerkUserSync from "@/components/ClerkUserSync";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NEORA - Therapy Clinic",
  description: "Professional therapy services for children and adults",
};

// Dynamic export to prevent static generation issues
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_dummy_for_build";

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <html lang="en">
        <body className={`${inter.className} flex flex-col min-h-screen`}>
          <ClerkUserSync />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Chatbot />
        </body>
      </html>
    </ClerkProvider>
  );
}

