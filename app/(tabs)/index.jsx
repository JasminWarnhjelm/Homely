import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Text, TouchableOpacity } from "react-native";
import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/Header";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  // Fetch todos from Convex
  const todos = useQuery(api.todos.getTodos);
  // Define mutations
  const addTodo = useMutation(api.todos.addTodo);
  // Define mutation to clear all todos
  const clearAllTodos = useMutation(api.todos.clearAllTodos);

  console.log(todos);
  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar style={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />




        {/* Adds a new todo walk the dog */}
        <TouchableOpacity onPress={() => addTodo({ text: "Walk the dog"})}>
          <Text>Add a new todo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => clearAllTodos()}>
          <Text>Clear all todos</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
