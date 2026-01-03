import { createShoppingStyles } from "@/assets/styles/shoppingList.styles";
import useTheme from "@/hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function ShoppingList() {
  const { toggleDarkMode, colors } = useTheme();

  const shoppingStyles = createShoppingStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={shoppingStyles.container}>
      <StatusBar style={colors.statusBarStyle} />
      <SafeAreaView style={shoppingStyles.safeArea} >
        <View style={shoppingStyles.header}>
            <View style={shoppingStyles.titleContainer}>
                {/* Icon Container */}
                <LinearGradient colors={colors.gradients.primary} style={shoppingStyles.iconContainer}>
                    <Ionicons name="flash-outline" size={28} color="#ffffff" />
                </LinearGradient>

                {/* Title and Subtitle */}
                <View style={shoppingStyles.titleTextContainer}>
                    <Text style={shoppingStyles.title}>Shopping Lists</Text>
                    <Text style={shoppingStyles.subtitle}>{`0 shopping lists`}</Text>
                </View>
            </View>
          </View>
      </SafeAreaView>
    </LinearGradient>
  );
}