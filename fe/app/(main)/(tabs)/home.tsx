// app/(tabs)/HomeScreen.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Material from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Account, User } from "../../../types";
import { getAccountsByQueries } from "../../../service/account";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { convertCurrency, formatNumber } from "../../../utils/stringFormat";
import { useFocusEffect } from "@react-navigation/native";
export default function Home() {
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const fetchAccounts = async (userId: number) => {
    try {
      setIsLoading(true);
      const data = await getAccountsByQueries({ userId });
      if (data && data.length > 0) {
        setAccount(data[0]);
        setAmount(Number(data[0].balance) || 0);
      } else {
        Alert.alert("Error", "No accounts found.");
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
      Alert.alert("Error", "Failed to fetch accounts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserAndAccounts = async () => {
        try {
          const userString = await AsyncStorage.getItem("user");
          if (userString) {
            const parsedUser: User = JSON.parse(userString);
            await fetchAccounts(parsedUser.id);
          } else {
            Alert.alert("Error", "User not found. Please log in.");
            router.replace("/login");
          }
        } catch (error) {
          console.error("Failed to fetch user from AsyncStorage:", error);
          Alert.alert("Error", "Failed to fetch user. Please try again.");
        }
      };
      fetchUserAndAccounts();
    }, [router]) // Only re-run when the router changes
  );

  // useEffect(() => {
  //   const fetchUserAndAccounts = async () => {
  //     try {
  //       const userString = await AsyncStorage.getItem("user");
  //       if (userString) {
  //         const parsedUser: User = JSON.parse(userString);
  //         await fetchAccounts(parsedUser.id);
  //       } else {
  //         Alert.alert("Error", "User not found. Please log in.");
  //         router.replace("/login");
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch user from AsyncStorage:", error);
  //       Alert.alert("Error", "Failed to fetch user. Please try again.");
  //     }
  //   };
  //   fetchUserAndAccounts();
  // }, [router]);

  const [value, setValue] = useState("VND");
  const [items, setItems] = useState([
    {
      label: "VN Dong",
      value: "VND",
      icon: () => (
        <View>
          <CountryFlag
            style={{ borderRadius: 50, aspectRatio: 1 }}
            isoCode="vn"
            size={28}
          />
        </View>
      ),
    },
    {
      label: "US Dollar",
      value: "USD",
      icon: () => (
        <View>
          <CountryFlag
            style={{ borderRadius: 50, aspectRatio: 1 }}
            isoCode="us"
            size={28}
          />
        </View>
      ),
    },
  ]);
  return (
    <ScrollView>
      <SafeAreaView className="px-6 relative pt-4 pb-24 bg-blue-600">
        <View className="gap-4 items-center">
          <View className=" flex-row justify-between items-center gap-4">
            <Ionicons
              name="trophy"
              className="!text-white"
              size={20}
            ></Ionicons>
            <View className="flex-1 relative">
              <Ionicons
                name="search"
                size={18}
                className="absolute !text-white z-10 left-4 top-1/2 -translate-y-1/2"
              ></Ionicons>
              <TextInput
                placeholderTextColor={"#fff"}
                selectionColor={"#fff"}
                className="bg-black/10 !text-white px-4 py-2 rounded-3xl pl-14"
                placeholder='Search "Payment"'
              ></TextInput>
            </View>
            <MaterialCommunityIcons
              name="bell"
              className="!text-white"
              size={20}
            ></MaterialCommunityIcons>
          </View>

          <View className="justify-center">
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              onSelectItem={(item) => {
                if (item.value) {
                  setAmount(
                    (prev) =>
                      convertCurrency(
                        Number(prev),
                        value,
                        item.value || value
                      ) || 0
                  );
                }
              }}
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                width: 155,
              }}
              dropDownContainerStyle={{
                borderColor: "transparent",
                padding: 4,
                transform: [{ translateX: -98 }],
              }}
              labelStyle={{ color: "white" }}
              listItemContainerStyle={{ marginVertical: 5 }}
              ArrowDownIconComponent={() => (
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={24}
                  color="#fff"
                />
              )}
              ArrowUpIconComponent={() => (
                <MaterialCommunityIcons
                  name="chevron-up"
                  size={24}
                  color="#fff"
                />
              )}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text className="text-6xl text-white text-center">
              {formatNumber(amount)}
            </Text>
          )}
          <Text className="text-white">Account number: {account?.accountNumber}</Text>
          <TouchableOpacity className="flex-row justify-center">
            <View className="flex-row items-center gap-2 border border-white rounded-full p-4">
              <MaterialCommunityIcons
                size={18}
                name="wallet"
                className="!text-white"
              ></MaterialCommunityIcons>
              <Text className="text-white">Add Money</Text>
            </View>
            <View className="hidden"></View>
          </TouchableOpacity>
        </View>
        <View className="bg-white items-center dark:bg-[#2A2A2A]  absolute bottom-0 translate-y-1/2 mx-6 w-full rounded-xl flex-row py-4">
          <TouchableOpacity
            className="flex-1 items-center"
            onPress={() => router.push("send")}
          >
            <MaterialCommunityIcons
              name="bank-transfer-out"
              size={38}
              className="!text-blue-500"
            ></MaterialCommunityIcons>
            <Text className="text-gray-400">Send</Text>
          </TouchableOpacity>

          <View className="bg-gray-300 w-[2px] h-6 rounded-full"></View>

          <View className=" flex-1 items-center">
            <TouchableOpacity
              className="flex-1 items-center"
              onPress={() => router.push("receive")}
            >
              <MaterialCommunityIcons
                name="bank-transfer-in"
                size={38}
                className="!text-yellow-500"
              ></MaterialCommunityIcons>
            </TouchableOpacity>
            <Text className="text-gray-400">Request</Text>
          </View>

          <View className="bg-gray-300 w-[2px] h-6 rounded-full"></View>

          <View className="flex-1 items-center">
            <MaterialCommunityIcons
              name="bank-transfer"
              size={36}
              className="!text-yellow-500"
            ></MaterialCommunityIcons>
            <Text className="text-gray-400">Bank</Text>
          </View>
        </View>
      </SafeAreaView>

      <View className="mx-6 mt-20">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl dark:text-gray-400">Transaction</Text>
          <MaterialCommunityIcons
            size={24}
            name="arrow-right"
            className="dark:!text-gray-400"
          ></MaterialCommunityIcons>
        </View>
        <ScrollView className="h-fit bg-white dark:bg-[#2A2A2A] rounded-xl px-6 mt-4">
          {/* spending*/}
          <TouchableOpacity className="flex flex-row justify-between w-full  items-center py-4 border-b border-slate-400"
            onPress={() => router.push({ pathname: 'spending', params: { tab: 'Spending' } })}>
            <View className="flex flex-row items-center gap-3">
              <MaterialCommunityIcons
                name="card-plus"
                size={18}
                className="p-2 rounded-full bg-blue-100 !text-blue-500"
              />
              <Text className="dark:text-gray-400 ">Receive</Text>
            </View>
            <View className="flex-row gap-3">
              <Material
                name="arrow-forward-ios"
                className="dark:!text-gray-400"
                size={14}
              />
            </View>
          </TouchableOpacity>

          {/* income*/}
          <TouchableOpacity className="flex flex-row justify-between w-full items-center py-4 border-b border-slate-400"
            onPress={() => router.push({ pathname: 'spending', params: { tab: 'Income' } })}>
            <View className="flex flex-row items-center gap-3">
              <MaterialCommunityIcons
                name="database"
                size={18}
                className="p-2 rounded-full bg-green-100 !text-green-500"
              />
              <Text className="dark:text-gray-400 ">Transfer</Text>
            </View>
            <View className="flex-row gap-3">
              <Material
                name="arrow-forward-ios"
                className="dark:!text-gray-400"
                size={14}
              />
            </View>
          </TouchableOpacity>

          {/* bills*/}
          <TouchableOpacity className="flex flex-row justify-between w-full items-center py-4 border-b border-slate-400"
            onPress={() => router.push({ pathname: 'spending', params: { tab: 'Bills' } })}>
            <View className="flex flex-row items-center gap-3">
              <Ionicons
                name="newspaper-outline"
                size={18}
                className="p-2 rounded-full bg-yellow-100 !text-yellow-500"
              />
              <Text className="dark:text-gray-400 ">Bills</Text>
            </View>
            <View className="flex-row gap-3">
              <Material
                name="arrow-forward-ios"
                className="dark:!text-gray-400"
                size={14}
              />
            </View>
          </TouchableOpacity>

          {/* saving*/}
          <TouchableOpacity className="flex flex-row justify-between w-full items-center py-4" onPress={() => router.push({ pathname: 'spending', params: { tab: 'Savings' } })}>
            <View className="flex flex-row items-center gap-3">
              <Material
                name="savings"
                size={18}
                className="p-2 rounded-full bg-red-50 !text-yellow-500"
              />
              <Text className="dark:text-gray-400">Savings</Text>
            </View>
            <View className="flex-row gap-3">
              <Material
                name="arrow-forward-ios"
                className="dark:!text-gray-400"
                size={14}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View className="mb-40"></View>
    </ScrollView>
  );
}
