import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CountryFlag from "react-native-country-flag";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sender } from "./sender";
import ReactNativeModal from "react-native-modal";
type Params = {
  recipient: string;
  purpose: string;
  amount: string;
};

interface Props {}

function Pay(props: Props) {
  const router = useRouter();
  const { recipient, purpose, amount } = useLocalSearchParams<Params>();
  const recipientData: Sender = JSON.parse(recipient || "{}");
  const pay = () => {
    setIsModalVisible(true);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <SafeAreaView className="mx-3 mt-2">
      <ReactNativeModal
        isVisible={isModalVisible}
        // onModalShow={() => {
        //   setTimeout(() => {
        //     setIsModalVisible(false)
        //   }, 2000);
        // }}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <View className="bg-white rounded-xl p-4 items-center">
          <FontAwesome
            style={{ color: "#16a34a" }}
            name="check-circle"
            size={38}
          ></FontAwesome>
          <Text className="text-2xl">Send request successfully!</Text>
        </View>
      </ReactNativeModal>
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
          <Text className="text-2xl font-semibold">Send Request</Text>
          <Text className="text-gray-400">Confirm to paid</Text>
        </View>
        <View
          style={{ padding: 25 }}
          className="mt-6 items-center gap-4 bg-white rounded-xl"
        >
          <FontAwesome name={"user-o"} size={26}></FontAwesome>
          <View className="gap-2">
            <Text className="text-center text-xl">{recipientData.name}</Text>
            <Text className="text-gray-400">{recipientData.email}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={pay}
          className="bg-blue-bg mt-10 w-full py-4 px-6 rounded-full"
        >
          <Text className="text-white text-lg font-bold text-center ">
            Request {amount}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Pay;
