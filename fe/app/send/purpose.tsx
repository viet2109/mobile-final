import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Recipient } from "./recipient";

type Params = {
  recipient: string;
};
type Purpose = {
  name: string;
  des: string;
  icon: React.ReactNode;
};

const SelectPurposeScreen: React.FC = () => {
  const router = useRouter();
  const { recipient } = useLocalSearchParams<Params>();
  const recipientData: Recipient = JSON.parse(recipient || "{}");
  const purposes: Purpose[] = [
    {
      name: "Personal",
      des: "Pay your friends and family",
      icon: (
        <FontAwesome
          name="user-o"
          size={22}
          className="!text-blue-400 bg-blue-100 p-4 rounded-full"
        ></FontAwesome>
      ),
    },
    {
      name: "Business",
      des: "Pay your employee",
      icon: (
        <Ionicons
          name="bag-handle"
          size={22}
          className="!text-yellow-400 bg-yellow-100 p-4 rounded-full"
        ></Ionicons>
      ),
    },
    {
      name: "Payment",
      des: "For payment utility bills",
      icon: (
        <Ionicons
          name="newspaper"
          size={22}
          className="!text-red-400 bg-red-100 p-4 rounded-full"
        ></Ionicons>
      ),
    },
  ];

  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(
    purposes[0].name
  );

  const handleSelect = () => {
    if (selectedPurpose) {
      router.push({
        pathname: "/send/amount",
        params: {
          recipient: JSON.stringify(recipientData),
          purpose: selectedPurpose,
        },
      });
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
          <Text className="text-2xl font-semibold">Select a purpose</Text>
          <Text className="text-gray-400">
            Select a method for sending money
          </Text>
        </View>
        <View className="gap-4 mt-6">
          {purposes.map((purpose, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedPurpose(purpose.name)}
              className={`flex-row border-2 bg-white rounded-xl p-4 items-center justify-between ${ selectedPurpose === purpose.name ? "border-blue-bg":"border-transparent"}`}
            >
              <View className="flex-row items-center gap-3">
                {purpose.icon}
                <View className="gap-1">
                  <Text className="text-lg">{purpose.name}</Text>
                  <Text className="text-gray-400">{purpose.des}</Text>
                </View>
              </View>
              <Ionicons
                name={
                  selectedPurpose === purpose.name
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                className="!text-blue-500"
                size={20}
              ></Ionicons>
            </Pressable>
          ))}
        </View>
      </View>
      <View className="items-center mt-10 mx-2">
        <TouchableOpacity
          className="bg-blue-bg w-full py-4 px-6 rounded-full"
          onPress={() => handleSelect()}
        >
          <Text className="text-white text-lg font-bold text-center ">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectPurposeScreen;
