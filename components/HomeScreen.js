import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c8dbba",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  shelfImage: {
    width: 500,
    height: 500,
    marginBottom: -282,
    zIndex: -1,
  },
  plantImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    alignSelf: 'center',
  },
  firstRow: {
    top: '30%',
  },
  secondRow: {
    top: '58%',
  },
});

const plantImages = {
  "1": require("../assets/plant-1.png"),
  "2": require("../assets/plant-2.png"),
  "3": require("../assets/plant-3.png"),
  "4": require("../assets/plant-4.png"),
  "5": require("../assets/plant-5.png"),
  "6": require("../assets/plant-6.png"),
  "7": require("../assets/plant-7.png"),
  "8": require("../assets/plant-8.png"),
  "9": require("../assets/plant-9.png"),
};

function HomeScreen({ navigation }) {
  const [plants, setPlants] = useState([]);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        return token;
      }
    } catch (error) {
      console.error("Error fetching the token", error);
    }
  }

  const getPlants = async () => {
    try {
      const token = await getToken();
      const response = await fetch("http://192.168.1.44:3000/getUserPlants", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPlants(data.plants);
      console.log(data.plants)
    } catch (error) {
      console.error("Error fetching user's plants:", error);
    }
  };

  useEffect(() => {
    // Add a focus listener to refetch data when the screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      getPlants();
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>

      {plants.slice(0, 3).map((plant, index) => (
        <View key={plant._id} style={[styles.plantImage, styles.firstRow, { left: `${(index + .25) * 30}%` }]}>
          <Image source={plantImages[plant.Icon]} style={{ width: 100, height: 100 }} />
        </View>
      ))}

      {plants.slice(3, 6).map((plant, index) => (
        <View key={plant._id} style={[styles.plantImage, styles.secondRow, { left: `${(index + .25) * 30}%` }]}>
          <Image source={plantImages[plant.Icon]} style={{ width: 100, height: 100 }} />
        </View>
      ))}

      <Image 
        source={require("../assets/HomeShelvingExpanded.png")} 
        style={styles.shelfImage}
      />
    </View>
  );
}

export default HomeScreen;
