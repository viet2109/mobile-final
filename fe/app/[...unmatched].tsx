import React, { useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import { useRouter } from "expo-router";
import { Stack, Link } from "expo-router";
const PageNotFound = () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
          headerShadowVisible: false,
        }}
      />

      <View className="bg-white">
        <View className=" justify-center items-center  ">
          <Image
            className="ml-8"
            source={require("../assets/images/404Page.jpg")}
            style={{
              width: "85%",
              height: "60%",
            }}
            resizeMode="contain"
          />
          <Text className=" px-10 mb-2  text-3xl font-bold  text-center">
            Error 404{" "}
          </Text>
          <Text className=" px-10 mb-2  text-3xl font-bold  text-center">
            Page Not Found
          </Text>
          <Text className=" text-sm px-6 text-gray-500 text-center">
            OOps! It looks like the page you're looking for doesn't exist or has
            been moved. Please try again or go back to the home page.{" "}
          </Text>
        </View>

        <View className=" w-full items-center">
          <TouchableOpacity
            className="bg-blue-bg py-3 px-6 rounded-full w-4/5"
            onPress={() => router.push("home")}
          >
            <Text className="text-white text-lg font-bold text-center ">
              Back to Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default PageNotFound;
