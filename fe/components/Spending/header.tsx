import React from "react";
import Material from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity, Text, View } from "react-native";
import { useRouter } from "expo-router";




interface HeaderProps {
  title: string;
}
const Header: React.FC<HeaderProps> = ({title}) => {
  const router = useRouter();

  return (
    <View className="flex-row  mb-6  ">
      <TouchableOpacity onPress={() => router.back()} className="  ">
        <Material name="arrow-back" size={26} color="black" className="dark:!text-white" />
      </TouchableOpacity>

      <Text className=" font-semibold text-xl  font-poppins  w-4/5 text-center  ">
      {title}
      </Text>

          </View>
  );
};

export default Header;
