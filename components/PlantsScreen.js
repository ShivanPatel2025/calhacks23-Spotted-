import React from "react";
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

function PlantsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Plant Screen!</Text>
      <Button
        title="Go to Loading"
        onPress={() => navigation.navigate("Loading")}
      />
    </View>
  );
}

export default PlantsScreen;