require("dotenv").config({ path: "../.env" });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000; // Use the PORT environment variable if available
const cors = require("cors");

// Enable CORS
app.use(cors());

// Define the schema and model outside of the connectDB function
const plantSchema = new mongoose.Schema({
  "Common Name": String,
  "Scientific Name": String,
  "Watering Frequency": String,
  "Sunlight Preference": String,
});
const Plant = new mongoose.model("plants", plantSchema);

const dbURI = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Plantly API"); // You can customize the message
});

// Get first plant in the database
app.get("/getPlant", async (req, res) => {
  try {
    const plant = await Plant.findOne();
    console.log("Plant:", plant);
    res.send(plant);
  } catch (error) {
    console.error(error);
  }
});

// push new plant into database
app.post("/addPlant", async (req, res) => {
  const data = {
    "Common Name": req.body["Common Name"],
    "Scientific Name": req.body["Scientific Name"],
    "Watering Frequency": req.body["Watering Frequency"],
    "Sunlight Preference": req.body["Sunlight Preference"],
  };
  try {
    const result = await Plant.insertMany([data]);
    res.status(201).json(result[0]); // Respond with the inserted data or a success message.
    console.log(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the plant." }); // Respond with an error message.
  }
});

// Ensure the database is connected before starting the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
