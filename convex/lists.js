import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getLists = query({
    // Fetch all lists ordered by creation date descending
    handler: async (ctx) => {
        const lists = await ctx.db.query("lists").order("desc").collect();
        return lists;
    }
})

export const addlist = mutation({
    // Add a new list item
    args: {name: v.string()},
    handler: async(ctx, args) => {
        const listId = await ctx.db.insert("lists", {
            name: args.name,
        });
        return listId;
    }
})

export const toggleList = mutation({
    args: { id: v.id("lists") },
    // Toggle the completion status of a list item
    handler: async(ctx, args) => {
        const list = await ctx.db.get(args.id);
        if (!list) {
            throw new ConvexError("List not found");
        }
    }
})

export const deleteList = mutation({
    args: { id: v.id("lists")},
    // Delete a list item
    handler: async(ctx, args) => {
        await ctx.db.delete(args.id);
    }
})

export const updateLists = mutation({
    args: {
        id: v.id("lists"),
        name: v.string(),
    },
    // Update the name of a list item
    handler: async(ctx, args) => {
        await ctx.db.patch(args.id, {
            name: args.name,
        });
    }
})

export const clearAllLists = mutation({
    // Delete all list items
    handler: async(ctx) => {
        const allLists = await ctx.db.query("lists").collect();
        // Delete each list
        for (const list of allLists) {
            await ctx.db.delete(list._id);
        }

        return { deletedCount: allLists.length };
    }
})
