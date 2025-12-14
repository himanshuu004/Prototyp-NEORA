"use client";

export default function SeedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin User</h1>
        <p className="text-gray-600 mb-4">
          Admin user is automatically created when you sign in with Clerk using:
          <br />
          <strong>Email:</strong> priyankarawat00@gmail.com
        </p>
        <p className="text-sm text-gray-500">
          No seeding needed - Clerk authentication handles user creation automatically.
        </p>
      </div>
    </div>
  );
}
