import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import Appstore from "./src/store";
import "./i18n";
import Home from "./src/components/Home";
import GnomeDetails from "./src/components/GnomeDetails";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Appstore}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#224de3",
            },
            headerTintColor: "#FFF",
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Gnomebook" }}
          />
          <Stack.Screen
            name="GnomeDetails"
            component={GnomeDetails}
            options={{ title: "" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
