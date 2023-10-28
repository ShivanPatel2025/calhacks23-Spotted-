import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from "./navigation/AppNavigation.js";
import { useFonts } from "@expo-google-fonts/kalam";

function App() {
  const [fontsLoaded] = useFonts({
    Kalam: require("./assets/Kalam-Regular.ttf"),
    KalamLight: require("./assets/Kalam-Light.ttf"),
    KalamBold: require("./assets/Kalam-Bold.ttf"),
  });

  if (!fontsLoaded) {
    // Font is not yet loaded, you can render a loading screen or return null
    return null;
  }

  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}

export default App;