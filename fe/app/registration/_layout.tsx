import { Tabs, usePathname, useRouter } from "expo-router";
import Tabbar from "../../components/tabbar";
import Material from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "nativewind";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SegmentedProgressBar from "../../components/SegmentedProgressBar";
import { useEffect, useState } from "react";
import Registration from "./home";
import Confirm from "./confirm";
import CreateAccount from "./create";
import { baseAxios } from "../../service/configAxios";
import { ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import ToastManager, { Toast } from "toastify-react-native";

export default function TabLayout() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    if (currentIndex === 0) {
      router.back();
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRegister = () => {
    setIsLoading(true);
    baseAxios
      .post("/auth/sendCode", { email })
      .then((res) => {
        console.log(res);
        setCurrentIndex(2);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleVerifyEmail = () => {
    setIsLoading(true);
    baseAxios
      .post("/auth/register", { email, password, code })
      .then((res) => {
        router.push("/login");
      })
      .catch((err) => {
        Toast.error("an error occurred, please try again");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ToastManager
        positionValue={0}
        duration={1800}
        animationStyle={"rightInOut"}
      />
      {isLoading && (
        <Modal isVisible={true} useNativeDriver={true}>
          <View className="bg-transparent h-full w-full flex justify-center items-center">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Modal>
      )}
      <View className="flex flex-row justify-between items-center mb-6 ">
        <TouchableOpacity
          onPress={handleBack}
          className="flex-row items-center "
        >
          <Material
            name="arrow-back-ios"
            size={26}
            color="black"
            className="dark:!text-white ml-4"
          />
        </TouchableOpacity>
      </View>
      <SegmentedProgressBar len={3} activeIndex={currentIndex} />

      {currentIndex === 0 && (
        <Registration onClickSignUp={() => setCurrentIndex(1)} />
      )}
      {currentIndex === 1 && (
        <CreateAccount
          onClickYes={handleRegister}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
        />
      )}
      {currentIndex === 2 && <Confirm onClickYes={handleVerifyEmail} onHandleChangeCode={setCode}/>}
    </SafeAreaView>
  );
}
