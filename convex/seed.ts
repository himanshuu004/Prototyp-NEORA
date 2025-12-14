import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Simple password hashing using Web Crypto API (available in Convex)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Seed admin user - run this once to create the admin account
export const seedAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const adminEmail = "priyankarawat00@gmail.com";
    
    // Check if admin already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q: any) => q.eq("email", adminEmail))
      .first();

    if (existing) {
      return { message: "Admin user already exists", userId: existing._id };
    }

    // Hash password
    const hashedPassword = await hashPassword("priyanka@123");

    // Create admin user
    const userId = await ctx.db.insert("users", {
      email: adminEmail,
      password: hashedPassword,
      name: "Admin",
      role: "admin",
      createdAt: Date.now(),
    });

    return { message: "Admin user created successfully", userId };
  },
});


