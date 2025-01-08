import { TouchableOpacity, useColorScheme } from "react-native";
import { View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import { Text } from "react-native";

interface HeaderBackProps {
  title: string;
}

const HeaderBack = ({ title }: HeaderBackProps) => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    return (
        <View className="flex flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center "
          >
            <AntDesign name="left" size={24} color={isDarkMode ? 'white' : 'black'}/>
          </TouchableOpacity>

          <Text className="dark:text-white font-semibold text-2xl -translate-x-4 font-poppins">
            {title}
          </Text>
          <Text></Text>
        </View>
    );
    }

export default HeaderBack;