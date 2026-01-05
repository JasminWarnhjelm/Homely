import { View, Text, TouchableOpacity, Switch } from 'react-native'
import { useState } from 'react'
import useTheme from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { createProfileStyles } from '../assets/styles/profile.styles';
import { Ionicons } from '@expo/vector-icons';

const Preferences = () => {
    const [isAutoSync, setIsAutoSync] = useState(true);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
    const { isDarkMode, toggleDarkMode, colors} = useTheme();

    const profileStyles = createProfileStyles(colors);
  return (
    <LinearGradient colors={colors.gradients.surface} style={profileStyles.section}>
        <Text style={profileStyles.sectionTitle}>Preferences</Text>

        {/* Dark Mode Toggle */}
        <View style={profileStyles.profileItem}>
            <View style={profileStyles.profileLeft}>
                <LinearGradient colors={colors.gradients.primary}style={profileStyles.profileIcon}>
                    <Ionicons name="moon" size={18} color="#ffffff" />
                </LinearGradient>
                <Text style={profileStyles.profileText}>Dark Mode</Text>
            </View>
            <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                thumbColor={"#fffff"}
                trackColor={{ false: colors.border, true: colors.primary }}
                ios_backgroundColor={colors.border}
            />
        </View>

        {/* Notifications Toggle Just UI*/}
        <View style={profileStyles.profileItem}>
            <View style={profileStyles.profileLeft}>
                <LinearGradient colors={colors.gradients.warning}style={profileStyles.profileIcon}>
                    <Ionicons name="notifications" size={18} color="#ffffff" />
                </LinearGradient>
                <Text style={profileStyles.profileText}>Notifications</Text>
            </View>
            <Switch
                value={isNotificationsEnabled}
                onValueChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
                thumbColor={"#fffff"}
                trackColor={{ false: colors.border, true: colors.warning }}
                ios_backgroundColor={colors.border}
            />
        </View>

        {/* Auto sync Just UI*/}
        <View style={profileStyles.profileItem}>
            <View style={profileStyles.profileLeft}>
                <LinearGradient colors={colors.gradients.success}style={profileStyles.profileIcon}>
                    <Ionicons name="notifications" size={18} color="#ffffff" />
                </LinearGradient>
                <Text style={profileStyles.profileText}>Auto Sync</Text>
            </View>
            <Switch
                value={isAutoSync}
                onValueChange={() => setIsAutoSync(!isAutoSync)}
                thumbColor={"#fffff"}
                trackColor={{ false: colors.border, true: colors.success }}
                ios_backgroundColor={colors.border}
            />
        </View>

    </LinearGradient>  )
}

export default Preferences