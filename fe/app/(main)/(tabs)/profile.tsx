import Material from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feature, User } from "../../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderBack from "../../../components/HeaderBack";

function Profile() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [user, setUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };
    loadData();
  }, []);


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
      iconName: "logout",
      iconColor: "bg-red-200 !text-red-500",
      title: "Logout",
      action: (
        <Material
          name="arrow-forward-ios"
          className="dark:!text-white"
          size={18}
        />
      ),
      onClick: async () => {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('user');
        router.push("welcome")
      },
    },
  ];

  return (
    <>
      <SafeAreaView className="flex-1 p-4">
        <ScrollView>
          {/* Header */}
          <HeaderBack title="Profile" />

          {/* Description */}
          <View className="flex flex-col justify-between items-center bg-white  dark:bg-[#2A2A2A] p-4 rounded-xl mb-4">
            <View className="w-full flex flex-row justify-end">
              <Material
                name="edit-note"
                size={28}
                className="dark:!text-gray-400"
              />
            </View>
            <View className="flex flex-col text-center items-center gap-1">
              <Image
                source={{
                  uri: "https://reactnative.dev/docs/assets/p_cat2.png",
                }}
                className="w-16 aspect-square rounded-full"
              />
              <Text className="dark:text-white font-semibold text-[16px] ">
                {user?.username}
              </Text>
              <Text className=" text-gray-400 ">
                {user?.email}
              </Text>
              <Text className=" text-gray-400 ">{user?.phone}</Text>
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
