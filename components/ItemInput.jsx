import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import useTheme from '@/hooks/useTheme';
import { createShoppingStyles } from '@/assets/styles/shoppingList.styles';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const ItemInput = ({ listId }) => {
    const { colors } = useTheme();
    const shoppingStyles = createShoppingStyles(colors);

    const [newItem, setNewItem] = useState("");
    const addItem = useMutation(api.shoppingItems.addShoppingItem);

    // Function to handle adding a new Item
    const handleAddItem = async () => {
        console.log("Item input");
        if (!newItem.trim()  || !listId) return;

        if (!listId) {
            console.log("Error: listId is undefined!");
            Alert.alert("Error", "Cannot add item: listId is missing");
            return;
        }

        try {
            await addItem({
                name: newItem.trim(),
                listId: listId,
                quantity: 1,
                purchased: false
            })
            setNewItem("");
        } catch (error) {
            console.log("Error adding a item", error);
            Alert.alert("Error", "Failed to add item");
        }
    };

    return (
        <View style={shoppingStyles.inputSection}>
            <View style={shoppingStyles.inputWrapper}>
                <TextInput
                    style={shoppingStyles.input}
                    placeholder="Add a new item"
                    value={newItem}
                    onChangeText={setNewItem} // update state on text change
                    onSubmitEditing={handleAddItem} // handle adding Item on submit
                    multiline
                    placeholderTextColor={colors.textMuted}
                />
                {/* Add Button */}
                <TouchableOpacity onPress={handleAddItem} activeOpacity={0.8}
                disabled={!newItem.trim()}>
                    {/* Gradient Background for Button */}
                    <LinearGradient
                    colors={newItem.trim() ? colors.gradients.primary : colors.gradients.muted}
                    style={[shoppingStyles.addButton, !newItem.trim() && shoppingStyles.addButtonDisabled]}
                    >
                        <Ionicons name="add" size={30} color="#ffffff" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemInput