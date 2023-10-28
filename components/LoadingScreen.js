import React from 'react';
import { View, Text, Button, StyleSheet, Image } from "react-native";
import LottieView from 'lottie-react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0', // Background color for the container
    },
    animationContainer: {
      alignItems: 'center', // Center the animation horizontally within the container
      marginRight: 0, // Adjust the margin to shift the animation to the right
    },
    animation: {
      marginTop: -50, // Add margin to the animation
      width: 600, // Adjust the width of the animation
      height: 600, // Adjust the height of the animation
    },
    textContainer: {
      marginTop: -150, // Increase the top margin to move the text higher up
    },
    text: {
      fontSize: 60,
      fontWeight: '500',
      fontFamily: "KalamBold",
    },
  });

function LoadingScreen({ navigation }) {
    return (
        <View style={styles.container}>
          <View style={styles.animationContainer}>
            <LottieView
              source={require('../assets/LoadingLottie.json')}
              autoPlay
              loop
              style={styles.animation}
              speed={2.0}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Plantly</Text>
          </View>
        </View>
      );
}

export default LoadingScreen;
