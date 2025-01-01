import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";

const VerifyModal = ({onClickNo = () => {}, onClickYes = () => {}}) => {
  return (
    <View >
      <Image
        className="w-full h-[50%]"
        source={require("../assets/images/email.png")}
        resizeMode="contain"
      />
      <Text className="text-center text-2xl font-bold">Verify your email</Text>
      <Text className="text-center text-lg text-gray-500">
        We have sent a verification code to your email address
      </Text>
      <View className=" w-full items-center mt-10">
        <TouchableOpacity className="bg-blue-bg py-3 px-6 rounded-full w-full" onPress={onClickYes}>
          <Text className="text-white text-lg font-bold text-center ">
            Yes
          </Text>
        </TouchableOpacity>
      </View>
      <View className=" w-full items-center mt-2">
        <TouchableOpacity className="bg-white border-blue-bg border py-3 px-6 rounded-full w-full" onPress={onClickNo}>
          <Text className="text-blue-bg text-lg font-bold text-center ">
            No
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyModal;
