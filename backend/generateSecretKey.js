const crypto = require("crypto");
const fs = require("fs");

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString("hex"); // Generate a 32-character hexadecimal string

// Save the secret key to your .env file
fs.writeFileSync("../.env", `SECRET_KEY=${secretKey}\n`, { flag: "a" });

console.log("Secret key generated and saved to .env file.");
