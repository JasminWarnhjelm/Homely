import { View, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ShoppingListDetails() {
  const { id } = useLocalSearchParams();
  const listId = id;

  const items = useQuery(api.shoppingItems.getShoppingItemsByList, {
    listId,
  });

  if (!items) return null;

  return (
    <View style={{ flex: 1, padding: 50}}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text>← Takaisin</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
        {id}
      </Text>

      {items.length === 0 ? (
        <Text>Lista on tyhjä</Text>
      ) : (
        items.map(item => (
          <Text key={item._id}>
            {item.purchased ? "✅" : "⬜"} {item.text}
          </Text>
        ))
      )}
    </View>
  );
}
