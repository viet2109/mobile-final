@ -1,38 +0,0 @@
import { Stack } from 'expo-router';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddBanner() {
    const navigation = useNavigation<StackNavigationProp<any>>();

    const handlePress = () => {
        navigation.navigate('adding_card/card_input');
    };
    return (
    <>
        <Stack.Screen options={{ headerShown: false }} />
        <View className='flex-1 justify-center items-center bg-[#f7f7f7] p-5'>
            <View className='w-full absolute top-0'>
                {/* Use require to load the local image */}
                <Image
                    source={require('../../assets/images/adding_banner.jpg')}
                    className='w-full h-auto'
                    resizeMode="contain"
                />
            </View>
            <Text className='text-4xl font-bold text-black mt-32 '>Let’s add your card</Text>
            <Text className='text-base text-gray-600 text-center mt-3 w-11/12 '>
                Experience the power of financial organization with our platform.
            </Text>
            <TouchableOpacity
            className='bg-[#304fff] py-4 px-16 rounded-full absolute bottom-16 w-11/12'
            onPress={handlePress} // Thêm sự kiện bấm
        >
            <Text className='text-lg font-bold text-white text-center'>+ Add your card</Text>
        </TouchableOpacity>
        </View>
    </>
    );
}