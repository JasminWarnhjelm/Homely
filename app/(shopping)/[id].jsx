import { createShoppingStyles } from "@/assets/styles/shoppingList.styles";
import { View, Text, StatusBar, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { useLocalSearchParams} from "expo-router";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import ItemInput from "@/components/ItemInput";
import { Provider } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from "@expo/vector-icons";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import EmptyStateItems from "@/components/EmptyStateItems";




export default function ShoppingListDetails() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams();
  const listId = id;
  console.log("listId:", listId);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const shoppingStyles = createShoppingStyles(colors);

    // Fetch items from Convex
  const items = useQuery(
    api.shoppingItems.getShoppingItemsByList,
    listId ? { listId } : null
  );

  // hae listan tiedot
  const list = useQuery(
    api.lists.getLists,
    listId ? { id: listId } : null
  );

  // Update item mutation
  const toggleItem = useMutation(api.shoppingItems.toggleShoppingItem);
  // Delete item mutation
  const deleteItem = useMutation(api.shoppingItems.deleteShoppingItem);
  // Update item mutation
  const updateItem = useMutation(api.shoppingItems.updateShoppingItem);

  const isLoading = !items || !list;

  const handleToggleItem = async (id) => {
    try {
      await toggleItem({id})
    } catch (error) {
      console.log("Error toggling item", error);
      Alert.alert("Error", "Failed to toggle item");
    }
  }

  const handleDeleteItem = async (id) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      {text:"Cancel", style: "cancel"},
      {text:"Delete", style: "destructive", onPress: () => deleteItem({ id })},
    ]);
  };

  const handleEditItem = (item) => {
    setEditText(item.name);
    setEditingId(item._id);
  };

  const handleSaveEdit = async () => {
    if (editingId) {
      try {
        await updateItem({id: editingId, name: editText.trim()});
        setEditingId(null);
        setEditText("");
      } catch (error) {
        console.log("Error updating item", error);
        Alert.alert("Error", "Failed to update item");
      }
    }
  };
  const handleCancelEdit = () => {
    setEditingId(null);

  };

  if (isLoading) return <LoadingSpinner />;

  const renderItemItem = ({ item }) => {
    const isEditing = editingId === item._id;

    return (
      <View style={shoppingStyles.itemItemWrapper}>
        <LinearGradient colors={colors.gradients.surface}
          style={shoppingStyles.itemItem}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={shoppingStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleItem(item._id)}
          >
            <LinearGradient
              colors={item.purchased ? colors.gradients.success :
              colors.gradients.muted}
              style={[
                shoppingStyles.checkboxInner,
                { borderColor: item.purchased ? "transparent" : colors.border },
              ]}
            >
              {item.purchased && <Ionicons name="checkmark" size={18} color="#ffffff" />}
            </LinearGradient>
          </TouchableOpacity>


          {isEditing ? (
            <View style={shoppingStyles.editContainer}>
              <TextInput
                style={shoppingStyles.editInput}
                value={editText}
                onChangeText={setEditText}
                autoFocus // focus the input when editing
                multiline
                placeholder="Edit your item..."
                placeholderTextColor={colors.textMuted}
              />
              <View style={shoppingStyles.editButtons}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.success} style={shoppingStyles.editButton}>
                    <Ionicons name="checkmark" size={18} color={colors.text} />
                    <Text style={shoppingStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.muted} style={shoppingStyles.editButton}>
                    <Ionicons name="close" size={18} color={colors.text} />
                    <Text style={shoppingStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
          <View style={shoppingStyles.itemTextContainer}>
            <Text
              style={[
                shoppingStyles.itemText,
                item.purchased && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.name}
            </Text>

            <View style={shoppingStyles.itemActions}>
              <TouchableOpacity onPress={() => handleEditItem(item)} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.warning} style={shoppingStyles.actionButton}>
                  <Ionicons name="pencil" size={18} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteItem(item._id)} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.danger} style={shoppingStyles.actionButton}>
                  <Ionicons name="trash" size={18} color="#ffffff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          )}
        </LinearGradient>
      </View>
    )
  }

  if(isLoading) return <LoadingSpinner />;

  return (
    <Provider>
      <LinearGradient colors={colors.gradients.background} style={shoppingStyles.container}>
        <StatusBar barStyle={colors.statusBarStyle} />
        <SafeAreaView style={shoppingStyles.safeArea} >
          <View style={shoppingStyles.header}>
              <View style={shoppingStyles.titleContainer}>
                  {/* Icon Container */}
                  <LinearGradient colors={colors.gradients.primary} style={shoppingStyles.iconContainer}>
                      <AntDesign name="shopping-cart" size={35} color={"#ffffff"} />
                  </LinearGradient>
                  {/* Title and Subtitle */}
                  <View style={shoppingStyles.titleTextContainer}>
                      <Text style={shoppingStyles.title}>Shopping Lists</Text>
                      <Text style={shoppingStyles.subtitle}>{` items on this shopping list`}</Text>
                  </View>
              </View>
            </View>

            <ItemInput listId={listId}/>

            <FlatList
              data={items}
              renderItem={renderItemItem}
              keyExtractor={(item) => item._id}
              style={shoppingStyles.itemList}
              contentContainerStyle={shoppingStyles.itemListContent}
              ListEmptyComponent={<EmptyStateItems />}
              showsVerticalScrollIndicator={false}
            />

        </SafeAreaView>
      </LinearGradient>
    </Provider>
  );
}
