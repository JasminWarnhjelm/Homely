import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";

// run npx convex dev
export default defineSchema({
    todos: defineTable({
        text: v.string(),
        isCompleted: v.boolean(),
    }),
    shoppingItems: defineTable({
        name: v.string(),
        quantity: v.number(),
        purchased: v.boolean(),
    }),
    users: defineTable({
        name: v.string(),
        email: v.string(),
    }),
});