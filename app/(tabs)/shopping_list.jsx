import { createShoppingStyles } from "@/assets/styles/shoppingList.styles";
import useTheme from "@/hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function ShoppingList() {
  const { toggleDarkMode, colors } = useTheme();

  const shoppingStyles = createShoppingStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={shoppingStyles.container}>
      <StatusBar style={colors.statusBarStyle} />
      <SafeAreaView style={shoppingStyles.safeArea} >
        <Text style={shoppingStyles.content}>Edit app/shopping_list.tsx to edit this screen.</Text>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text style={shoppingStyles.content}>Toggle Dark Mode</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}