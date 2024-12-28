import Material from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feature } from "../../../types";

function Profile() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const router = useRouter();

  const handleToggle = useCallback(() => {
    setIsDarkMode(!isDarkMode);
    toggleColorScheme();
  }, [isDarkMode, toggleColorScheme]);

  // Array of features
  const features: Feature[] = [
    {
      iconName: "bedtime",
      iconColor: "bg-slate-200 !text-gray-800",
      title: "Dark mode",
      action: <Switch value={isDarkMode} onChange={handleToggle} />,
    },
    {
      iconName: "person",
      iconColor: "bg-blue-100 !text-blue-500",
      title: "Personal Info",
      action: (
        <Material
          name="arrow-forward-ios"
          className="dark:!text-white"
          size={18}
        />
      ),
      onClick: () => router.push("info"),
    },
    {
      iconName: "account-balance",
      iconColor: "bg-yellow-100 !text-yellow-500",
      title: "Bank & Cards",
      action: (
        <Material
          name="arrow-forward-ios"
          className="dark:!text-white"
          size={18}
        />
      ),
    },
    {
      iconName: "payments",
      iconColor: "bg-red-100 !text-red-500",
      title: "Transaction",
      action: (
        <Material
          name="arrow-forward-ios"
          className="dark:!text-white"
          size={18}
        />
      ),
    },
    {
      iconName: "settings",
      iconColor: "bg-blue-100 !text-blue-500",
      title: "Settings",
      action: (
        <Material
          name="arrow-forward-ios"
          className="dark:!text-white"
          size={18}
        />
      ),
    },
    {
      iconName: "storage",
      iconColor: "bg-green-200 !text-green-500",
      title: "Data privacy",
      action: (
        <Material
          name="arrow-forward-ios"
          className="dark:!text-white"
          size={18}
        />
      ),
    },
  ];

  return (
    <>
      <SafeAreaView className="flex-1 p-4">
        <ScrollView>
          {/* Header */}
          <View className="flex flex-row justify-between items-center mb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center "
            >
              <Material
                name="arrow-back"
                size={26}
                color="black"
                className="dark:!text-white"
              />
            </TouchableOpacity>

            <Text className="dark:text-white font-semibold text-2xl -translate-x-4 font-poppins">
              My Profile
            </Text>
            <Text></Text>
          </View>

          {/* Description */}
          <View className="flex flex-col justify-between items-center bg-white  dark:bg-[#2A2A2A] p-4 rounded-xl mb-4">
            <View className="w-full flex flex-row justify-end">
              <Material
                name="edit-note"
                size={28}
                className="dark:!text-white"
              />
            </View>
            <View className="flex flex-col text-center items-center gap-1">
              <Image
                source={{
                  uri: "https://reactnative.dev/docs/assets/p_cat2.png",
                }}
                className="w-16 aspect-square rounded-full"
              />
              <Text className="dark:text-white font-semibold text-[16px] font-poppins">
                Nguyen Hoang Viet
              </Text>
              <Text className=" text-gray-400 font-poppins">
                nguyenhoangviet@gmail.com
              </Text>
              <Text className=" text-gray-400 font-poppins">0548228834</Text>
            </View>
          </View>

          {/* Features */}
          <View className="flex flex-col justify-between items-center bg-white dark:bg-[#2A2A2A] px-8 rounded-xl">
            {features.map((feature, index) => (
              <View
                key={index}
                className={`flex flex-row justify-between w-full items-center py-4 ${
                  index !== features.length - 1
                    ? "border-b dark:border-white border-slate-400"
                    : ""
                }`}
              >
                <TouchableOpacity
                  key={index}
                  onPress={() => feature.onClick && feature.onClick()}
                >
                  <View className="flex flex-row items-center gap-3">
                    <Material
                      name={feature.iconName}
                      size={18}
                      className={`p-2 rounded-full ${feature.iconColor}`}
                    />
                    <Text className="dark:text-white font-poppins">
                      {feature.title}
                    </Text>
                  </View>
                </TouchableOpacity>
                {feature.action}
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Profile;
