import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Account, User } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAccountsByQueries } from "../../service/account";

const QRCodeScreen = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const router = useRouter();

  const fetchAccounts = async (userId: number) => {
    try {
      const data = await getAccountsByQueries({ userId });
      if (data && data.length > 0) {
        setAccount(data[0]);
      } else {
        Alert.alert("Error", "No accounts found.");
      }
    } catch (error) {
      console.error("Error fetching accounts:", error);
      Alert.alert("Error", "Failed to fetch accounts. Please try again.");
    }
  };

  useEffect(() => {
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
  }, [router]);

  const myObject = account
    ? {
        method: "receive",
        data: {
          recipient: {
            accountNumber: account.accountNumber,
            username: account.user.username,
          },
          purpose: "Personal",
        },
      }
    : null;

  return (
    <SafeAreaView style={{ marginHorizontal: 12, marginTop: 8 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ width: 40 }}>
        <Ionicons name="chevron-back" size={26} color="black" />
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          marginHorizontal: 8,
          gap: 16,
          backgroundColor: "white",
          padding: 20,
          borderRadius: 16,
          marginTop: 24,
        }}
      >
        {myObject ? (
          <QRCode
            value={JSON.stringify(myObject)}
            size={150}
            color="#304FFE"
            backgroundColor="white"
          />
        ) : (
          <Text>Loading account information...</Text>
        )}
        <Text style={{ fontSize: 20 }}>Scan to get Paid</Text>
        <Text style={{ textAlign: "center", color: "gray" }}>
          Hold the code inside the frame, it will be scanned automatically
        </Text>
      </View>
      <View style={{ gap: 16, marginTop: 40, marginHorizontal: 8 }}>
        <TouchableOpacity
          onPress={() => router.push("receive/sender")}
          style={{
            backgroundColor: "#304FFE",
            paddingVertical: 18,
            borderRadius: 50,
          }}
        >
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            Request for Payment
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("receive/sender")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
            borderColor: "#304FFE",
            borderWidth: 2,
            borderRadius: 50,
            paddingVertical: 16,
          }}
        >
          <FontAwesome name="paper-plane" size={20} color="#304FFE" />
          <Text
            style={{
              color: "#304FFE",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Share to Receive Money
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QRCodeScreen;
