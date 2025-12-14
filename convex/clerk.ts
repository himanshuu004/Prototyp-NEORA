import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Sync Clerk user to Convex database
export const syncUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists by clerkId
    const existingByClerk = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingByClerk) {
      // Update existing user
      await ctx.db.patch(existingByClerk._id, {
        email: args.email,
        name: args.name,
        phone: args.phone,
      });
      return { userId: existingByClerk._id };
    }

    // Check if user exists by email (for migration)
    const existingByEmail = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingByEmail) {
      // Update existing user with clerkId
      await ctx.db.patch(existingByEmail._id, {
        clerkId: args.clerkId,
        phone: args.phone,
      });
      return { userId: existingByEmail._id };
    }

    // Create new user (default role is "user")
    // Check if this is the admin email
    const isAdmin = args.email === "priyankarawat00@gmail.com";
    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      phone: args.phone,
      role: isAdmin ? "admin" : "user",
      createdAt: Date.now(),
    });

    return { userId };
  },
});

// Get user by Clerk ID
export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();
    return user;
  },
});

// Get user by ID
export const get = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    return user;
  },
});
