import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { maskAndFormatAccountNumber } from "../../utils/stringFormat";

export type Sender = {
  accountNumber: string;
  name: string;
};

export default function SenderScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(""); // Lưu giá trị nhập
  const [senders, setSenders] = useState<Sender[]>([
    { name: "Nguyen Hoang Viet", accountNumber: "234567890" },
    { name: "Tran Thi Mai", accountNumber: "876543210" },
    { name: "Pham Van Nam", accountNumber: "556667778" },
    { name: "Le Quoc Bao", accountNumber: "122334455" },
    { name: "Nguyen Minh Tri", accountNumber: "988776655" },
  ]);

  const filteredSenders = senders.filter(
    (sender) =>
      sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sender.accountNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSelect = (sender: Sender) => {
    router.push({
      pathname: "/receive/purpose",
      params: { sender: JSON.stringify(sender) },
    });
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
          <Text className="text-2xl font-semibold">Choose Sender</Text>
          <Text className="text-gray-400">
            Please select your sender to receive money
          </Text>
        </View>
        <View className="bg-white p-5 py-4 rounded-xl mt-6 relative">
          {/* Input search */}
          <View className="relative">
            <Ionicons
              name="search"
              size={18}
              className="absolute text-gray-400 z-10 left-4 top-1/2 -translate-y-1/2"
            ></Ionicons>
            <TextInput
              placeholderTextColor={"#9ca3af"}
              selectionColor={"#9ca3af"}
              className="bg-gray-100 px-4 py-2 rounded-3xl pl-14"
              placeholder='Search "Sender account number or name"'
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Dropdown list */}
          {searchQuery.trim() !== "" && (
            <View className="z-50 flex-1">
              <View className="absolute flex-1 left-0 w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-lg z-50 overflow-hidden">
                {filteredSenders.length > 0 ? (
                  <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    className="flex-1"
                  >
                    {filteredSenders.map((sender, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleSelect(sender)}
                        className="flex-row items-center gap-3 py-3 px-4 border-b border-gray-200 last:border-none"
                      >
                        <FontAwesome size={20} name="user-o" />
                        <View>
                          <Text className="font-medium">{sender.name}</Text>
                          <Text className="text-gray-400">
                            {maskAndFormatAccountNumber(sender.accountNumber)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                ) : (
                  <View className="p-4">
                    <Text className="text-gray-400">No results found</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Most Recent */}
          <View className="mt-4">
            <Text className="text-xl font-medium">Most Recent</Text>
            {senders.map((sender, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(sender)}
              >
                <View
                  className={`flex-row py-2 items-center gap-3 ${
                    index === senders.length - 1
                      ? "-mb-2"
                      : "border-b border-gray-300"
                  }`}
                >
                  <View>
                    <FontAwesome size={20} name="user-o"></FontAwesome>
                  </View>
                  <View className="gap-1">
                    <Text className="font-medium text-lg">{sender.name}</Text>
                    <Text className="text-gray-400">
                      {maskAndFormatAccountNumber(sender.accountNumber)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
