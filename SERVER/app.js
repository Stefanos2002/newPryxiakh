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

mongoose.connect("mongodb://localhost/Database");

let db = mongoose.connection;

db.on("error", () => console.log("Error in connecting to database"));
db.once("open", () => console.log("Connected to database"));

const counterSchema = new mongoose.Schema({
  _id: String,
  sequence_value: Number,
});

//creating counter
const Counter = mongoose.model("Counter", counterSchema);

//this is the part that fixes counter and userId
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

function startServer() {
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
      // Check if the request accepts HTML
      if (req.accepts("html")) {
        return res.status(400).send(`<h1>${errors.join("<br>")}</h1>`);
      } else {
        // If the request accepts JSON, send JSON response
        return res.status(400).json({ errors });
      }
    } else {
      const data = {
        username: username,
        email: email,
        password: pass,
      };
      try {
        // Assuming you're using the MongoDB driver directly
        await db.collection("Users").insertOne(data);
        console.log("Record inserted successfully");

        // Check if the request accepts HTML
        if (req.accepts("html")) {
          // Redirect or render an HTML success page
          return res.redirect("/success");
        } else {
          // If the request accepts JSON, send JSON response
          return res.status(200).json({ message: "Signup successful" });
        }
      } catch (error) {
        console.error("Error inserting user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });

  app.get("/", (req, res) => {
    res.set({
      "Allow-access-Allow-Origin": "*",
    });
    // return res.redirect("index.html");
  });
}

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

initializeCounter();
