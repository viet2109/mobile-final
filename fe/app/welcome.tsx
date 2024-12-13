
import React, { useEffect, useRef } from 'react';
import { View, Text, Image ,TouchableOpacity} from 'react-native';

import { useRouter } from 'expo-router';
import { Stack ,Link} from "expo-router";
const Welcome = () => {
  const router = useRouter();
  

  

  

  return (
    <>
            <Stack.Screen options={{ headerShown: false,
            headerTitle:'',
            contentStyle: {backgroundColor: 'white'},
            headerShadowVisible: false

            }
             }
     />

        <View className='bg-white'>
      <View className=' justify-center items-center  ' >
      <Image className='ml-8'
            source={require('../assets/images/Welcome.jpg')}
           style={{
            width: '85%',
            height: '60%'
           }}
           resizeMode='contain'
          />
          <Text className=" px-10 mb-2  text-4xl font-bold  text-center">Congratulations! </Text>
          <Text className=" px-6 mb-4  text-4xl font-bold  text-center">Welcome to Coinpay</Text>
          <Text className=" text-sm px-6 text-gray-500 text-center">We are happy to have you. It's time to send, receive and track your expense. </Text>


        </View>

       
        <View className=" w-full items-center mt-10">
          <TouchableOpacity className="bg-blue-bg py-3 px-6 rounded-full w-4/5"
            onPress={()=> router.push('login')}
          >
            <Text className="text-white text-lg font-bold text-center ">Continue</Text>


          </TouchableOpacity>
        
      </View>
      </View>
   </>
  );
};

export default Welcome;