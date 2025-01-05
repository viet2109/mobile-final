import { useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Text } from "react-native";
const QRCodeScreen = () => {
  const myObject = {
    name: "Nguyen Hoang Viet",
    email: "nguyenhoangviet@gmail.com",
  };
  const router = useRouter();

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
      <View className="items-center mx-2 gap-4 bg-white p-10 rounded-xl mt-6">
        <QRCode
          value={JSON.stringify(myObject)}
          size={150}
          color="#304FFE"
          backgroundColor="white"
        />
        <Text className="text-2xl">Scan to get Paid</Text>
        <Text className="text-center text-gray-400">
          Hold the code inside the frame, it will be scanned automatically
        </Text>
      </View>
      <View className="gap-4 mt-10 mx-2">
        <TouchableOpacity
        onPress={() => router.push("receive/sender")}
          style={{ paddingVertical: 18 }}
          className="bg-blue-bg w-full px-6 rounded-full"
        >
          <Text className="text-white font-bold text-center ">
            Request for Payment
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => router.push("receive/sender")}
          style={{ borderWidth: 2 }}
          className="flex-row items-center gap-3 justify-center  border-blue-bg w-full py-4 px-6 rounded-full"
        >
          <FontAwesome
            name="paper-plane"
            size={20}
            color={"#304FFE"}
          ></FontAwesome>
          <Text className="text-blue-bg font-bold text-center ">
            Share to Receive Money
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QRCodeScreen;
