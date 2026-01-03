import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const EmptyState = () => {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  return (
    <View style={homeStyles.emptyContainer}>
        <LinearGradient colors={colors.gradients.empty} style={homeStyles.emptyIconContainer}>
            <Ionicons name="clipboard-outline" size={60} color="#ffffff" />
        </LinearGradient>
        <Text style={homeStyles.emptyText}>No Todos Yet</Text>
        <Text style={homeStyles.emptySubtext}>Add your first todo to get started!</Text>
    </View>
    );
};

export default EmptyState;