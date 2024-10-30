import { Stack } from "expo-router/stack";
import "../index.css";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";

export default function Layout() {
  let [fontsLoaded] = useFonts({
    poppins: require("../assets/fonts/Poppins-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(main)/(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
