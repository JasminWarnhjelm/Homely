import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";


export const getShoppingItemsByList = query({
    args: {
        listId: v.id("lists"),
    },
    // Fetch all shopping items ordered by creation date descending
    handler: async (ctx, args) => {
        return await ctx.db
        .query("shoppingItems")
        .withIndex("by_list", q => q.eq("listId", args.listId))
        .order("desc")
        .collect();
    },
});

export const addShoppingItem = mutation({
  args: {
    name: v.string(),
    listId: v.id("lists"),
    quantity: v.number(),
    purchased: v.boolean()
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("shoppingItems", {
      name: args.name,
      listId: args.listId,
      quantity: args.quantity ?? 1,
      purchased: args.purchased ?? false,
    });
  },
});

export const toggleShoppingItem = mutation({
    args: { id: v.id("shoppingItems") },
    // Toggle the purchased status of a shopping item
    handler: async(ctx, args) => {
        const shoppingItem = await ctx.db.get(args.id);
        if (!shoppingItem) {
            throw new ConvexError("Shopping item not found");
        }
        await ctx.db.patch(args.id, {
            purchased: !shoppingItem.purchased,
        });
    }
})

export const deleteShoppingItem = mutation({
    args: { id: v.id("shoppingItems")},
    // Delete a shopping item
    handler: async(ctx, args) => {
        await ctx.db.delete(args.id);
    }
})

export const updateShoppingItem = mutation({
    args: {
        id: v.id("shoppingItems"),
        name: v.string(),
    },
    // Update the text of a shopping item
    handler: async(ctx, args) => {
        await ctx.db.patch(args.id, {
            name: args.name,
        });
    }
})

export const clearAllShoppingItems = mutation({
    // Delete all shopping items
    handler: async(ctx) => {
        const allShoppingItems = await ctx.db.query("shoppingItems").collect();
        // Delete each shopping item
        for (const shoppingItem of allShoppingItems) {
            await ctx.db.delete(shoppingItem._id);
        }

        return { deletedCount: allShoppingItems.length };
    }
})
