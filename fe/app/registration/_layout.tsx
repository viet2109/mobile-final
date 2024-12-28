import { Tabs, usePathname, useRouter } from "expo-router";
import Tabbar from "../../components/tabbar";
import Material from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "nativewind";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SegmentedProgressBar from "../../components/SegmentedProgressBar";
import { useEffect, useState } from "react";
import Registration from "./home";
import Confirm from "./confirm";
import CreateAccount from "./create";

export default function TabLayout() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleBack = () => {
    if (currentIndex === 0) {
      router.back();
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-row justify-between items-center mb-6 ">
        <TouchableOpacity
          onPress={handleBack}
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

      {currentIndex === 0 && <Registration onClickSignUp={() => setCurrentIndex(1)}/>}
      {currentIndex === 1 && <CreateAccount onClickYes={() => setCurrentIndex(2)}/>}
      {currentIndex === 2 && <Confirm />}
    </SafeAreaView>
  );
}
