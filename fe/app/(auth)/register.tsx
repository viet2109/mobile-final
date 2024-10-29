import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface Props {}

function Register(props: Props) {
  const {} = props;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <Text>Register</Text>
      </View>
    </>
  );
}

export default Register;
