const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Welcome@123", 
    database: "user_db",       
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
    } else {
        console.log("Connected to MySQL");
    }
});

// API to register a user
app.post("/register", (req, res) => {
    const { email, password, phoneNumber } = req.body;
    const query = "INSERT INTO users (email, password, phone_number) VALUES (?, ?, ?)";
    db.query(query, [email, password, phoneNumber], (err, result) => {
        if (err) {
            console.error("Error inserting user:", err);
            res.status(500).send("Error registering user");
        } else {
            res.status(200).send("User registered successfully");
        }
    });
});

// API to login a user
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Error fetching user:", err);
            res.status(500).send("Error logging in");
        } else if (results.length > 0) {
            res.status(200).send("Login successful");
        } else {
            res.status(401).send("Invalid email or password");
        }
    });
});

// Start the server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});