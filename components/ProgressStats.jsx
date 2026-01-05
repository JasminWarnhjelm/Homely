import { View, Text } from 'react-native'
import React, { use } from 'react'
import { createProfileStyles } from "@/assets/styles/profile.styles";
import useTheme from "@/hooks/useTheme";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ProgressStats = () => {
    const { colors } = useTheme();
    const profileStyles = createProfileStyles(colors);

    const todos = useQuery(api.todos.getTodos); // Fetch todos from Convex
    const totalTodos = todos ? todos.length : 0; // total number of todos
    const completedTodos = todos ? todos.filter((todo) => todo.isCompleted).length : 0; // only count completed todos
    const activeTodos = totalTodos - completedTodos; // active todos

  return (
    <LinearGradient colors={colors.gradients.surface} style={profileStyles.section}>
        <Text style={profileStyles.sectionTitle}>Progress Stats</Text>

        <View style={profileStyles.statsContainer}>
            {/* Total Todos Card */}
            <LinearGradient
            colors={colors.gradients.background}
            style={[profileStyles.statCard, { borderLeftColor: colors.primary }]}
            >
                <View style={profileStyles.statIconContainer}>
                    <LinearGradient colors={colors.gradients.primary} style={profileStyles.statIcon}>
                        <Ionicons name="list" size={24} color="#ffffff" />
                    </LinearGradient>
                </View>

                <View>
                    <Text style={profileStyles.statNumber}>{totalTodos}</Text>
                    <Text style={profileStyles.statLabel}>Total Todos</Text>
                </View>
            </LinearGradient>

            {/* Completed Todos Card */}
            <LinearGradient
            colors={colors.gradients.background}
            style={[profileStyles.statCard, { borderLeftColor: colors.success }]}
            >
                <View style={profileStyles.statIconContainer}>
                    <LinearGradient colors={colors.gradients.success} style={profileStyles.statIcon}>
                        <Ionicons name="checkmark-circle" size={22} color="#ffffff" />
                    </LinearGradient>
                </View>

                <View>
                    <Text style={profileStyles.statNumber}>{completedTodos}</Text>
                    <Text style={profileStyles.statLabel}>Completed Todos</Text>
                </View>
            </LinearGradient>

            {/* Active Todos Card */}
            <LinearGradient
            colors={colors.gradients.background}
            style={[profileStyles.statCard, { borderLeftColor: colors.warning }]}
            >
                <View style={profileStyles.statIconContainer}>
                    <LinearGradient colors={colors.gradients.warning} style={profileStyles.statIcon}>
                        <Ionicons name="time" size={22} color="#ffffff" />
                    </LinearGradient>
                </View>

                <View>
                    <Text style={profileStyles.statNumber}>{activeTodos}</Text>
                    <Text style={profileStyles.statLabel}>Active Todos</Text>
                </View>
            </LinearGradient>
        </View>


    </LinearGradient>
  )
}
export default ProgressStats