import { Tabs, usePathname, useRouter } from "expo-router";
import Tabbar from "../../components/tabbar";
import Material from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "nativewind";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SegmentedProgressBar from "../../components/SegmentedProgressBar";
import { useEffect, useState } from "react";

export default function TabLayout() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("home")) {
      setCurrentIndex(0);
    } else if (pathname.includes("create")) {
      setCurrentIndex(1);
    }
  }, [pathname]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row justify-between items-center mb-6 ">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center "
        >
          <Material
            name="arrow-back-ios"
            size={26}
            color="black"
            className="dark:!text-white ml-4"
          />
        </TouchableOpacity>
      </View>
      <SegmentedProgressBar len={3} activeIndex={currentIndex} />

      <Tabs
        screenOptions={{
          tabBarStyle: {
            display: "none", // Ẩn tab bar nếu không muốn hiển thị
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            headerShown: false,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
