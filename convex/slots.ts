import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getByDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("slots")
      .withIndex("by_date", (q) => q.eq("date", args.date))
      .collect();
  },
});

export const getAvailable = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    // Filter by date first, then by status
    const allSlots = await ctx.db
      .query("slots")
      .withIndex("by_date", (q) => q.eq("date", args.date))
      .collect();
    return allSlots.filter((slot) => slot.status === "available");
  },
});

export const create = mutation({
  args: {
    date: v.string(),
    time: v.string(),
    duration: v.number(),
    status: v.union(v.literal("available"), v.literal("blocked")),
    createdBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("slots", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    slotId: v.id("slots"),
    status: v.union(v.literal("available"), v.literal("booked"), v.literal("blocked")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.slotId, { status: args.status });
  },
});
