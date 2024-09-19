import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles.js";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './telas/Home';
import Screen1 from './telas/Screen1';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false}}/>
        <Stack.Screen name="Screen1" component={Screen1} options={{ headerBackVisible: true }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
