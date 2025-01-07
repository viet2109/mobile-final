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
import { baseAxios } from "../service/configAxios";

const Login = () => {
  const [secureText, setSecureText] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActiveButton, setIsActiveButton] = useState(false);

  const router = useRouter();

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
      const response = await baseAxios.post("/auth/login", {
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

  const handleForgotPassword = () => {
    if (email === "") {
      Toast.show({
        type: "info",
        text1: "Forgot Password",
        text2: "Please contact our support team to reset your password.",
      });
    } else {
      baseAxios
        .post("/auth/changePassword", { email })
        .then(() =>
          Toast.show({
            type: "success",
            text1: "Forgot Password",
            text2: "An email has been sent to reset your password.",
          })
        )
        .catch(() =>
          Toast.show({
            type: "error",
            text1: "Forgot Password",
            text2: "Failed to send email. Please try again.",
          })
        );
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

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text className="text-blue-500 text-right">Forgot password?</Text>
        </TouchableOpacity>

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
