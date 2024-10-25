import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import screensConfig, { screenNames } from "./configs/screenConfigs";
import "./index.css"

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={screenNames.home as keyof RootStackParamList}
      >
        {screensConfig.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name as keyof RootStackParamList}
            component={screen.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  
  );
};

export default App;
