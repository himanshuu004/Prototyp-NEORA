import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
    const childId = await ctx.db.insert("children", {
      userId: args.userId,
      name: args.name,
      age: args.age,
      diagnosis: args.diagnosis,
      therapyPlan: args.therapyPlan,
      notes: args.notes,
      createdAt: Date.now(),
    });
    return childId;
  },
});

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("children")
      .withIndex("by_user", (q: any) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("children").collect();
  },
});

export const search = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("children").collect();
    return all.filter((child: any) =>
      child.name.toLowerCase().includes(args.searchTerm.toLowerCase())
    );
  },
});

export const get = query({
  args: { childId: v.id("children") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.childId);
  },
});

export const update = mutation({
  args: {
    childId: v.id("children"),
    name: v.optional(v.string()),
    age: v.optional(v.number()),
    diagnosis: v.optional(v.string()),
    therapyPlan: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { childId, ...updates } = args;
    await ctx.db.patch(childId, updates);
  },
});

