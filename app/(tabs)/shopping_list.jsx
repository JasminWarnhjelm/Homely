import { createShoppingStyles } from "@/assets/styles/shoppingList.styles";
import useTheme from "@/hooks/useTheme";
import { Text, View, StatusBar, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";
import EmptyStateLists from "@/components/EmptyStateLists";
import ListInput from "@/components/ListInput";
import Entypo from '@expo/vector-icons/Entypo';
import { Menu, Provider } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";


export default function ShoppingList() {
  const { colors } = useTheme();

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const [menuVisibleId, setMenuVisibleId] = useState(null);

  const shoppingStyles = createShoppingStyles(colors);

  // Fetch lists from Convex
  const lists = useQuery(api.lists.getLists);
  // Update list mutation
  const toggleList = useMutation(api.lists.toggleList);
  // Delete list mutation
  const deleteList = useMutation(api.lists.deleteList);
  // Update list mutation
  const updateList = useMutation(api.lists.updateLists);

  const totalLists = lists ? lists.length : 0;

  const isLoading = lists === undefined;

  const handleDeleteList = async (id) => {
    Alert.alert("Delete list", "Are you sure you want to delete this list?", [
      {text:"Cancel", style: "cancel"},
      {text:"Delete", style: "destructive", onPress: () => deleteList({ id })},
    ]);
  };

  const handleEditList = (list) => {
    setEditName(list.name);
    setEditingId(list._id);
  };

  const handleSaveEdit = async () => {
    if (editingId) {
      try {
        await updateList({id: editingId, name: editName.trim()});
        setEditingId(null);
        setEditName("");
      } catch (error) {
        console.log("Error updating list", error);
        Alert.alert("Error", "Failed to update list");
      }
    }
  };
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const openMenu = (id) => setMenuVisibleId(id);
  const closeMenu = () => setMenuVisibleId(null);

  const handleOpenList = (list) => {
    router.push(`/(shopping)/${list._id}`);
  }

  const renderListItem = ({ item }) => {
    const isEditing = editingId === item._id;
    return (
      <View style={shoppingStyles.listItemWrapper}>

          {isEditing ? (
            <LinearGradient colors={colors.gradients.surface}
              style={shoppingStyles.listItem}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              >
              <View style={shoppingStyles.editContainer}>
                <TextInput
                  style={shoppingStyles.editInput}
                  value={editName}
                  onChangeText={setEditName}
                  autoFocus // focus the input when editing
                  multiline
                  placeholder="Edit your list..."
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
            </LinearGradient>
          ) : (
            <LinearGradient
              colors={colors.gradients.surface}
              style={shoppingStyles.listItem}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={0.8}
              onPress={() => handleOpenList(item)}
            >
              <View style={shoppingStyles.listTextContainer}>
                <Text
                  style={shoppingStyles.listText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
              <Menu
                style={shoppingStyles.menu}
                visible={menuVisibleId === item._id}
                onDismiss={closeMenu}
                anchor={
                  <TouchableOpacity onPress={() => openMenu(item._id)}>
                    <Entypo name="dots-three-horizontal" size={24} color={colors.text}/>
                  </TouchableOpacity>
                }
                contentStyle={{
                  marginTop: 30,
                  marginRight: -20,
                  backgroundColor: colors.bg,
                  borderRadius: 10,
                  paddingVertical: 4,
                  minWidth: 140,
                  elevation: 4,       // shadow Androidilla
                }}
              >
                <Menu.Item
                  titleStyle={{ color: colors.text}}
                  onPress={() => {
                    handleEditList(item);
                    closeMenu();
                  }}
                  title="Muokkaa"
                />
                <Menu.Item
                  titleStyle={{ color: colors.text}}
                  onPress={() => {
                    handleDeleteList(item._id);
                    closeMenu();
                  }}
                  title="Poista"
                />
              </Menu>
          </LinearGradient>
          )}
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
                      <Text style={shoppingStyles.subtitle}>{`${totalLists} shopping lists`}</Text>
                  </View>
              </View>
            </View>

            <ListInput />

            <FlatList
              data={lists}
              renderItem={renderListItem}
              keyExtractor={(item) => item._id}
              style={shoppingStyles.listList}
              contentContainerStyle={shoppingStyles.listListContent}
              ListEmptyComponent={<EmptyStateLists />}
              showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
      </LinearGradient>
    </Provider>
  );
}