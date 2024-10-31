
import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Stack } from "expo-router";
const Index = () => {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      checkOnboardingStatus();
    });
  }, []);

  const checkOnboardingStatus = async () => {
    const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
    
    if (hasSeenOnboarding === null) {
      router.replace('onBoarding');
    } else {
      router.replace('onBoarding');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
       <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity }}>
      <Text className="text-4xl text-white font-bold">Banking App</Text>
    </Animated.View>
   </>
  );
};

export default Index;