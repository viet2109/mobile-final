import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBack from "../components/HeaderBack";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [secureText, setSecureText] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActiveButton, setIsActiveButton] = useState(false);

  const router = useRouter();
  const apiUrl = process.env.REACT_APP_RUNAI_URL || "http://192.168.2.199:8082";

  const instance = axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const checkActiveButton = () => {
    if (email && password) {
      setIsActiveButton(true);
    } else {
      setIsActiveButton(false);
    }
  };

  useEffect(() => {
    checkActiveButton();
  }, [email, password]);

  const handleLogin = async () => {
    if (!isActiveButton) return;

    try {
      const response = await instance.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      router.push("/home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Please check your credentials and try again.",
      });
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <Toast />
      <HeaderBack title="" />
      <View className="p-4">
        <Text style={styles.title}>Login to Matcha</Text>
        <Text style={styles.subtitle}>
          Enter your email and password to access your account
        </Text>

        <View style={styles.inputContainer}>
          <MaterialIcons name="alternate-email" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text: string) => setEmail(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock-outline" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={secureText}
            value={password}
            onChangeText={(text: string) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <AntDesign name="eyeo" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={!isActiveButton}
          className={`${
            isActiveButton ? "bg-blue-500" : "bg-gray-300"
          } py-4 px-6 rounded-full mt-2`}
          onPress={handleLogin}
        >
          <Text
            className={`${
              isActiveButton ? "text-white" : "text-gray-600"
            } font-semibold text-center`}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#DDD",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
});

export default Login;
