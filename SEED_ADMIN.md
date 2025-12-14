# Seed Admin User

To create the admin user in the database, run this in your browser console or create a simple page:

**Option 1: Using Convex Dashboard**
1. Go to your Convex dashboard
2. Run the `seedAdmin` mutation manually

**Option 2: Using a temporary page (Recommended)**

Create a temporary page at `app/seed/page.tsx`:

```typescript
"use client";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function SeedPage() {
  const seedAdmin = useMutation(api.seed.seedAdmin);
  
  const handleSeed = async () => {
    try {
      const result = await seedAdmin({});
      alert(result.message);
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };
  
  return (
    <div className="p-8">
      <button onClick={handleSeed} className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Admin User
      </button>
    </div>
  );
}
```

Then visit `/seed` and click the button. Delete this file after use.

**Admin Credentials:**
- Email: priyankarawat00@gmail.com
- Password: priyanka@123


