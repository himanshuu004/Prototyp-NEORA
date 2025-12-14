import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("children")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("children").collect();
  },
});

export const get = query({
  args: { childId: v.id("children") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.childId);
  },
});

export const create = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    age: v.number(),
    diagnosis: v.string(),
    therapyPlan: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("children", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
