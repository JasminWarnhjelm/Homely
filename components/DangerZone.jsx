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
    const clearAllLists = useMutation(api.lists.clearAllLists);


    const handleResetTodos = async () => {
        Alert.alert(
            "Reset Todos",
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
                                "Todos reset",
                                `Successfully deleted ${result.deletedCount} todo${result.deletedCount === 1 ? "" : "s"}. Your app has been reset.`
                            );
                        } catch (error) {
                            console.log("Error resetting todos", error);
                            Alert.alert("Error", "Failed to reset todos");
                        }
                    },
                },
            ]
        )
    };

    const handleResetLists = async () => {
        Alert.alert(
            "Reset Lists",
            "This will delete all your lists permanently. This action cannot be undone. Are you sure you want to proceed?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete All",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await clearAllLists();
                            Alert.alert(
                                "Lists Reset",
                                `Successfully deleted ${result.deletedCount} list${result.deletedCount === 1 ? "" : "s"}. Your app has been reset.`
                            );
                        } catch (error) {
                            console.log("Error resetting lists", error);
                            Alert.alert("Error", "Failed to reset lists");
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
                onPress={handleResetTodos}
                activeOpacity={0.7}
            >
                <View style={profileStyles.actionLeft}>
                    <LinearGradient colors={colors.gradients.danger} style={profileStyles.actionIcon}>
                        <Ionicons name="trash" size={18} color="#ffffff" />
                    </LinearGradient>
                    <Text style={profileStyles.actionTextDanger}>Reset Todos</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[profileStyles.actionButton, { borderBottomWidth: 0 }]}
                onPress={handleResetLists}
                activeOpacity={0.7}
            >
                <View style={profileStyles.actionLeft}>
                    <LinearGradient colors={colors.gradients.danger} style={profileStyles.actionIcon}>
                        <Ionicons name="trash" size={18} color="#ffffff" />
                    </LinearGradient>
                    <Text style={profileStyles.actionTextDanger}>Reset Lists</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default DangerZone