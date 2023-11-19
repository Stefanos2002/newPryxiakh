const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://127.0.0.1:27017/Database");

let db = mongoose.connection;

db.on("error", () => console.log("Error in connecting to database"));
db.once("open", () => console.log("Connected to database"));

// const counterSchema = new mongoose.Schema({
//   _id: String,
//   sequence_value: Number,
// });

// const Counter = mongoose.model("Counter", counterSchema);

// Counter.create({ _id: "userId", sequence_value: 0 })
//   .then(() => {
//     console.log("Counter initialized");
//   })
//   .catch((err) => {
//     console.error("Counter initialization error:", err);
//   });

app.post("/sign_up", async (req, res) => {
  let username = req.body.Username;
  let email = req.body.email;
  let pass = req.body.password;
  let passwordValidation = req.body["password-verification"];

  const errors = [];

  if (passwordValidation !== pass)
    errors.push("the passwords are not the same");
  if (pass.length < 8)
    errors.push("Password must be at least 8 characters long");
  if (username.length < 8)
    errors.push("Username must be at least 8 characters long");

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  } else {
    const data = {
      username: username,
      email: email,
      password: pass,
    };

    await db.collection("Users").insertOne(data);
    console.log("Record inserted successfully");
    return res.status(200).json({ message: "Signup successful" });
  }
});
// initializeCounter();

app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });

  app.get("/", (req, res) => {
    res.set({
      "Allow-access-Allow-Origin": "*",
    });
    // return res.redirect("index.html");
  });

  app.use("/games", express.static(path.join(__dirname, "/public")));

  //specific path
  app.get("/games", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/games.html"));
  });

  app.get("/games/:gameName", (req, res) => {
    const gameName = req.params.gameName;
    const filePath = path.join(__dirname, `/public/${gameName}.html`);
    res.sendFile(filePath);
  });

  app.use((req, res) => {
    res.status(404);
    res.send(`<h1>Error 404: Resource not found</h1>`);
  });

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
});
