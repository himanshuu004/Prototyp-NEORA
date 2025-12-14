/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as clerk from "../clerk.js";
import type * as children from "../children.js";
import type * as users from "../users.js";
import type * as slots from "../slots.js";
import type * as sessions from "../sessions.js";
import type * as payments from "../payments.js";
import type * as progressNotes from "../progressNotes.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  clerk: typeof clerk;
  children: typeof children;
  users: typeof users;
  slots: typeof slots;
  sessions: typeof sessions;
  payments: typeof payments;
  progressNotes: typeof progressNotes;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
