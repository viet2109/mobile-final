import React from 'react';
import { TextInput, Text, TouchableOpacity, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Thêm thư viện icon
import { Stack, useNavigation } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';

const AddCardScreen = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const handlePress = () => {
        navigation.navigate('adding_card/code_verify');
    };
  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <View className="flex-1 justify-center p-4 bg-gray-100 absolute w-full mt-12">
      <Text className="text-2xl font-bold mb-2">Add card</Text>
      <Text className="text-gray-500 mb-7 text-base">
        Enter your credit card info into the box below.
      </Text>
      <Text className="text-gray-700 mb-4 text-lg">
        Account Holder Name
      </Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Full Name"
      />
      <Text className="text-gray-700 mb-4 text-lg">
        Email
      </Text>
      <View className="flex-row items-center border border-gray-300 rounded-lg mb-4">
          <MaterialIcons name="email" size={22} color="gray" className="ml-3" />
          <TextInput
            className="flex-1 p-3"
            placeholder="youremail@example.com"
            keyboardType="email-address"
          />
        </View>
      <Text className="text-gray-700 mb-4 text-lg">
        Card Number
      </Text>
      <View className="flex-row mb-4 border border-gray-300 rounded-lg ">
        <Image source={require('../../assets/images/icon_mastercard.png')}  className="mt-[16px] ml-2 border border-gray-200 rounded" />
          <TextInput
            className="p-3 flex-1"
            placeholder="1234 5678 9101 2345"
            keyboardType="numeric"
          />
          <TextInput
            className="border-l-0 p-3 w-1/5"
            placeholder="MM/YY"
            keyboardType="numeric"
          />
          <TextInput
            className="p-3 w-1/5"
            placeholder="CVV"
            keyboardType="numeric"
          />
        </View>

      <TouchableOpacity className="bg-[#b8b8b8] rounded-full p-5 mt-4"
      onPress={handlePress}>
        <Text className="text-gray-700 text-center">Verify</Text>
      </TouchableOpacity>
    </View>
        </>
  );
};

export default AddCardScreen;