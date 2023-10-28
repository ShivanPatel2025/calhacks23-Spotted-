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
  },
});

function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Details Screen</Text>
      <Button
        title="Go to Plant List"
        onPress={() => navigation.navigate("Plants")}
      />
    </View>
  );
}

export default DetailsScreen;
