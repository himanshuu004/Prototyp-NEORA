import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    date: v.string(),
    time: v.string(),
    duration: v.number(),
    status: v.union(v.literal("available"), v.literal("blocked")),
    createdBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    const slotId = await ctx.db.insert("slots", {
      date: args.date,
      time: args.time,
      duration: args.duration || 45,
      status: args.status,
      createdBy: args.createdBy,
      createdAt: Date.now(),
    });
    return slotId;
  },
});

export const getByDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("slots")
      .withIndex("by_date", (q: any) => q.eq("date", args.date))
      .collect();
  },
});

export const getAvailable = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("slots")
      .withIndex("by_date", (q: any) => q.eq("date", args.date))
      .filter((q: any) => q.eq(q.field("status"), "available"))
      .collect();
  },
});

export const updateStatus = mutation({
  args: {
    slotId: v.id("slots"),
    status: v.union(v.literal("available"), v.literal("booked"), v.literal("blocked")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.slotId, {
      status: args.status,
    });
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("slots").collect();
  },
});

