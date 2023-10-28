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
  },
  titleText: {
    fontSize: 48,
    fontWeight: "600",
    width: 332,
    textAlign: "center",
    marginBottom: 60,
    fontFamily: "KalamBold",
  },
  text: {
    fontSize: 23,
    fontWeight: "600",
    width: 332,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Kalam",
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
    marginBottom: 15,
    padding: 10,
    fontFamily: "Kalam",
    fontSize: 28,
  },
  signupButton: {
    backgroundColor: "#B5DCAB",
    borderRadius: 15,
    width: 332,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  signupText: {
    color: "black",
    fontSize: 35,
    fontWeight: "600",
    fontFamily: "KalamBold",
  },
});

function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    fetch("http://192.168.1.44:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, email: userEmail, password }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        // Check if the response contains an error message
        if (data.error) {
          // Handle the duplicate error (username or email already exists)
          console.error(data.error); // You can display this error message to the user
        } else {
          const token = data.token;
          await AsyncStorage.setItem("userToken", token);
          navigation.navigate("Main");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle other signup errors here
      });
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/LeavesFallingLottie.json")}
        style={styles.background}
        speed={0.7}
        autoPlay
        loop
      />
      <Text style={styles.titleText}>Sign Up for Plantly</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholderTextColor="#DEFCD7"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userEmail}
        onChangeText={(text) => setUserEmail(text)}
        placeholderTextColor="#DEFCD7"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="#DEFCD7"
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Already have an account?{" "}
        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
          <Text style={styles.clickableText}>Log In</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}

export default SignupScreen;