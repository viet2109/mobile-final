// app/pin_setup.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableWithoutFeedback, Clipboard } from 'react-native';

const PinSetup = () => {
    const [passcode, setPasscode] = useState('');
    const inputRef = useRef<TextInput>(null);

    // Tự động focus vào trường nhập liệu khi component được mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const renderDots = () => {
        return Array.from({ length: 4 }).map((_, index) => (
            <View
                key={index}
                className={`w-6 h-6 rounded-full mx-4 ${passcode[index] ? 'bg-black' : 'bg-gray-300'}`}
            />
        ));
    };

    const handleDotPress = () => {
        inputRef.current?.focus(); // Focus vào trường nhập liệu khi nhấn vào ô tròn
    };

    const handlePaste = async () => {
        const clipboardContent = await Clipboard.getString();
        if (/^\d{0,4}$/.test(clipboardContent)) {
            setPasscode(clipboardContent);
        }
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <View className='flex-1 h-full justify-center bg-white items-center p-4  absolute w-full'>
            <Text className='text-2xl font-bold mb-4 absolute top-2 p-4 mt-[60px]  left-0'>Create passcode</Text>
            <Text className='text-gray-500 absolute top-36  ml-4 left-0'>
                This info needs to be accurate with your ID document.
            </Text>
            <View className='flex-row mb-6 absolute top-28 mt-48'>
                {renderDots()}
            </View>
            <TouchableWithoutFeedback onPress={handleDotPress}>
                <View className='absolute top-28 w-4/5 h-12 z-10' />
            </TouchableWithoutFeedback>
            <TextInput
                ref={inputRef}
                className='absolute top-28 p-44 w-4/5 h-12 text-center text-2xl border-b-2 border-gray-400 mb-6 opacity-0' // Ẩn trường nhập liệu
                value={passcode}
                onChangeText={(text) => {
                    if (text.length <= 4 && /^[0-9]*$/.test(text)) {
                        setPasscode(text);
                    }
                }}
                placeholder="Enter your passcode"
                keyboardType="numeric"
                secureTextEntry={true} // Ẩn ký tự đã nhập
                maxLength={4}
                onBlur={() => {}}
                onPaste={handlePaste} // Cho phép dán vào trường nhập liệu
                pointerEvents="none" // Ngăn hiển thị dấu trỏ chuột
            />
        </View>
    );
};

export default PinSetup;