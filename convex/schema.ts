import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(), // Clerk user ID
    email: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin")),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_clerkId", ["clerkId"])
    .index("by_role", ["role"]),

  children: defineTable({
    userId: v.id("users"),
    name: v.string(),
    age: v.number(),
    diagnosis: v.string(),
    therapyPlan: v.string(),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_name", ["name"]),

  slots: defineTable({
    date: v.string(), // ISO date string
    time: v.string(), // "HH:MM" format
    duration: v.number(), // in minutes (45)
    status: v.union(v.literal("available"), v.literal("booked"), v.literal("blocked")),
    createdBy: v.id("users"), // admin who created it
    createdAt: v.number(),
  })
    .index("by_date", ["date"])
    .index("by_status", ["status"])
    .index("by_date_status", ["date", "status"]),

  sessions: defineTable({
    userId: v.id("users"),
    childId: v.optional(v.id("children")),
    slotId: v.id("slots"),
    therapyType: v.string(), // "Speech Therapy", "OT", etc.
    concern: v.string(),
    status: v.union(v.literal("scheduled"), v.literal("completed"), v.literal("cancelled")),
    bookedAt: v.number(),
    sessionDate: v.string(),
    sessionTime: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_slot", ["slotId"])
    .index("by_status", ["status"])
    .index("by_child", ["childId"]),

  payments: defineTable({
    userId: v.id("users"),
    sessionId: v.optional(v.id("sessions")),
    amount: v.number(),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
    paymentDate: v.number(),
    notes: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  progressNotes: defineTable({
    sessionId: v.id("sessions"),
    childId: v.id("children"),
    therapistId: v.id("users"),
    notes: v.string(),
    progress: v.string(),
    date: v.number(),
  })
    .index("by_session", ["sessionId"])
    .index("by_child", ["childId"]),
});
