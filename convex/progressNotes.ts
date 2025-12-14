import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    sessionId: v.id("sessions"),
    childId: v.id("children"),
    therapistId: v.id("users"),
    notes: v.string(),
    progress: v.string(),
  },
  handler: async (ctx, args) => {
    const noteId = await ctx.db.insert("progressNotes", {
      sessionId: args.sessionId,
      childId: args.childId,
      therapistId: args.therapistId,
      notes: args.notes,
      progress: args.progress,
      date: Date.now(),
    });
    return noteId;
  },
});

export const getByChild = query({
  args: { childId: v.id("children") },
  handler: async (ctx, args) => {
    const notes = await ctx.db
      .query("progressNotes")
      .withIndex("by_child", (q: any) => q.eq("childId", args.childId))
      .collect();
    return notes;
  },
});

export const getBySession = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("progressNotes")
      .withIndex("by_session", (q: any) => q.eq("sessionId", args.sessionId))
      .collect();
  },
});

