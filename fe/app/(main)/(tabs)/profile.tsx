import Material from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Image, ScrollView, Switch, Text, View } from "react-native";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

function Profile() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <>
      <SafeAreaView className="flex-1 dark:bg-dark-bg">
        <ScrollView className="p-4 pt-8">
          {/* header */}
          <View className="flex flex-row justify-between items-center mb-6">
            <Material
              name="arrow-back-ios"
              size={18}
              className="dark:!text-white"
            />
            <Text className="dark:text-white font-semibold text-lg font-poppins">
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

          {/* feature */}
          <View className="flex flex-col justify-between items-center bg-white dark:bg-[#2A2A2A] px-8 rounded-xl">
            {/* dark mode */}
            <View className="flex flex-row justify-between w-full items-center py-4 border-b dark:border-white border-slate-400">
              <View className="flex flex-row items-center gap-3">
                <Material
                  name="bedtime"
                  size={18}
                  className="bg-slate-200 text-gray-800 p-2 rounded-full"
                />
                <Text className="dark:text-white font-poppins">Dark mode</Text>
              </View>
              <Switch
                value={colorScheme == "dark"}
                onChange={toggleColorScheme}
              />
            </View>

            {/* personal info */}
            <View className="flex flex-row justify-between w-full items-center py-4 border-b dark:border-white border-slate-400">
              <View className="flex flex-row items-center gap-3">
                <Material
                  name="person"
                  size={18}
                  className="p-2 rounded-full bg-blue-100 text-blue-500"
                />
                <Text className="dark:text-white font-poppins">
                  Personal Info
                </Text>
              </View>
              <Material
                name="arrow-forward-ios"
                className="dark:!text-white"
                size={18}
              />
            </View>

            {/* bank & card */}
            <View className="flex flex-row justify-between w-full items-center py-4 border-b dark:border-white border-slate-400">
              <View className="flex flex-row items-center gap-3">
                <Material
                  name="account-balance"
                  size={18}
                  className="p-2 rounded-full bg-yellow-100 text-yellow-500"
                />
                <Text className="dark:text-white font-poppins">
                  Bank & Cards
                </Text>
              </View>
              <Material
                name="arrow-forward-ios"
                className="dark:!text-white"
                size={18}
              />
            </View>

            {/* transaction */}
            <View className="flex flex-row justify-between w-full items-center py-4 border-b dark:border-white border-slate-400">
              <View className="flex flex-row items-center gap-3">
                <Material
                  name="payments"
                  size={18}
                  className="p-2 rounded-full bg-red-100 text-red-500"
                />
                <Text className="dark:text-white font-poppins">
                  Transaction
                </Text>
              </View>
              <Material
                name="arrow-forward-ios"
                className="dark:!text-white"
                size={18}
              />
            </View>

            {/* settings */}
            <View className="flex flex-row justify-between w-full items-center py-4 border-b dark:border-white border-slate-400">
              <View className="flex flex-row items-center gap-3">
                <Material
                  name="settings"
                  size={18}
                  className="p-2 rounded-full bg-blue-100 text-blue-500"
                />
                <Text className="dark:text-white font-poppins">Settings</Text>
              </View>
              <Material
                name="arrow-forward-ios"
                className="dark:!text-white"
                size={18}
              />
            </View>

            {/* data privacy */}
            <View className="flex flex-row justify-between w-full items-center py-4">
              <View className="flex flex-row items-center gap-3">
                <Material
                  name="storage"
                  size={18}
                  className="p-2 rounded-full bg-green-200 text-green-500"
                />
                <Text className="dark:text-white font-poppins">
                  Data privacy
                </Text>
              </View>
              <Material
                name="arrow-forward-ios"
                className="dark:!text-white"
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
