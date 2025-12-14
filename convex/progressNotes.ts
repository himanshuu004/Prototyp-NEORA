import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getBySession = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("progressNotes")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
  },
});

export const getByChild = query({
  args: { childId: v.id("children") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("progressNotes")
      .withIndex("by_child", (q) => q.eq("childId", args.childId))
      .collect();
  },
});

export const create = mutation({
  args: {
    sessionId: v.id("sessions"),
    childId: v.id("children"),
    therapistId: v.id("users"),
    notes: v.string(),
    progress: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("progressNotes", {
      ...args,
      date: Date.now(),
    });
  },
});
