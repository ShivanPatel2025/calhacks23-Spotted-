import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

import HomeScreen from "../components/HomeScreen.js";
import DetailsScreen from "../components/DetailsScreen.js";
import PlantsScreen from "../components/PlantsScreen.js";
import LoadingScreen from "../components/LoadingScreen.js";
import WelcomeScreen from '../components/WelcomeScreen.js';
import SignupScreen from "../components/SignupScreen.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require("../assets/NavHome.png");
          } else if (route.name === 'Details') {
            iconSource = require("../assets/NavLeaf.png");
          } else if (route.name === 'Plants') {
            iconSource = require("../assets/NavAdd.png");
          }

          return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#B5DCAB',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
      <Tab.Screen name="Plants" component={PlantsScreen} />
    </Tab.Navigator>
  );
}

function AppNavigation() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Welcome");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="Loading">
      <Stack.Screen
        name="Main"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}


export default AppNavigation;
