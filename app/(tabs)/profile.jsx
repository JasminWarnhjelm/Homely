import { createProfileStyles } from "@/assets/styles/profile.styles";
import useTheme from "@/hooks/useTheme";
import { ScrollView, Text, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import ProgressStats from "../../components/ProgressStats";
import Preferences from "../../components/Preferences";
import DangerZone from "../../components/DangerZone";
import Feather from '@expo/vector-icons/Feather';


export default function Profile() {

  const {colors} = useTheme();

  const profileStyles = createProfileStyles(colors);

  return (
    <LinearGradient colors={colors.gradients.background} style={profileStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle}/>
      <SafeAreaView style={profileStyles.safeArea} >
        {/* Header Section */}
        <View style={profileStyles.header}>
          <View style={profileStyles.titleContainer}>
              <LinearGradient colors={colors.gradients.primary} style={profileStyles.iconContainer}>
                <Feather name="user" size={35} color={"#ffffff"} />
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
