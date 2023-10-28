import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    width: '90%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    margin: 5,
    borderColor: '#B5DCAB',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#B5DCAB',
    textAlign: 'center',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    width: 80,
    height: 80,
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedIcon: {
    borderColor: '#B5DCAB',
  },
});


function PlantsScreen({ navigation }) {
  const [commonName, setCommonName] = useState('');
  const [nickname, setNickname] = useState('');
  const [daysOld, setDaysOld] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(null);
  const iconPaths = [
    require('../assets/plant-1.png'),
    require('../assets/plant-2.png'),
    require('../assets/plant-3.png'),
    require('../assets/plant-4.png'),
    require('../assets/plant-5.png'),
    require('../assets/plant-6.png'),
    require('../assets/plant-7.png'),
    require('../assets/plant-8.png'),
    require('../assets/plant-9.png'),
  ];

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

  const handlePlantSubmission = async () => {
    // Create an object with the user's plant information
    const userPlant = {
      commonName,
      displayName: nickname,
      age: parseInt(daysOld),
      icon: String(parseInt(selectedIcon, 10) - 6),
    };

    const token = await getToken();
    // Send a POST request to add the user's plant
    fetch("http://192.168.1.44:3000/addUserPlant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify(userPlant),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Plant added:", data);
      })
      .catch((error) => {
        console.error(error);
        // Handle errors here
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Add Your Plant!</Text>
        <TextInput
          style={styles.input}
          placeholder="Common Name"
          value={commonName}
          onChangeText={setCommonName}
        />
        <TextInput
          style={styles.input}
          placeholder="Nickname/Display Name"
          value={nickname}
          onChangeText={setNickname}
        />
        <TextInput
          style={styles.input}
          placeholder="Days Old"
          value={daysOld}
          onChangeText={setDaysOld}
          keyboardType="numeric"
        />
        <View style={styles.iconGrid}>
          {iconPaths.map((path, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedIcon(path)}>
              <Image source={path}
                style={[
                  styles.icon, 
                  selectedIcon === path && styles.selectedIcon,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Submit"
            onPress={() => {
              handlePlantSubmission();
            }}
            color="#B5DCAB"
          />
        </View>
      </View>
    </View>
  );
}

export default PlantsScreen;