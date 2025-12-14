import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Simple password hashing using Web Crypto API (available in Convex)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

export const signup = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.string(),
    role: v.union(v.literal("user"), v.literal("admin")),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q: any) => q.eq("email", args.email))
      .first();

    if (existing) {
      // User exists - verify password and log them in
      const isValid = await verifyPassword(args.password, existing.password);
      if (isValid) {
        // Password matches - return user without password (auto-login)
        const { password: _, ...userWithoutPassword } = existing;
        return { 
          userId: existing._id,
          user: userWithoutPassword,
          existing: true 
        };
      } else {
        // Password doesn't match - existing user with different password
        throw new Error("An account with this email already exists. Please use the correct password or try logging in.");
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(args.password);

    // Create new user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      password: hashedPassword,
      name: args.name,
      role: args.role,
      createdAt: Date.now(),
    });

    // Get the newly created user
    const newUser = await ctx.db.get(userId);
    if (!newUser) {
      throw new Error("Failed to create user");
    }

    const { password: _, ...userWithoutPassword } = newUser;
    return { 
      userId,
      user: userWithoutPassword,
      existing: false 
    };
  },
});

export const login = query({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Get user directly from database
      const user = await ctx.db
        .query("users")
        .withIndex("by_email", (q: any) => q.eq("email", args.email))
        .first();

      if (!user) {
        return null;
      }

      // Verify password (this is just computation, works in queries)
      const isValid = await verifyPassword(args.password, user.password);
      if (!isValid) {
        return null;
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      // Return null on any error
      return null;
    }
  },
});

export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
});

