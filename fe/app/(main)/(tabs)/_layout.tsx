import { Tabs, usePathname } from "expo-router";
import Tabbar from "../../../components/tabbar";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const path = usePathname();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3b82f6",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        // tabBarStyle: {
        //   backgroundColor: colorScheme === "dark" ? "#121212" : "#f2f2f2",
        // },
      }}
      tabBar={(props) => {
        if (path === "/support") return null;
        return <Tabbar {...props} />;
      }}
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
        name="spending"
        options={{
          title: "Spending",
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
        name="support"
        options={{
          title: "Support",
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
