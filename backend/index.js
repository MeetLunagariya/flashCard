require("dotenv").config();
const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
app.use(cors());
// Database connection
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "mydatabase",
  password: "postgres",
  port: 5432,
});

// Connect to the database
client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Connection error", err.stack));

app.use(bodyParser.json());


app.get("/cards", async (req, res) => {
  const query = "SELECT * FROM cards";

  try {
    const result = await client.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Basic route
app.post("/users", async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const text =
    "INSERT INTO cards( question, answer) VALUES($1, $2) RETURNING *";
  const values = [question, answer];

  try {
    const result = await client.query(text, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Clean up on server shutdown
process.on("SIGINT", () => {
  client
    .end()
    .then(() => {
      console.log("Disconnected from the database");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error disconnecting from the database", err.stack);
      process.exit(1);
    });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
