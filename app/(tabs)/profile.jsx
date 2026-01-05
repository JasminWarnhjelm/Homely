import { createProfileStyles } from "@/assets/styles/profile.styles";
import useTheme from "@/hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ProgressStats from "../../components/ProgressStats";
import Preferences from "../../components/Preferences";
import DangerZone from "../../components/DangerZone";

export default function Profile() {

  const {colors} = useTheme();

  const profileStyles = createProfileStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={profileStyles.container}>
      <StatusBar style={colors.statusBarStyle} />
      <SafeAreaView style={profileStyles.safeArea} >
        {/* Header Section */}
        <View style={profileStyles.header}>
          <View style={profileStyles.titleContainer}>
              <LinearGradient colors={colors.gradients.primary} style={profileStyles.iconContainer}>
                <Ionicons name="person" size={28} color="#ffffff" />
              </LinearGradient>
              {/* Title and Subtitle */}
              <View style={profileStyles.titleTextContainer}>
                  <Text style={profileStyles.title}>Profile</Text>
                  <Text style={profileStyles.subtitle}>{``}</Text>
              </View>
          </View>
        </View>
        <ScrollView style={profileStyles.scrollView}
          contentContainerStyle={profileStyles.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStats />

          {/* Preferences Section */}
          <Preferences />

          <DangerZone />

        </ScrollView>

      </SafeAreaView>
    </LinearGradient>
  );
}
