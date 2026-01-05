import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import useTheme from '@/hooks/useTheme';
import { createHomeStyles } from '@/assets/styles/home.styles';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const TodoInput = () => {
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);

    const [newTodo, setNewTodo] = useState("");
    const addTodo = useMutation(api.todos.addTodo);

    // Function to handle adding a new todo
    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            try {
                await addTodo({text: newTodo.trim()})
                setNewTodo("");
            } catch (error) {
                console.log("Error adding a todo", error);
                Alert.alert("Error", "Failed to add todo");
            }
        }
    };

    return (
        <View style={homeStyles.inputSection}>
            <View style={homeStyles.inputWrapper}>
                <TextInput
                    style={homeStyles.input}
                    placeholder="Add a new task"
                    value={newTodo}
                    onChangeText={setNewTodo} // update state on text change
                    onSubmitEditing={handleAddTodo} // handle adding todo on submit
                    multiline
                    placeholderTextColor={colors.textMuted}
                />
                {/* Add Button */}
                <TouchableOpacity onPress={handleAddTodo} activeOpacity={0.8}
                disabled={!newTodo.trim()}>
                    {/* Gradient Background for Button */}
                    <LinearGradient
                    colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
                    style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}
                    >
                        <Ionicons name="add" size={24} color="#ffffff" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TodoInput