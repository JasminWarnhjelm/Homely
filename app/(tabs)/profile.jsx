import { createProfileStyles } from "@/assets/styles/profile.styles";
import useTheme from "@/hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function Profile() {
  const { toggleDarkMode, colors } = useTheme();

  const profileStyles = createProfileStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={profileStyles.container}>
      <StatusBar style={colors.statusBarStyle} />
      <SafeAreaView style={profileStyles.safeArea} >
        <Text style={profileStyles.content}>Edit app/profile.tsx to edit this screen.</Text>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text style={profileStyles.content}>Toggle Dark Mode</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}
