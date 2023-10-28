import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from "./navigation/AppNavigation.js";

function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}

export default App;