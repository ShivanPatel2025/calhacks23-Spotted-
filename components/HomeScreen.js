import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Change "center" to "flex-start"
    alignItems: "center",
    backgroundColor: "#c8dbba",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: "KalamBold",
  },
  shelfImage: {
    width: 500,
    height: 500,
    marginTop: 165,
    zIndex: -1,
  },
  plantImage: {
    width: 100,
    height: 100,
    position: "absolute",
    alignSelf: "center",
  },
  firstRow: {
    top: "30%",
  },
  secondRow: {
    top: "58%",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "KalamBold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const plantImages = {
  1: require("../assets/plant-1.png"),
  2: require("../assets/plant-2.png"),
  3: require("../assets/plant-3.png"),
  4: require("../assets/plant-4.png"),
  5: require("../assets/plant-5.png"),
  6: require("../assets/plant-6.png"),
  7: require("../assets/plant-7.png"),
  8: require("../assets/plant-8.png"),
  9: require("../assets/plant-9.png"),
};

function HomeScreen({ navigation }) {
  const [plants, setPlants] = useState([]);
  const [user, setUser] = useState("");
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token !== null) {
        return token;
      }
    } catch (error) {
      console.error("Error fetching the token", error);
    }
  };

  const getUserUsername = async () => {
    try {
      const token = await getToken();
      const response = await fetch("http://192.168.1.44:3000/getUserUsername", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data:", data);
      setUser(data.username); // Set the user's username
    } catch (error) {
      console.error("Error fetching user's data:", error);
    }
  };
  const getPlants = async () => {
    try {
      const token = await getToken();
      const response = await fetch("http://192.168.1.44:3000/getUserPlants", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPlants(data.plants);
      console.log(data.plants);
    } catch (error) {
      console.error("Error fetching user's plants:", error);
    }
  };

  useEffect(() => {
    // Add a focus listener to refetch data when the screen comes into focus
    const unsubscribe = navigation.addListener("focus", () => {
      getPlants();
      getUserUsername(); // Fetch user data when the screen comes into focus
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{user}'s Nursery</Text>
      {plants.slice(0, 3).map((plant, index) => (
        <TouchableOpacity
          key={plant._id}
          style={[
            styles.plantImage,
            styles.firstRow,
            { left: `${(index + 0.25) * 30}%` },
          ]}
          onPress={() => {
            setSelectedPlant(plant);
            setModalVisible(true);
          }}
          activeOpacity={0.8}
        >
          <Image
            source={plantImages[plant.Icon]}
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>
      ))}

      {plants.slice(3, 6).map((plant, index) => (
        <TouchableOpacity
          key={plant._id}
          style={[
            styles.plantImage,
            styles.secondRow,
            { left: `${(index + 0.25) * 30}%` },
          ]}
          onPress={() => {
            setSelectedPlant(plant);
            setModalVisible(true);
          }}
          activeOpacity={0.8}
        >
          <Image
            source={plantImages[plant.Icon]}
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>
      ))}

      <Image
        source={require("../assets/HomeShelvingExpanded.png")}
        style={styles.shelfImage}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedPlant && (
              <View>
                <Text style={styles.modalText}>
                  Plant Name: {selectedPlant.name}
                </Text>
                <Text style={styles.modalText}>
                  Description: {selectedPlant.description}
                </Text>
                {/* Add more plant information here */}
              </View>
            )}
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default HomeScreen;
