import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(main)/(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
