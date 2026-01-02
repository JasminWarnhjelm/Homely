import { createProfileStyles } from "@/assets/styles/profile.styles";
import useTheme from "@/hooks/useTheme";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { toggleDarkMode, colors } = useTheme();

  const profileStyles = createProfileStyles(colors);

  return (
    <SafeAreaView style={profileStyles.safeArea} >
      <Text style={profileStyles.content}>Edit app/profile.tsx to edit this screen.</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text style={profileStyles.content}>Toggle Dark Mode</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
