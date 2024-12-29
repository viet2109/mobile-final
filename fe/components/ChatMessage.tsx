import { View, Text, Image, StyleSheet } from "react-native";
// import Markdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { ChatHistory } from "../types";
import AntDesign from '@expo/vector-icons/AntDesign';

function ChatMessage(props: ChatHistory) {

  return (
    <View style={styles.messageContainer} className={`${props.role === "user" ? "justify-end" : "justify-start"} items-center mb-4`}>
      {props.role === "assistant" && (
        <Image
          source={require("../assets/images/404Page.jpg")}
          style={styles.chatGptImage}
        />
      )}
      <View style={styles.messageContent} className={`p-4 rounded-3xl ${props.role === "user" ? "bg-blue-bg text-white" : "bg-white"}`}>
        <View style={styles.header}>
          <Text style={styles.role} className={`${props.role === "user" ? "text-white" : ""} mr-2`}>
            {props.role === "user" ? "User" : "MATCHA AI"}
          </Text>
          <Text className={`${props.role === "user" ? "text-white" : ""}`}>11:46</Text>
        </View>
        <Text style={styles.messageText}>
          <Text className={`${props.role === "user" ? "text-white" : ""}`}>{props.content}</Text>
        </Text>
      </View>
      {props.role === "user" && <AntDesign name="user" size={24} color="black" />}
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  chatGptImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageContent: {
    flexDirection: "column",
    width: "100%",
    maxWidth: 320,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  role: {
    fontSize: 12,
    fontWeight: "600",
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
  messageText: {
    fontSize: 14,
  },
});

export default ChatMessage;
