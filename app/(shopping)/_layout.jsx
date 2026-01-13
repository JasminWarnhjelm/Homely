import { Stack } from "expo-router";

export default function ShoppingLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
        headerShown: false,
      }}
    />
  );
}
