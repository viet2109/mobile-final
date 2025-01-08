import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { ChatHistory } from "../types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Markdown from "react-native-markdown-display";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

function ChatMessage(props: ChatHistory) {
  const textColor = props.role === "user" ? "white" : "black";
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  return (
    <View
      style={styles.messageContainer}
      className={`${
        props.role === "user" ? "justify-end" : "justify-start"
      } items-center mb-4`}
    >
      {props.role === "assistant" && (
        <MaterialCommunityIcons
          name="robot-happy-outline"
          size={24}
          color={isDarkMode ? 'white' : 'black'}
        />
      )}
      <View
        style={[
          styles.messageContent,
          { backgroundColor: props.role === "user" ? "#1E90FF" : "#FFFFFF" },
        ]}
      >
        <View style={styles.header} className="-mb-2 mt-2">
          <Text style={[styles.role, { color: textColor }]} className="mr-2">
            {props.role === "user" ? "User" : "MATCHA AI"}
          </Text>
        </View>
        <Markdown
          style={{
            body: {
              flexWrap: "wrap",
              maxWidth: 320,
              overflow: "hidden",
              textAlign: "justify",
              color: textColor,
            },
          }}
        >
          {props.content}
        </Markdown>
      </View>
      {props.role === "user" && (
        <AntDesign name="user" size={24} color={isDarkMode ? 'white' : 'black'} />
      )}
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
    maxWidth: "90%",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
