import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 10,
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
  signupButton: {
    backgroundColor: "#B5DCAB",
    borderRadius: 15,
    width: 332,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "black",
    fontSize: 30,
    fontWeight: "600",
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
      .then((data) => {
        // Check if the response contains an error message
        if (data.error) {
          // Handle the duplicate error (username or email already exists)
          console.error(data.error); // You can display this error message to the user
        } else {
          navigation.navigate("Home");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle other signup errors here
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Sign Up for Plantly</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userEmail}
        onChangeText={(text) => setUserEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Already have an account? Log In</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

export default SignupScreen;