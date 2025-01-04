import React, { useRef, useState, useEffect } from 'react';
import { TextInput, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useNavigation } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';

const VerifyCardScreen = () => {
  const [codes, setCodes] = useState(['', '', '', '', '']); // Quản lý giá trị từng trường
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    // Mặc định điền vào trường đầu tiên
    inputs.current[0]?.focus();
  }, []);

  const focusNextInput = (index: number) => {
    if (index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const focusPrevInput = (index: number) => {
    if (index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleChange = (text: string, index: number) => {
    const newCodes = [...codes];
    newCodes[index] = text;

    // Nếu có ký tự, chuyển đến trường tiếp theo
    if (text && index < newCodes.length - 1) {
      focusNextInput(index);
    }

    setCodes(newCodes);
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && codes[index] === '') {
      focusPrevInput(index);
    }
  };

  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePress = () => {
    if (isFormValid()) {
      navigation.navigate('adding_card/card_list');
    } else {
      // Xử lý trường hợp không hợp lệ (có thể hiển thị thông báo lỗi)
      console.log('Form is not valid');
    }
  };

  const handleResendCode = () => {
    console.log('Resend code logic here'); // Thay thế bằng logic thực tế
  };

  const isFormValid = () => {
    // Kiểm tra nếu tất cả các trường đều có ký tự và tổng độ dài là 5
    return codes.every(code => code.length > 0) && codes.length === 5;
  };

  return (
      <>
        <Stack.Screen options={{ headerShown: false }} />

        <View className="flex-1 h-full justify-center bg-white items-center mt-12 p-4">
          <Text className="text-2xl font-bold mb-4 absolute top-2 p-4 left-0">Verify your card</Text>
          <Text className="text-gray-500 text-center mb-6 absolute top-16 ml-4 left-0">
            We send 5 digits code to yourname@example.com
          </Text>

          <View className="flex-row justify-between mb-2 w-4/5">
            {Array(5).fill('').map((_, index) => (
                <TextInput
                    key={index}
                    ref={el => inputs.current[index] = el}
                    className="border-b border-gray-300 text-center w-1/6 p-2"
                    keyboardType="numeric"
                    maxLength={1} // Giới hạn nhập tối đa 1 ký tự
                    value={codes[index]}
                    onChangeText={(text) => handleChange(text, index)}
                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                />
            ))}
          </View>

          <View className='flex flex-row items-center justify-center mt-4'>
            <Text className="text-center text-gray-500">
              Didn’t get a code?
            </Text>
            <TouchableOpacity
                className="ml-2" // Thêm khoảng cách giữa Text và TouchableOpacity
                onPress={handleResendCode}>
              <Text className="text-[#304fff]">Resend</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
              className={`rounded-full p-5 absolute bottom-16 w-11/12 ${isFormValid() ? 'bg-blue-500' : 'bg-[#b8b8b8]'}`}
              onPress={isFormValid() ? handlePress : undefined}
              disabled={!isFormValid()}
          >
            <Text className={`text-center ${isFormValid() ? 'text-white' : 'text-gray-700'}`}>Verify</Text>
          </TouchableOpacity>
        </View>
      </>
  );
};

export default VerifyCardScreen;