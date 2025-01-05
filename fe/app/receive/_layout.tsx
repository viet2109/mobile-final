import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="qrReceive" options={{ headerShown: false }} />

      <Stack.Screen name="sender" options={{ headerShown: false }} />
      <Stack.Screen name="purpose" options={{ headerShown: false }} />
      <Stack.Screen name="amount" options={{ headerShown: false }} />
      <Stack.Screen name="paid" options={{ headerShown: false }} />
    </Stack>
  );
}
