import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

function HomeScreen({ navigation }) {
  const [wateringFrequency, setWateringFrequency] = useState(null);
  const fetchWateringFrequency = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.44:3000/getPlant"
      );
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
    </View>
  );
}

export default HomeScreen;