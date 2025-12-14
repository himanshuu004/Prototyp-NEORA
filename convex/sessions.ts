import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
    await ctx.db.patch(args.slotId, {
      status: "booked",
    });

    const sessionId = await ctx.db.insert("sessions", {
      userId: args.userId,
      childId: args.childId,
      slotId: args.slotId,
      therapyType: args.therapyType,
      concern: args.concern,
      status: "scheduled",
      bookedAt: Date.now(),
      sessionDate: args.sessionDate,
      sessionTime: args.sessionTime,
    });

    return sessionId;
  },
});

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("sessions")
      .withIndex("by_user", (q: any) => q.eq("userId", args.userId))
      .collect();

    // Populate related data
    const sessionsWithDetails = await Promise.all(
      sessions.map(async (session) => {
        const slot = await ctx.db.get(session.slotId);
        const child = session.childId ? await ctx.db.get(session.childId) : null;
        return { ...session, slot, child };
      })
    );

    return sessionsWithDetails;
  },
});

export const getAll = query({
  handler: async (ctx) => {
    const sessions = await ctx.db.query("sessions").collect();
    const sessionsWithDetails = await Promise.all(
      sessions.map(async (session) => {
        const slot = await ctx.db.get(session.slotId);
        const user = await ctx.db.get(session.userId);
        const child = session.childId ? await ctx.db.get(session.childId) : null;
        return { ...session, slot, user, child };
      })
    );
    return sessionsWithDetails;
  },
});

export const updateStatus = mutation({
  args: {
    sessionId: v.id("sessions"),
    status: v.union(v.literal("scheduled"), v.literal("completed"), v.literal("cancelled")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sessionId, {
      status: args.status,
    });
  },
});

