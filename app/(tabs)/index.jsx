import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Text, View, TouchableOpacity } from "react-native";

export default function Index() {

  // Fetch todos from Convex
  const todos = useQuery(api.todos.getTodos);
  // Define mutations
  const addTodo = useMutation(api.todos.addTodo);
  // Define mutation to clear all todos
  const clearAllTodos = useMutation(api.todos.clearAllTodos);

  console.log(todos);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>

      {/* Adds a new todo walk the dog */}
      <TouchableOpacity onPress={() => addTodo({ text: "Walk the dog"})}>
        <Text>Add a new todo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => clearAllTodos()}>
        <Text>Clear all todos</Text>
      </TouchableOpacity>
    </View>
  );
}
