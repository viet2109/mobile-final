
import React, { useState } from 'react';
import { View, Text, Button, Dimensions, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Stack } from "expo-router";

const Onboarding = () => {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState(0);
  const completeOnboarding = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('Welcome');
  };
  const screenHeight = Dimensions.get('window').height;

  const stages = [
    {
      image: require('../assets/images/onBoarding/bd1.jpg'),
      title: 'Trusted by millions of people, part of one part'
    },
    {
      image: require('../assets/images/onBoarding/bd2.jpg'),
      title: 'Spend money abroad, and track your expense'
    },
    {
      image: require('../assets/images/onBoarding/bd3.jpg'),
      title: 'Receive Money From Anywhere In The World'
    },
  ];
  const handleNext = () => {
    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1);
    } else {
      completeOnboarding();
    }
  };
  return (


    <>
      <Stack.Screen
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' }
        }}
      />

      <View style={{ height: screenHeight * 0.7, }} className="items-center bg-white  mt-36">
        {/* content */}
        <View className="flex-1 items-center justify-center">
          <Image
            source={stages[currentStage].image}
            style={{ width: 200, height: 300, marginBottom: 20 }}
          />
          {/* thanh stage */}
          <View className="flex-row justify-between items-center w-4/5 mt-6 px-20">
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                className={`h-2 w-1/5 mx-1 ${currentStage === index ? 'bg-blue-bg' : 'bg-gray-300'} rounded-full`}
                style={{
                  width: currentStage === index ? 18 : 38,

                }}
              />
            ))}
          </View>


              {/* text */}
          <Text className="p-10 text-2xl font-bold mb-4 text-center">{stages[currentStage].title}</Text>
        </View>

        {/*  "Next" */}
        <View className="mt-10 w-full items-center">
          <TouchableOpacity
            onPress={handleNext}
            className="bg-blue-bg py-3 px-6 rounded-full w-4/5"

          >
            <Text className="text-white text-lg font-bold text-center ">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Onboarding;