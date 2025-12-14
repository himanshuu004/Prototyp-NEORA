import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("sessions").collect();
  },
});

export const get = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.sessionId);
  },
});

export const create = mutation({
  args: {
    userId: v.id("users"),
    childId: v.optional(v.id("children")),
    slotId: v.id("slots"),
    therapyType: v.string(),
    concern: v.string(),
    sessionDate: v.string(),
    sessionTime: v.string(),
  },
  handler: async (ctx, args) => {
    // Update slot status to booked
    await ctx.db.patch(args.slotId, { status: "booked" });
    
    return await ctx.db.insert("sessions", {
      ...args,
      status: "scheduled",
      bookedAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    sessionId: v.id("sessions"),
    status: v.union(v.literal("scheduled"), v.literal("completed"), v.literal("cancelled")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sessionId, { status: args.status });
  },
});
