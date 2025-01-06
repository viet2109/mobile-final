import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="recipient" options={{ headerShown: false }} />
      <Stack.Screen name="purpose" options={{ headerShown: false }} />
      <Stack.Screen name="amount" options={{ headerShown: false }} />
      <Stack.Screen name="pay" options={{ headerShown: false }} />
    </Stack>
  );
}
