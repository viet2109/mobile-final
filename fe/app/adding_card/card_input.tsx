import React, { useRef, useState } from 'react';
import { TextInput, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Thêm thư viện icon
import { Stack, useNavigation } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';

const AddCardScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePress = async () => {
    if (!isFormValid()) return;

    const cardData = {
      fullName,
      email,
      cardNumber,
      expiryDate,
      cvv,
    };

    try {
      const response = await fetch('http://192.168.1.5:8080/api/cards/add', { // Thay đổi địa chỉ IP nếu cần
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      });

      if (response.ok) {
        const data = await response.json();
        // Điều hướng đến trang xác minh với ID thẻ
        navigation.navigate('adding_card/code_verify', { cardId: data.id });
      } else {
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi lưu thẻ. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng kiểm tra kết nối.');
    }
  };

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isValidCardNumber = (number: string) => /^\d{4} \d{4} \d{4} \d{4}$/.test(number);
  const isValidExpiryDate = (date: string) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);
  const isValidCvv = (cvv: string) => /^\d{3}$/.test(cvv);

  const isFormValid = () => {
    return (
      fullName.trim() !== '' &&
      isValidEmail(email) &&
      isValidCardNumber(cardNumber) &&
      isValidExpiryDate(expiryDate) &&
      isValidCvv(cvv)
    );
  };

  const cardNumberInputRef = useRef<TextInput>(null);
  const expiryDateInputRef = useRef<TextInput>(null);
  const cvvInputRef = useRef<TextInput>(null);

  const handleCardNumberChange = (input: string) => {
    const numericInput = input.replace(/\D/g, '');

    if (numericInput.length > 16) {
      return;
    }

    const formattedInput = numericInput.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formattedInput);

    if (numericInput.length === 16) {
      expiryDateInputRef.current?.focus();
    }
  };

  const handleExpiryDateChange = (input: string) => {
    const numericInput = input.replace(/\D/g, '');

    if (numericInput.length > 4) {
      return;
    }

    let formattedInput = numericInput;

    if (numericInput.length >= 2) {
      const month = numericInput.slice(0, 2);
      if (parseInt(month) > 12) {
        return;
      }

      if (numericInput.length === 4) {
        const year = numericInput.slice(2);
        const currentYear = new Date().getFullYear() % 100;
        if (parseInt(year) > currentYear) {
          return;
        }
      }

      formattedInput = `${month}${numericInput.length > 2 ? '/' : ''}${numericInput.slice(2)}`;
    }

    if (formattedInput.length === 5) {
      cvvInputRef.current?.focus();
    }
    setExpiryDate(formattedInput);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 justify-center p-4 bg-gray-100 absolute w-full mt-12">
        <Text className="text-2xl font-bold mb-2">Add card</Text>
        <Text className="text-gray-500 mb-7 text-base">
          Enter your credit card info into the box below.
        </Text>
        <Text className="text-gray-700 mb-4 text-lg">Account Holder Name</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4"
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <Text className="text-gray-700 mb-4 text-lg">Email</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg mb-4">
          <MaterialIcons name="email" size={22} color="gray" className="ml-3" />
          <TextInput
            className="flex-1 p-3"
            placeholder="youremail@example.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <Text className="text-gray-700 mb-4 text-lg">Card Number</Text>
        <View className="flex-row mb-4 border border-gray-300 rounded-lg">
          <Image source={require('../../assets/images/icon_mastercard.png')} className="mt-[16px] ml-2 border border-gray-200 rounded" />
          <TextInput
            ref={cardNumberInputRef}
            className="p-3 flex-1"
            placeholder="1234 5678 9101 2345"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
          />
          <TextInput
            ref={expiryDateInputRef}
            className="border-l-0 p-3 w-1/5"
            placeholder="MM/YY"
            keyboardType="numeric"
            value={expiryDate}
            onChangeText={handleExpiryDateChange}
          />
          <TextInput
            ref={cvvInputRef}
            className="p-3 w-1/5"
            placeholder="CVV"
            keyboardType="numeric"
            value={cvv}
            onChangeText={setCvv}
          />
        </View>

        <TouchableOpacity
          className={`rounded-full p-5 mt-4 ${isFormValid() ? 'bg-blue-500' : 'bg-[#b8b8b8]'}`}
          onPress={isFormValid() ? handlePress : undefined}
          disabled={!isFormValid()}
        >
          <Text className={`text-center ${isFormValid() ? 'text-white' : 'text-gray-700'}`}>Verify</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddCardScreen;