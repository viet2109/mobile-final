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

function Profile() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const router = useRouter();
  const handleToggle = useCallback(() => {
    setIsDarkMode(!isDarkMode);
    toggleColorScheme();
  }, [isDarkMode, toggleColorScheme]);
  return (
    <>
      <SafeAreaView className="flex-1 p-4">
        <ScrollView>
          {/* header */}
          <View className="flex flex-row justify-between items-center mb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center "
            >
              <Material
                name="arrow-back"
                size={26}
                color="black"
                className="dark:!text-gray-400"
              />
            </TouchableOpacity>

            <Text className="dark:text-gray-400 font-semibold text-2xl -translate-x-4 ">
              My Profile
            </Text>
            <Text></Text>
          </View>

          {/* description */}
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
                Nguyen Hoang Viet
              </Text>
              <Text className=" text-gray-400 ">
                nguyenhoangviet@gmail.com
              </Text>
              <Text className=" text-gray-400 ">0548228834</Text>
            </View>
          </View>

          {/* feature */}
          <View className="flex flex-col justify-between items-center bg-white dark:bg-[#2A2A2A] px-8 rounded-xl">
            {/* dark mode */}
            <View className="flex flex-row justify-between w-full items-center py-2 border-b  border-slate-400">
              <View className="flex flex-row items-center gap-3">
                <Material
                  name="bedtime"
                  size={18}
                  className="bg-slate-200 !text-gray-800 p-2 rounded-full"
                />
                <Text className="dark:text-gray-400 ">Dark mode</Text>
              </View>
              <Switch value={isDarkMode} onChange={handleToggle} />
            </View>

            {/* personal info */}
            <View className="flex flex-row justify-between w-full items-center py-4 border-b  border-slate-400">
              <View className="flex flex-row items-center gap-3">
                <Material
                  name="person"
                  size={18}
                  className="p-2 rounded-full bg-blue-100 !text-blue-500"
                />
                <Text className="dark:text-gray-400 ">
                  Personal Info
                </Text>
              </View>
              <Material
                name="arrow-forward-ios"
                className="dark:!text-gray-400"
                size={18}
              />
            </View>

            {/* bank & card */}
            <View className="flex flex-row justify-between w-full items-center py-4 border-b  border-slate-400">
              <View className="flex flex-row items-center gap-3">
                <Material
                  name="account-balance"
                  size={18}
                  className="p-2 rounded-full bg-yellow-100 !text-yellow-500"
                />
                <Text className="dark:text-gray-400 ">
                  Bank & Cards
                </Text>
              </View>
              <Material
                name="arrow-forward-ios"
                className="dark:!text-gray-400"
                size={18}
              />
            </View>

            {/* transaction */}
            <View className="flex flex-row justify-between w-full items-center py-4 border-b  border-slate-400">
              <View className="flex flex-row items-center gap-3">
                <Material
                  name="payments"
                  size={18}
                  className="p-2 rounded-full bg-red-100 !text-red-500"
                />
                <Text className="dark:text-gray-400 ">
                  Transaction
                </Text>
              </View>
              <Material
                name="arrow-forward-ios"
                className="dark:!text-gray-400"
                size={18}
              />
            </View>

            {/* settings */}
            <View className="flex flex-row justify-between w-full items-center py-4 border-b  border-slate-400">
              <View className="flex flex-row items-center gap-3">
                <Material
                  name="settings"
                  size={18}
                  className="p-2 rounded-full bg-blue-100 !text-blue-500"
                />
                <Text className="dark:text-gray-400 ">Settings</Text>
              </View>
              <Material
                name="arrow-forward-ios"
                className="dark:!text-gray-400"
                size={18}
              />
            </View>

            {/* data privacy */}
            <View className="flex flex-row justify-between w-full items-center py-4">
              <View className="flex flex-row items-center gap-3">
                <Material
                  name="storage"
                  size={18}
                  className="p-2 rounded-full bg-green-200 !text-green-500"
                />
                <Text className="dark:text-gray-400 ">
                  Data privacy
                </Text>
              </View>
              <Material
                name="arrow-forward-ios"
                className="dark:!text-gray-400"
                size={18}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default Profile;
