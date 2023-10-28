import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

import { Dimensions } from 'react-native';

// Get the screen width
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c8dbba", // Set the background color here
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: 500,  // You can set your desired width
    height: 500,
    marginBottom: -200,
  },
});


function HomeScreen({ navigation }) {
  const [wateringFrequency, setWateringFrequency] = useState(null);
  const fetchWateringFrequency = async () => {
    try {
      const response = await fetch("http://192.168.1.44:3000/getPlant");
      if (!response.ok) {
        console.error(
          "HTTP error! Status: ",
          response.status,
          response.statusText
        );
        throw new Error(
          `HTTP error! Status: ${response.status} - ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log("Data:", data);
      setWateringFrequency(data["Watering Frequency"]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the home to Plantly!</Text>
      {wateringFrequency ? (
        <Text>Watering Frequency: {wateringFrequency}</Text>
      ) : (
        <Button
          title="Get Watering Frequency"
          onPress={fetchWateringFrequency}
        />
      )}
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <Image 
        source={require("../assets/HomeShelvingExpanded.png")} 
        style={styles.image}
      />
    </View>
  );
}

export default HomeScreen;