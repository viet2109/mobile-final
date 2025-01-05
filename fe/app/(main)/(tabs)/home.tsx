// app/(tabs)/HomeScreen.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Material from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [value, setValue] = useState("vietnam");
  const [items, setItems] = useState([
    {
      label: "VN Dong",
      value: "vietnam",
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
      value: "us",
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
    <>
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

          <Text className="text-6xl text-white">$20,000</Text>
          <Text className="text-gray-400">Available Balance</Text>
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
          <View className="flex flex-row justify-between w-full  items-center py-4 border-b border-slate-400">
            <View className="flex flex-row items-center gap-3">
              <MaterialCommunityIcons
                name="card-plus"
                size={18}
                className="p-2 rounded-full bg-blue-100 !text-blue-500"
              />
              <Text className="dark:text-gray-400 ">Spending</Text>
            </View>
            <View className="flex-row gap-3">
              <Text className="text-red-500">-$500</Text>
              <Material
                name="arrow-forward-ios"
                className="dark:!text-gray-400"
                size={14}
              />
            </View>
          </View>

          {/* income*/}
          <View className="flex flex-row justify-between w-full items-center py-4 border-b border-slate-400">
            <View className="flex flex-row items-center gap-3">
              <MaterialCommunityIcons
                name="database"
                size={18}
                className="p-2 rounded-full bg-green-100 !text-green-500"
              />
              <Text className="dark:text-gray-400 ">Income</Text>
            </View>
            <View className="flex-row gap-3">
              <Text className="text-green-500">$3000</Text>
              <Material
                name="arrow-forward-ios"
                className="dark:!text-gray-400"
                size={14}
              />
            </View>
          </View>

          {/* bills*/}
          <View className="flex flex-row justify-between w-full items-center py-4 border-b border-slate-400">
            <View className="flex flex-row items-center gap-3">
              <Ionicons
                name="newspaper-outline"
                size={18}
                className="p-2 rounded-full bg-yellow-100 !text-yellow-500"
              />
              <Text className="dark:text-gray-400 ">Bills</Text>
            </View>
            <View className="flex-row gap-3">
              <Text className="text-red-500">-$500</Text>
              <Material
                name="arrow-forward-ios"
                className="dark:!text-gray-400"
                size={14}
              />
            </View>
          </View>

          {/* saving*/}
          <View className="flex flex-row justify-between w-full items-center py-4">
            <View className="flex flex-row items-center gap-3">
              <Material
                name="savings"
                size={18}
                className="p-2 rounded-full bg-red-50 !text-yellow-500"
              />
              <Text className="dark:text-gray-400">Savings</Text>
            </View>
            <View className="flex-row gap-3">
              <Text className="text-yellow-500">$500</Text>
              <Material
                name="arrow-forward-ios"
                className="dark:!text-gray-400"
                size={14}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
