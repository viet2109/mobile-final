import { Tabs } from "expo-router";
import Tabbar from "../../../components/tabbar";
import { useColorScheme } from "nativewind";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3b82f6",
        tabBarShowLabel: false,
        headerShown: false,
        // tabBarStyle: {
        //   backgroundColor: colorScheme === "dark" ? "#121212" : "#f2f2f2",
        // },
      }}
      tabBar={(props: BottomTabBarProps) => <Tabbar {...props} />}
      sceneContainerStyle={{
        backgroundColor: colorScheme === "dark" ? "#121212" : "#f2f2f2",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scanner",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
