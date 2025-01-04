import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import VerifyModal from "../../components/VerifyModal";

const CreateAccount = ({ onClickYes = () => {} , onEmailChange = (email: string) => {}, onPasswordChange = (pwd: string) => {}}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(false);

  const checkActiveButton = () => {
    if (email && password) {
      setIsActiveButton(true);
    } else {
      setIsActiveButton(false);
    }
  };

  const handleMobileNumberChange = (text: string) => {
    setEmail(text);
    checkActiveButton();
    onEmailChange(text)
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    checkActiveButton();
    onPasswordChange(text)
  }

  const handleConfirm = () => {
    onEmailChange(email);
    onPasswordChange(password);
    onClickYes();
  };

  useEffect(() => {
    checkActiveButton();
  }, [email, password]);

  return (
    <View className="bg-white p-5 flex-1">
      <Modal isVisible={isShowModal} useNativeDriver={true}>
        <View className=" bg-white p-5 rounded-lg h-[80%] relative">
          <TouchableOpacity
            onPress={() => setIsShowModal(false)}
            className="absolute top-5 right-5 z-20"
          >
            <EvilIcons name="close" size={24} color="black" />
          </TouchableOpacity>
          <VerifyModal
            onClickNo={() => setIsShowModal(false)}
            onClickYes={handleConfirm}
          />
        </View>
      </Modal>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>
        Enter your mobile number to verify your account
      </Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="alternate-email" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text: string) => handleMobileNumberChange(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock-outline" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={secureText}
          value={password}
          onChangeText={(text: string) => handlePasswordChange(text)}
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
        onPress={() => {
          setIsShowModal(true);
        }}
      >
        <Text
          className={`${
            isActiveButton ? "text-white" : "text-gray-600"
          } font-semibold text-center`}
        >
          Sign up
        </Text>
      </TouchableOpacity>
    </View>
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
  countryCode: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  icon: {
    color: "#666",
  },
  button: {
    backgroundColor: "#CCC",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default CreateAccount;
