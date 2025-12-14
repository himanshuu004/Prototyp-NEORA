import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    userId: v.id("users"),
    sessionId: v.optional(v.id("sessions")),
    amount: v.number(),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const paymentId = await ctx.db.insert("payments", {
      userId: args.userId,
      sessionId: args.sessionId,
      amount: args.amount,
      status: args.status,
      paymentDate: Date.now(),
      notes: args.notes,
    });
    return paymentId;
  },
});

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const payments = await ctx.db
      .query("payments")
      .withIndex("by_user", (q: any) => q.eq("userId", args.userId))
      .collect();
    return payments;
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("payments").collect();
  },
});

export const updateStatus = mutation({
  args: {
    paymentId: v.id("payments"),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.paymentId, {
      status: args.status,
    });
  },
});

