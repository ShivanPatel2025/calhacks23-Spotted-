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
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    opacity: 0.5,
    backgroundColor: "transparent", // optional
    transform: [{ scale: 1.5 }],
  },
  titleText: {
    fontSize: 48,
    fontWeight: "600",
    width: 332,
    textAlign: "center",
    marginBottom: 70,
    fontFamily: "KalamBold",
  },
  text: {
    fontSize: 23,
    fontWeight: "600",
    width: 332,
    textAlign: "center",
    marginBottom: 70,
    fontFamily: "Kalam",
  },
  clickableText: {
    fontSize: 23,
    fontWeight: "600",
    width: 332,
    textAlign: "center",
    marginBottom: 10,
    color: "#59A475",
    fontFamily: "Kalam",
  },
  input: {
    width: 332,
    height: 60,
    backgroundColor: "#B5DCAB",
    borderRadius: 15,
    marginBottom: 17,
    padding: 10,
    fontFamily: "Kalam",
    fontSize: 28,
  },
  loginButton: {
    backgroundColor: "#B5DCAB",
    borderRadius: 15,
    width: 332,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  loginText: {
    color: "black",
    fontSize: 35,
    fontWeight: "600",
    fontFamily: "KalamBold",
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
        speed={0.7}
        autoPlay
        loop
      />
      <Text style={styles.titleText}>Welcome to Plantly!</Text>
      <TextInput
        style={styles.input}
        placeholder="Username/Email"
        value={userEmail}
        onChangeText={(text) => setUserEmail(text)}
        placeholderTextColor="#DEFCD7"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true} // For hiding the password
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="#DEFCD7"
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
            .then(async (data) => {
              if (data.error) {
                console.error(data.error);
              } else {
                const token = data.token;
                await AsyncStorage.setItem("userToken", token);
                navigation.navigate("Main");
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
      <Text style={styles.text}>
        New to Plantly?{" "}
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.clickableText}>Create Account</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

export default WelcomeScreen;