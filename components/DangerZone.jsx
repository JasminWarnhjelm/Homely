import { View, Text , Alert, TouchableOpacity } from 'react-native';
import { createProfileStyles } from '@/assets/styles/profile.styles';
import useTheme from '@/hooks/useTheme';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const DangerZone = () => {
    const { colors } = useTheme();
    const profileStyles = createProfileStyles(colors);
    const clearAllTodos = useMutation(api.todos.clearAllTodos);

    const handleResetApp = async () => {
        Alert.alert(
            "Reset App",
            "This will delete all your todos permanently. This action cannot be undone. Are you sure you want to proceed?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete All",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await clearAllTodos();
                            Alert.alert(
                                "App Reset",
                                `Successfully deleted ${result.deletedCount} todo${result.deletedCount === 1 ? "" : "s"}. Your app has been reset.`
                            );
                        } catch (error) {
                            console.log("Error resetting app", error);
                            Alert.alert("Error", "Failed to reset app");
                        }
                    },
                },
            ]
        )
    };

    return (
        <LinearGradient colors={colors.gradients.surface} style={profileStyles.section}>
            <Text style={profileStyles.sectionTitleDanger}>Danger Zone</Text>

            <TouchableOpacity
                style={[profileStyles.actionButton, { borderBottomWidth: 0 }]}
                onPress={handleResetApp}
                activeOpacity={0.7}
            >
                <View style={profileStyles.actionLeft}>
                    <LinearGradient colors={colors.gradients.danger} style={profileStyles.actionIcon}>
                        <Ionicons name="trash" size={18} color="#ffffff" />
                    </LinearGradient>
                    <Text style={profileStyles.actionTextDanger}>Reset App</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default DangerZone