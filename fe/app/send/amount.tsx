import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Recipient } from "./recipient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import CountryFlag from "react-native-country-flag";
type Params = {
  recipient: string;
  purpose: string;
};

const EnterAmountScreen: React.FC = () => {
  const router = useRouter();
  const { recipient, purpose } = useLocalSearchParams<Params>();
  const recipientData: Recipient = JSON.parse(recipient || "{}");
  const [amount, setAmount] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("vietnam");
  const [items, setItems] = useState([
    {
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
  const formatAmount = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, ""); // Loại bỏ ký tự không phải số
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thêm dấu .
  };
  const handleNext = () => {
    if (amount.trim()) {
      router.push({
        pathname: "/send/pay",
        params: { recipient: JSON.stringify(recipientData), purpose, amount },
      });
    } else {
      alert("Vui lòng nhập số tiền.");
    }
  };

  return (
    <SafeAreaView className="mx-3 mt-2">
      <TouchableOpacity onPress={() => router.back()} className="w-10">
        <Ionicons
          name="chevron-back"
          size={26}
          color="black"
          className="dark:text-gray-400"
        />
      </TouchableOpacity>
      <View className="mx-2">
        <View className="gap-1 mt-3">
          <Text className="text-2xl font-semibold">Enter amount</Text>
          <Text className="text-gray-400">Please enter an amount to pay</Text>
        </View>
        <View className="mt-6 items-center gap-4 p-4 bg-white rounded-xl">
          <FontAwesome name={"user-o"} size={26}></FontAwesome>
          <View className="gap-2">
            <Text className="text-center text-xl">{recipientData.name}</Text>
            <Text className="text-gray-400">{recipientData.email}</Text>
          </View>
          <View className="justify-center w-full">
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                width: 50,
                transform: [{ translateX: -20 }],
              }}
              containerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
              dropDownContainerStyle={{
                borderColor: "transparent",
                padding: 4,
                width: "auto",
                shadowColor: "#000000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.17,
                shadowRadius: 3.05,
                elevation: 4,
                backgroundColor: "white",
              }}
              labelStyle={{ display: "none" }}
              listItemContainerStyle={{
                marginVertical: 5,
              }}
              ArrowDownIconComponent={() => (
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={24}
                  color="#333"
                />
              )}
              ArrowUpIconComponent={() => (
                <MaterialCommunityIcons
                  name="chevron-up"
                  size={24}
                  color="#333"
                />
              )}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
          <TextInput
            style={{ width: 192 }}
            selectionColor={"#333"}
            value={amount}
            className="text-center rounded-xl p-4 bg-black/10 text-2xl"
            keyboardType="numeric"
            onChangeText={(text) => setAmount(formatAmount(text))}
          ></TextInput>

          <TouchableOpacity
            className="bg-blue-bg w-full py-4 px-6 rounded-full"
            onPress={handleNext}
          >
            <Text className="text-white text-lg font-bold text-center ">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EnterAmountScreen;
