import { ScrollView, Text, TextInput, View } from "react-native";
import HeaderBack from "../../../components/HeaderBack";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useEffect, useRef, useState } from "react";
import { ChatHistory } from "../../../types";
import ChatMessage from "../../../components/ChatMessage";
import axios from "axios";
import ToastManager, { Toast } from "toastify-react-native";

const Support = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_RUNAI_URL || "";
  const apiToken = process.env.REACT_APP_RUNAI_TOKEN || "";

  const scrollViewRef = useRef<ScrollView>(null);

  const handleMessageChange = (e: string) => {
    setMessage(e);
  };

  const handleSendMessage = async () => {
    if (message.trim() === "" || isLoading) return;
    setIsLoading(true);
    const userHistoryMessage: ChatHistory = { role: "user", content: message };

    setChatHistory((prev) => [...prev, userHistoryMessage]);
    setMessage("");

    const instance = axios.create({
      baseURL: apiUrl,
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    });

    try {
        const response = await instance.post("/chat/completions", {
            model: "gpt-4o",
            messages: [
                {
                    "role": "system",
                    "content": "Bạn là trợ lý ảo về lĩnh vực tài chính ở công ty matcha và luôn sẵn sàng giúp đỡ."
                },
                ...chatHistory,
                userHistoryMessage
            ]
        });
        const botHistoryMessage: ChatHistory = { role: "assistant", content: "hihi" };
        setChatHistory(prev => [...prev, botHistoryMessage]);
    } catch (error: any) {
        console.log(error);
    } finally {
        setIsLoading(false);
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4">
      <HeaderBack title="Support" />
      <ScrollView ref={scrollViewRef}>
        {chatHistory.map((chat, index) => (
          <View key={index}>
            <ChatMessage role={chat.role} content={chat.content} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.container} className="relative">
        <Entypo name="attachment" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={message}
          onChangeText={(text: string) => handleMessageChange(text)}
        />
        <TouchableOpacity
          className="bg-blue-bg p-4 rounded-full absolute right-0"
          onPress={handleSendMessage}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 100,
    backgroundColor: "white",
    borderColor: "#304FFE",
    borderWidth: 1,
    padding: 10,
    paddingRight: 50,
  },
});

export default Support;
