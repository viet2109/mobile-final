import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { toastConfig } from "../../configs/toastConfig";
import { getAccountsByQueries } from "../../service/account";
import { sendTransferRequest } from "../../service/transfer";
import { Account, TransferRequestDto, User } from "../../types";
import { maskAndFormatAccountNumber } from "../../utils/stringFormat";
import { Recipient } from "./recipient";

type Params = {
  recipient: string;
  purpose: string;
  amount: string;
};

export default function Pay() {
  const router = useRouter();
  const { recipient, purpose, amount } = useLocalSearchParams<Params>();
  const recipientData: Recipient = JSON.parse(recipient || "{}");

  const [cards, setCards] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const pay = async () => {
    if (!selectedCardId) {
      Alert.alert("Error", "Please select a card to proceed.");
      return;
    }

    const transfer: TransferRequestDto = {
      amount,
      description: purpose || "Transfer income",
      recipient: recipientData.accountNumber,
      sender:
        cards.find((card) => card.id === selectedCardId)?.accountNumber || "",
    };

    console.log("Transfer Details:", transfer);
    await sendTransferRequest(transfer)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Transfer Successful",
          text2:
            "Your transaction has been completed successfully. Please check your account for confirmation.",
        });
        setTimeout(() => router.push("/home"), 2000);
      })
      .catch((error: any) => {
        console.log(error);
        
        Toast.show({
          type: "error",
          text1: "Transfer Failed",
          text2: `Error: ${error}`,
        });
      });
  };

  const fetchAccounts = async (userId: number) => {
    try {
      setIsLoading(true);
      const data = await getAccountsByQueries({ userId });
      setCards([...data]);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      Alert.alert("Error", "Failed to fetch accounts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserAndAccounts = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          const parsedUser: User = JSON.parse(userString);
          await fetchAccounts(parsedUser.id); // Fetch accounts sau khi user có
        } else {
          Alert.alert("Error", "User not found. Please log in.");
          router.replace("/login"); // Điều hướng về trang đăng nhập nếu cần
        }
      } catch (error) {
        console.error("Failed to fetch user from AsyncStorage:", error);
        Alert.alert("Error", "Failed to fetch user. Please try again.");
      }
    };

    fetchUserAndAccounts();
  }, []);

  return (
    <>
      <View className="z-50">
        <Toast config={toastConfig} />
      </View>

      <SafeAreaView className="mx-3 mt-2">
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
              <Text className="text-center text-xl">
                {recipientData.username}
              </Text>
              <Text className="text-gray-400 text-center">
                {recipientData.accountNumber}
              </Text>
            </View>
          </View>

          <View className="mt-10 gap-4">
            <Text>Choose Account</Text>
            {isLoading ? (
              <ActivityIndicator size="large" color="#1A74E9" />
            ) : (
              <ScrollView style={{ maxHeight: 250 }}>
                <View className="gap-4">
                  {cards.map((card) => (
                    <Pressable
                      key={card.id}
                      onPress={() => setSelectedCardId(card.id || 1)}
                      className={`flex-row items-center border-2 justify-between p-4 bg-white rounded-lg shadow ${
                        selectedCardId === card.id
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                    >
                      <View className="flex-row items-center gap-4">
                        <FontAwesome
                          size={26}
                          name={"cc-mastercard"}
                          color={"#FFA726"}
                        />
                        <View>
                          <Text className="font-semibold">
                            {maskAndFormatAccountNumber(
                              card.accountNumber || ""
                            )}
                          </Text>
                          <Text className="text-gray-400 text-sm">
                            Bank: Matcha bank
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
            )}
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
    </>
  );
}
