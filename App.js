import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import Appstore from "./src/store";
import Home from "./src/components/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Appstore}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#002674",
            },
            headerTintColor: "#067d26",
          }}
        >
          <Stack.Screen name="Home" component={Home} options={{ title: "" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
