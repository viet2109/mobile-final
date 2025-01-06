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
export type Recipient = {
  email: string;
  name: string;
};
export default function Recipient() {
  const navigation = useNavigation();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(""); // Lưu giá trị nhập
  const [recipients, setRecipients] = useState<Recipient[]>([
    { name: "Nguyen Hoang Viet", email: "nguyenhoangviet@gmail.com" },
    { name: "Tran Thi Mai", email: "tranthimai@gmail.com" },
    { name: "Pham Van Nam", email: "phamvannam@gmail.com" },
    { name: "Le Quoc Bao", email: "lequocbao@gmail.com" },
    { name: "Nguyen Minh Tri", email: "nguyenminhtri@gmail.com" },
  ]);

  const filteredRecipients = recipients.filter(
    (recipient) =>
      recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSelect = (recipient: Recipient) => {
    router.push({
      pathname: "/send/purpose",
      params: { recipient: JSON.stringify(recipient) },
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
          <Text className="text-2xl font-semibold">Choose Recipient</Text>
          <Text className="text-gray-400">
            Please select your recipient to send money
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
              placeholder='Search "Recipient email"'
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Dropdown list */}
          {searchQuery.trim() !== "" && (
            <View className="z-50 flex-1">
              <View className="absolute flex-1 left-0 w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-lg  z-50 overflow-hidden">
                {filteredRecipients.length > 0 ? (
                  <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    className="flex-1"
                  >
                    {filteredRecipients.map((recipient, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleSelect(recipient)}
                        className="flex-row items-center gap-3 py-3 px-4 border-b border-gray-200 last:border-none"
                      >
                        <FontAwesome size={20} name="user-o" />
                        <View>
                          <Text className="font-medium">{recipient.name}</Text>
                          <Text className="text-gray-400">
                            {recipient.email}
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
            {recipients.map((recipient, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelect(recipient)}
              >
                <View
                  className={`flex-row py-2 items-center gap-3 ${
                    index === recipients.length - 1
                      ? "-mb-2"
                      : "border-b border-gray-300"
                  }`}
                >
                  <View>
                    <FontAwesome size={20} name="user-o"></FontAwesome>
                  </View>
                  <View className="gap-1">
                    <Text className="font-medium text-lg">
                      {recipient.name}
                    </Text>
                    <Text className="text-gray-400">{recipient.email}</Text>
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
