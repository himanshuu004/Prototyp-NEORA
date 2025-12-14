"use client";

import { SignUp } from "@clerk/nextjs";

export default function Signup() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <SignUp
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-md",
            },
          }}
          routing="path"
          path="/signup"
          signInUrl="/login"
        />
      </div>
    </div>
  );
}

