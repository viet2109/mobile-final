import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { convertCurrency } from "../../utils/stringFormat";
import { Recipient } from "./recipient";
import { NumericFormat } from "react-number-format";

type Params = {
  recipient: string;
  purpose: string;
};

const EnterAmountScreen: React.FC = () => {
  const router = useRouter();
  const { recipient, purpose } = useLocalSearchParams<Params>();
  const recipientData: Recipient = JSON.parse(recipient || "{}");

  const [amount, setAmount] = useState<number>(20000);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("VND");
  const [items, setItems] = useState([
    {
      value: "VND",
      icon: () => (
        <CountryFlag
          style={{ borderRadius: 50, aspectRatio: 1 }}
          isoCode="vn"
          size={28}
        />
      ),
    },
    {
      value: "USD",
      icon: () => (
        <CountryFlag
          style={{ borderRadius: 50, aspectRatio: 1 }}
          isoCode="us"
          size={28}
        />
      ),
    },
  ]);

  const handleNext = () => {
    if (amount) {
      router.push({
        pathname: "/send/pay",
        params: { recipient: JSON.stringify(recipientData), purpose, amount },
      });
    } else {
      alert("Số tiền tổi thiểu phải hơn 0.");
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
            <Text className="text-center text-xl">
              {recipientData.username}
            </Text>
            <Text className="text-gray-400 text-center">
              {recipientData.accountNumber}
            </Text>
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
            value={amount.toString()}
            className="text-center rounded-xl p-4 bg-black/10 text-2xl"
            keyboardType="numeric"
            onChangeText={(value) => {
              setAmount(Number(value));
            }}
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
