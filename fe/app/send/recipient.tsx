import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { maskAndFormatAccountNumber } from "../../utils/stringFormat";
import { getAccountsByQueries } from "../../service/account";
import { Account, User } from "../../types";
import debounce from "lodash.debounce";
import { getTransfer } from "../../service/transfer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Recipient = {
  accountNumber: string;
  username: string;
};

const SearchBar = ({ onChange }: { onChange: (query: string) => void }) => (
  <View className="relative">
    <Ionicons
      name="search"
      size={18}
      className="absolute text-gray-400 z-10 left-4 top-1/2 -translate-y-1/2"
    />
    <TextInput
      editable
      placeholderTextColor="#9ca3af"
      selectionColor="#9ca3af"
      className="bg-gray-100 px-4 py-2 rounded-3xl pl-14"
      placeholder='Search "Recipient account number or name"'
      onChangeText={onChange}
    />
  </View>
);

const RecipientList = ({
  recipients,
  onSelect,
}: {
  recipients: Account[];
  onSelect: (recipient: Account) => void;
}) => (
  <View className="z-50 flex-1">
    <View className="absolute flex-1 left-0 w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-lg z-50 overflow-hidden">
      {recipients.length > 0 ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {recipients.map((recipient, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onSelect(recipient)}
              className="flex-row items-center gap-3 py-3 px-4 border-b border-gray-200 last:border-none"
            >
              <FontAwesome size={20} name="user-o" />
              <View className="gap-1">
                <Text className="font-medium">{recipient.user.username}</Text>
                <Text className="text-gray-400">
                  {maskAndFormatAccountNumber(recipient.accountNumber || "")}
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
);

const Recipient = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recipients, setRecipients] = useState<Account[]>([]);
  const [mostRecent, setMostRecent] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMostRecent = async () => {
    if (!user?.id) return;
    console.log(user.id);

    const data = await getTransfer({
      accountId: user.id,
      isDistinctReceiveAccount: true,
    });
    setMostRecent(data.map((transfer) => transfer.recipient));
  };

  const fetchAccounts = useCallback(async (query: string) => {
    if (!query.trim()) {
      setRecipients([]); // Clear previous results
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getAccountsByQueries({
        userName: query,
        accountNumber: query,
      });
      setRecipients(data);
    } catch (err) {
      setError("Error fetching accounts. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedFetch = useCallback(debounce(fetchAccounts, 300), [
    fetchAccounts,
  ]);

  useEffect(() => {
    const fetchUserAndAccounts = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          setUser(JSON.parse(userString));
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

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    fetchMostRecent();
  }, [user]);

  useEffect(() => {
    debouncedFetch(searchQuery);
    return () => debouncedFetch.cancel();
  }, [searchQuery, debouncedFetch]);

  const handleSelect = (recipient: Account) => {
    if (!recipient || !recipient.user) return; // Safeguard

    const recipientData: Recipient = {
      accountNumber: recipient.accountNumber || "",
      username: recipient.user.email.split("@")[0] || "",
    };
    router.push({
      pathname: "/send/purpose",
      params: { recipient: JSON.stringify(recipientData) },
    });
  };

  const handleBackPress = () => {
    setSearchQuery(""); // Clear the search field
    setRecipients([]); // Clear the recipients list
    router.back();
  };

  return (
    <SafeAreaView className="mx-3 mt-2">
      <TouchableOpacity onPress={handleBackPress} className="w-10">
        <Ionicons name="chevron-back" size={26} color="black" />
      </TouchableOpacity>

      <View className="mx-2">
        <View className="gap-1 mt-3">
          <Text className="text-2xl font-semibold">Choose Recipient</Text>
          <Text className="text-gray-400">
            Please select your recipient to send money
          </Text>
        </View>

        <View className="bg-white p-5 py-4 rounded-xl mt-6 relative">
          <SearchBar onChange={setSearchQuery} />

          {loading && (
            <ActivityIndicator size="small" color="#0000ff" className="mt-2" />
          )}

          {error && <Text className="text-red-500 p-4">{error}</Text>}

          {searchQuery.trim() !== "" && !loading && !error && (
            <RecipientList recipients={recipients} onSelect={handleSelect} />
          )}

          <View className="mt-4">
            <Text className="text-xl font-medium">Most Recent</Text>
            {mostRecent.length > 0 ? (
              mostRecent.map((recipient, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelect(recipient)}
                  className={`flex-row py-2 items-center gap-3 ${
                    index === mostRecent.length - 1
                      ? "-mb-2"
                      : "border-b border-gray-300"
                  }`}
                >
                  <FontAwesome size={20} name="user-o" />
                  <View className="gap-1">
                    <Text className="font-medium text-lg">
                      {recipient.user.email.split("@")[0]}
                    </Text>
                    <Text className="text-gray-400">
                      {maskAndFormatAccountNumber(
                        recipient.accountNumber || ""
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-gray-400 mt-1">
                You have no most recent transactions.
              </Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Recipient;
