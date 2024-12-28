import React, { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Material from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import DateTimePicker, { DateType, ModeType } from "react-native-ui-datepicker";
import {
  Button,
  List,
  Modal,
  Provider,
  Switch,
  Toast,
  WhiteSpace,
  WingBlank,
} from "@ant-design/react-native";

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

  const onChange = useCallback(
    (params: { date: DateType }) => {
      const currentDate = params.date || date;
      setShowDatePicker(false);
      setDate(currentDate);
    },
    [date]
  );

  return (
    <Provider>
      <SafeAreaView className="flex-1 p-4">
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
            {/* Full Name */}
            <View className="mb-4">
              <Text className="dark:text-white text-lg font-poppins mb-2">
                Full Name
              </Text>
              <TextInput
                className="bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg p-4"
                placeholder="Enter your full name"
                placeholderTextColor="#888"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            {/* Email Address */}
            <View className="mb-4">
              <Text className="dark:text-white text-lg font-poppins mb-2">
                Email Address
              </Text>
              <TextInput
                className="bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg p-4"
                placeholder="Enter your email address"
                placeholderTextColor="#888"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Country */}
            <View className="mb-4">
              <Text className="dark:text-white text-lg font-poppins mb-2">
                Country
              </Text>
              <TextInput
                className="bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg p-4"
                placeholder="Enter your country"
                placeholderTextColor="#888"
                value={country}
                onChangeText={setCountry}
              />
            </View>

            {/* City */}
            <View className="mb-4">
              <Text className="dark:text-white text-lg font-poppins mb-2">
                City
              </Text>
              <TextInput
                className="bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg p-4"
                placeholder="Enter your city"
                placeholderTextColor="#888"
                value={city}
                onChangeText={setCity}
              />
            </View>

            {/* Birthdate */}
            <View className="mb-4">
              <Text className="dark:text-white text-lg font-poppins mb-2">
                Date of Birth
              </Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)} // Show the date picker when tapped
                className="bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg p-4"
              >
                <Text className="text-lg">
                  {date
                    ? dayjs(date).locale("vi").format("DD/MM/YYYY")
                    : "..."}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Button at the bottom */}
          <View className="">
            <View className="w-full items-center mt-10">
              <TouchableOpacity
                className="bg-blue-bg py-3 px-6 rounded-full w-4/5"
                onPress={() => router.push("home")}
              >
                <Text className="text-white text-lg font-bold text-center ">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <Modal
          visible={showDatePicker}
          transparent
          onClose={() => setShowDatePicker(false)}
          title="Select Date"
          footer={[
            { text: "Cancel", onPress: () => setShowDatePicker(false) },
            //   { text: "OK", onPress: () => handleDateChange(date.toDate()) },
          ]}
        >
          <DateTimePicker mode="single" date={date} onChange={onChange} />
        </Modal>
      </SafeAreaView>
    </Provider>
  );
};

export default Info;
