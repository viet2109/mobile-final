import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface Props {}

function Login(props: Props) {
  const {} = props;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <Text>Login</Text>
      </View>
    </>
  );
}

export default Login;
