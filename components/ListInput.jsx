import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import useTheme from '@/hooks/useTheme';
import { createShoppingStyles } from '@/assets/styles/shoppingList.styles';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ListInput = () => {
    const { colors } = useTheme();
    const shoppingStyles = createShoppingStyles(colors);

    const [newList, setNewList] = useState("");
    const addList = useMutation(api.lists.addlist);

    // Function to handle adding a new List
    const handleAddList = async () => {
        if (newList.trim()) {
            try {
                await addList({name: newList.trim()})
                setNewList("");
            } catch (error) {
                console.log("Error adding a list", error);
                Alert.alert("Error", "Failed to add list");
            }
        }
    };

    return (
        <View style={shoppingStyles.inputSection}>
            <View style={shoppingStyles.inputWrapper}>
                <TextInput
                    style={shoppingStyles.input}
                    placeholder="Add a new list"
                    value={newList}
                    onChangeText={setNewList} // update state on text change
                    onSubmitEditing={handleAddList} // handle adding List on submit
                    multiline
                    placeholderTextColor={colors.textMuted}
                />
                {/* Add Button */}
                <TouchableOpacity onPress={handleAddList} activeOpacity={0.8}
                disabled={!newList.trim()}>
                    {/* Gradient Background for Button */}
                    <LinearGradient
                    colors={newList.trim() ? colors.gradients.primary : colors.gradients.muted}
                    style={[shoppingStyles.addButton, !newList.trim() && shoppingStyles.addButtonDisabled]}
                    >
                        <Ionicons name="add" size={30} color="#ffffff" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ListInput