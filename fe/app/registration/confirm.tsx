import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import ToastManager, { Toast } from "toastify-react-native";
import { baseAxios } from "../../service/registerService";

const Confirm = ({ onClickYes = () => {}, onHandleChangeCode = (code: string) => {}}) => {
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [code, setCode] = useState("");
  const handleTextChange = (text: string) => {
    setCode(text);
    onHandleChangeCode(text);
    if (text.length === 6) {
      setIsActiveButton(true);
    } else {
      setIsActiveButton(false);
    }
  };

  return (
    <View className="p-4 bg-white flex-1 text-[#333]">
      <ToastManager
        positionValue={0}
        duration={1800}
        animationStyle={"rightInOut"}
      />
      <Text className="font-bold text-xl mb-4">Confirm your email</Text>
      <Text className="text-lg text-gray-500">
        We have sent a verification code to your email address. Please check
        your inbox and enter the code below.
      </Text>
      <View className="my-8 mx-4">
        <OtpInput
          numberOfDigits={6}
          onTextChange={(text) => handleTextChange(text)}
          focusColor={"#304FFE"}
        />
      </View>
      <View className="">
        <Text className="text-gray-500 text-center">
          Didn't receive the code?
          <Text className="text-blue-500 ml-2">Resend code</Text>
        </Text>
      </View>
      <TouchableOpacity
        disabled={!isActiveButton}
        onPress={onClickYes}
        className={`${
          isActiveButton ? "bg-blue-500" : "bg-gray-300"
        } py-3 px-6 rounded-full mt-4`}
      >
        <Text
          className={`${
            isActiveButton ? "text-white" : "text-gray-600"
          } font-semibold text-center`}
        >
          Verify your email
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Confirm;
