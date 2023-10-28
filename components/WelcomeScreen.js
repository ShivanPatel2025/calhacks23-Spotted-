import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity, 
  StyleSheet,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    opacity: 0.5,
    backgroundColor: 'transparent',  // optional
    transform: [{ scale: 1.5 }]
  },
  titleText: {
    fontSize: 40,
    fontWeight: "600",
    width: 332,
    textAlign: "center",
    marginBottom: 70,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    width: 332,
    textAlign: "center",
    marginBottom: 70,
  },
  input: {
    width: 332,
    height: 60,
    backgroundColor: "#B5DCAB",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 10,
    padding: 10,
  },
  loginButton: {
    backgroundColor: "#B5DCAB",
    borderRadius: 15,
    width: 332,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: "black",
    fontSize: 30,
    fontWeight: "600",
  },
});

function WelcomeScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
        <LottieView
        source={require("../assets/LeavesFallingLottie.json")}
        style={styles.background}
        speed={.7}
        autoPlay
        loop
      />
      <Text style={styles.titleText}>Welcome to Plantly!</Text>
      <TextInput
        style={styles.input}
        placeholder="User/Email"
        value={userEmail}
        onChangeText={(text) => setUserEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true} // For hiding the password
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          fetch("http://192.168.1.44:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userEmail, password }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.error) {
                console.error(data.error);
              } else {
                // If login is successful, navigate to the home screen
                navigation.navigate("Home"); // Replace 'Home' with the actual name of your home screen
              }
            })
            .catch((error) => {
              console.error(error);
              // Handle login errors here.
            });
        }}
      >
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>
      <Text style={styles.text}>New to Plantly? Create Account</Text>

      {/* Create Account button with navigation to SignupScreen */}
      <Button title="Create Account" onPress={() => navigation.navigate("Signup")} />
      <Button title="Go to Home" onPress={() => navigation.navigate("Main")} />
    </View>
  );
}

export default WelcomeScreen;