import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getTodos = query({
    // Fetch all todos ordered by creation date descending
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").order("desc").collect();
        return todos;
    }
})

export const addTodo = mutation({
    // Add a new todo item
    args: {text: v.string()},
    handler: async(ctx, args) => {
        const todoId = await ctx.db.insert("todos", {
            text: args.text,
            isCompleted: false,
        });
        return todoId;
    }
})

export const toggleTodo = mutation({
    args: { id: v.id("todos") },
    // Toggle the completion status of a todo item
    handler: async(ctx, args) => {
        const todo = await ctx.db.get(args.id);
        if (!todo) {
            throw new ConvexError("Todo not found");
        }
        await ctx.db.patch(args.id, {
            isCompleted: !todo.isCompleted,
        });
    }
})

export const deleteTodo = mutation({
    args: { id: v.id("todos")},
    // Delete a todo item
    handler: async(ctx, args) => {
        await ctx.db.delete(args.id);
    }
})

export const updateTodo = mutation({
    args: {
        id: v.id("todos"),
        text: v.string(),
    },
    // Update the text of a todo item
    handler: async(ctx, args) => {
        await ctx.db.patch(args.id, {
            text: args.text,
        });
    }
})

export const clearAllTodos = mutation({
    // Delete all todo items
    handler: async(ctx) => {
        const allTodos = await ctx.db.query("todos").collect();
        // Delete each todo
        for (const todo of allTodos) {
            await ctx.db.delete(todo._id);
        }

        return { deletedCount: allTodos.length };
    }
})
