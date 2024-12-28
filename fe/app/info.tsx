import React, { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Material from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker, { DateType, ModeType } from "react-native-ui-datepicker";
import Modal from "react-native-modal";
// import DateTimePicker, { DateType, ModeType } from "react-native-ui-datepicker";
// import {
//   Button,
//   List,
//   Modal,
//   Provider,
//   Switch,
//   Toast,
//   WhiteSpace,
//   WingBlank,
// } from "@ant-design/react-native";

const Info = () => {
  const router = useRouter();

  // States for input fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<DateType | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control popup visibility
  const [isShowModal, setIsShowModal] = useState(false);

  const onChange = useCallback(
    (params: { date: DateType }) => {
      const currentDate = params.date || date;
      setShowDatePicker(false);
      setDate(currentDate);
    },
    [date]
  );

  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <ScrollView>
        {/* Header */}
        <View className="flex flex-row justify-between items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center "
          >
            <Material
              name="arrow-back"
              size={26}
              color="black"
              className="dark:!text-white"
            />
          </TouchableOpacity>

          <Text className="dark:text-white font-semibold text-2xl -translate-x-4 font-poppins">
            Personal Info
          </Text>
          <Text></Text>
        </View>

        {/* Input Fields */}
        <View className="space-y-16">
          <Text className="dark:text-white text-lg font-poppins mb-2">
            Email
          </Text>
          <View style={styles.inputContainer}>
            <Fontisto name="email" size={24} color="gray" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              // value={mobileNumber}
              // onChangeText={(text: string) => handleMobileNumberChange(text)}
            />
          </View>

          <Text className="dark:text-white text-lg font-poppins mb-2">
            Full Name
          </Text>
          <View style={styles.inputContainer}>
            <AntDesign name="user" size={24} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Mr Duy Nguyen"
              // value={mobileNumber}
              // onChangeText={(text: string) => handleMobileNumberChange(text)}
            />
          </View>

          <Text className="dark:text-white text-lg font-poppins mb-2">
            Username
          </Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="alternate-email" size={24} color="blue" />
            <TextInput
              style={styles.input}
              placeholder="username"
              // value={mobileNumber}
              // onChangeText={(text: string) => handleMobileNumberChange(text)}earthname
            />
          </View>

          <Text className="dark:text-white text-lg font-poppins mb-2">
            Country
          </Text>
          <View style={styles.inputContainer}>
            <Ionicons name="earth-outline" size={24} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Viet Nam"
              // value={mobileNumber}
              // onChangeText={(text: string) => handleMobileNumberChange(text)}
            />
          </View>

          {/* Birthdate */}
          <View className="mb-4">
            <Text className="dark:text-white text-lg font-poppins mb-2">
              Date of Birth
            </Text>
            
            <TouchableOpacity
              onPress={() => setIsShowModal(true)}
              className="border border-[#ddd] rounded-lg p-2 flex-row items-center gap-2"
            >
              <Fontisto name="date" size={24} color="black" />
              <Text className="text-lg">
                {date ? dayjs(date).locale("vi").format("DD/MM/YYYY") : "..."}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Button at the bottom */}
        <View className="">
          <View className="w-full items-center mt-10">
            <TouchableOpacity
              className="bg-blue-bg py-3 px-6 rounded-full w-full"
              onPress={() => router.push("home")}
            >
              <Text className="text-white text-lg font-bold text-center ">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal isVisible={isShowModal} useNativeDriver={true}>
        <View className=" bg-white p-5 rounded-lg relative">
          <DateTimePicker mode="single" date={date} onChange={onChange} />
          <TouchableOpacity className="bg-blue-bg py-3 px-6 rounded-full w-full -mt-4" onPress={() => setIsShowModal(false)}>
            <Text className="text-white text-lg font-bold text-center ">
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
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

export default Info;
