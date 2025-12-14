/* eslint-disable */
/**
 * Generated types for Convex data model.
 */

import { GenericId } from "convex/values";

export type Id<TableName extends string> = GenericId<TableName>;

export type User = {
  _id: Id<"users">;
  clerkId: string;
  email: string;
  name: string;
  phone?: string;
  role: "user" | "admin";
  createdAt: number;
};

export type Child = {
  _id: Id<"children">;
  userId: Id<"users">;
  name: string;
  age: number;
  diagnosis: string;
  therapyPlan: string;
  notes?: string;
  createdAt: number;
};

export type Slot = {
  _id: Id<"slots">;
  date: string;
  time: string;
  duration: number;
  status: "available" | "booked" | "blocked";
  createdBy: Id<"users">;
  createdAt: number;
};

export type Session = {
  _id: Id<"sessions">;
  userId: Id<"users">;
  childId?: Id<"children">;
  slotId: Id<"slots">;
  therapyType: string;
  concern: string;
  status: "scheduled" | "completed" | "cancelled";
  bookedAt: number;
  sessionDate: string;
  sessionTime: string;
};

export type Payment = {
  _id: Id<"payments">;
  userId: Id<"users">;
  sessionId?: Id<"sessions">;
  amount: number;
  status: "pending" | "completed" | "failed";
  paymentDate: number;
  notes?: string;
};

export type ProgressNote = {
  _id: Id<"progressNotes">;
  sessionId: Id<"sessions">;
  childId: Id<"children">;
  therapistId: Id<"users">;
  notes: string;
  progress: string;
  date: number;
};
