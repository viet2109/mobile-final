import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable } from "react-native";
import { ScrollView } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

type Params = {
  recipient: string;
  purpose: string;
  amount: string;
};

export default function Pay() {
  const router = useRouter();
  const { recipient, purpose, amount } = useLocalSearchParams<Params>();
  const recipientData = JSON.parse(recipient || "{}");

  const fakeCards = [
    {
      id: 1,
      bankName: "Visa Platinum",
      accountNumber: "************5678",
      cardType: "Visa",
      cardColor: "#1A74E9",
    },
    {
      id: 2,
      bankName: "MasterCard Gold",
      accountNumber: "************3994",
      cardType: "MasterCard",
      cardColor: "#FFA726",
    },
    {
      id: 3,
      bankName: "American Express",
      accountNumber: "************1234",
      cardType: "Amex",
      cardColor: "#0076BF",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(
    fakeCards[0].id
  );

  const pay = () => {
    if (selectedCardId !== null) {
      setIsModalVisible(true);
      // setTimeout(() => {
      //   setIsModalVisible(false);
      // }, 2000);
    } else {
      alert("Please select a card to proceed.");
    }
  };

  return (
    <SafeAreaView className="mx-3 mt-2">
      <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        <View className="bg-white rounded-xl p-4 items-center">
          <FontAwesome
            style={{ color: "#16a34a" }}
            name="check-circle"
            size={38}
          />
          <Text className="text-2xl">Transaction Complete!</Text>
        </View>
      </ReactNativeModal>

      <TouchableOpacity onPress={() => router.back()} className="w-10">
        <Ionicons name="chevron-back" size={26} color="black" />
      </TouchableOpacity>

      <View className="mx-2">
        <View className="gap-1 mt-3">
          <Text className="text-2xl font-semibold">Payment</Text>
          <Text className="text-gray-400">Confirm to pay</Text>
        </View>

        <View
          style={{ padding: 25 }}
          className="mt-6 items-center gap-4 bg-white rounded-xl"
        >
          <FontAwesome name="user-o" size={26} />
          <View className="gap-2">
            <Text className="text-center text-xl">{recipientData.name}</Text>
            <Text className="text-gray-400">{recipientData.email}</Text>
          </View>
        </View>

        <View className="mt-10 gap-4">
          <Text>Choose Account</Text>
          <ScrollView style={{ maxHeight: 250 }}>
            <View className="gap-4">
              {fakeCards.map((card) => (
                <Pressable
                  key={card.id}
                  onPress={() => setSelectedCardId(card.id)}
                  className={`flex-row items-center justify-between p-4 bg-white rounded-lg shadow ${
                    selectedCardId === card.id ? "border-2 border-blue-500" : ""
                  }`}
                >
                  <View className="flex-row items-center gap-4">
                    <FontAwesome
                      size={26}
                      name={
                        card.cardType === "Visa" ? "cc-visa" : "cc-mastercard"
                      }
                      color={card.cardColor}
                    />
                    <View>
                      <Text className="font-semibold">
                        {card.accountNumber}
                      </Text>
                      <Text className="text-gray-400 text-sm">
                        Bank: {card.bankName}
                      </Text>
                    </View>
                  </View>
                  <Ionicons
                    size={20}
                    name={
                      selectedCardId === card.id
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    color={selectedCardId === card.id ? "#1A74E9" : "#ccc"}
                  />
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity
          onPress={pay}
          className="bg-blue-500 mt-10 w-full py-4 px-6 rounded-full"
        >
          <Text className="text-white text-lg font-bold text-center">
            Pay {amount}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
