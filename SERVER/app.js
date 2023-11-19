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

mongoose.connect("mongodb://localhost:27017/Database");

let db = mongoose.connection;

db.on("error", () => console.log("Error in connecting to database"));
db.once("open", () => console.log("Connected to database"));

const counterSchema = new mongoose.Schema({
  _id: String,
  sequence_value: Number,
});

const Counter = mongoose.model("Counter", counterSchema);
async function initializeCounter() {
  try {
    const counter = await Counter.findOne({ _id: "userId" });

    if (!counter) {
      // Counter document with _id: "userId" doesn't exist, so create it
      await Counter.create({ _id: "userId", sequence_value: 0 });
      console.log("Counter initialized");
    }

    // Now that the Counter is guaranteed to exist, you can proceed with the rest of your code
    startServer();
  } catch (err) {
    console.error("Error initializing Counter:", err);
  }
}
initializeCounter();

// Counter.create({ _id: "userId", sequence_value: 0 })
//   .then(() => {
//     console.log("Counter initialized");
//   })
//   .catch((err) => {
//     console.error("Counter initialization error:", err);
//   });
function startServer() {
  app.post("/sign_up", async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.password;

    try {
      const counter = await Counter.findOneAndUpdate(
        { _id: "userId" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );

      const data = {
        UID: counter.sequence_value,
        name: name,
        email: email,
        password: pass,
      };

      await db.collection("Users").insertOne(data);
      console.log("Record inserted successfully");
      res.redirect("signup_success.html");
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Error saving data to MongoDB");
    }
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
}
