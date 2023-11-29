const express = require("express"); //express.js framework
const bodyParser = require("body-parser"); //commonly used to handle Form Submissions and other type of data sent in the request body
const mongoose = require("mongoose"); //an ODM (Object Data Modeling) library for MongoDB and Node.js. It simplifies working with monogoDB dbs with a schema-based solution
const path = require("path"); //a built-in module in Node.js. The "path" module provides utilities for working with file and directory paths

const app = express(); //this line creates an instance of the Express application.'app' will be used to configure routes, middleware, and other settings for the web server.

app.use(bodyParser.json()); //It adds a middleware function that parses the request body if the content type is JSON
app.use(express.static("public")); //sets up a static file server to serve files from the "public" directory.

app.use(
  //enables parsing of URL-encoded data. Upon submitting a form on a website, the data is sent to the server in the URL-encoded format..
  bodyParser.urlencoded({
    extended: true, //this option allows parsing of nested objects, which is useful when dealing with more complex form data.
  })
);

mongoose.connect("mongodb://localhost/Database");
let db = mongoose.connection;

db.on("error", () => console.log("Error in connecting to database"));
db.once("open", () => console.log("Connected to database"));

//a schema is a way to define the structure and constraints for the documents that will be stored in the MongoDB collection
//the specific schema is used to implement an auto incremented counter in MongoDB
const counterSchema = new mongoose.Schema({
  _id: String, //specifying the data type for id
  sequence_value: Number, //incremented each time a new identifier is created
});

//using a userSchema with Mongoose to store users, instead of directly accessing the MongoDB driver
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

//creating a model for Counter
const Counter = mongoose.model("Counter", counterSchema);
// Create a model based on the userSchema
const User = mongoose.model("User", userSchema);

//this is the part that fixes duplicate values of userId
//an async function returns a promise(an object that represents the completion or failure of the async function)
async function initializeCounter() {
  try {
    const counter = await Counter.findOne({ _id: "userId" });

    if (!counter) {
      // Counter document with _id: "userId" doesn't exist, so create it
      await Counter.create({ _id: "userId", sequence_value: 0 });
      console.log("Counter initialized");
    }

    // Now that the Counter is guaranteed to exist, you can proceed with the rest of your code
    SignUp();
  } catch (err) {
    console.error("Error initializing Counter:", err);
  }
}

function SignUp() {
  app.post("/sign_up", async (req, res) => {
    //it defines a route for handling HTTP POST requests to the "/sign_up" endpoint.
    //next is extracting data from the request body
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
      // If the request accepts JSON, send JSON response
      //this is the part that handles client-side errors, which we declared above
      return res.status(400).json({ errors });
    }
    //else, if everything works great and i dont have any errors in my form
    else {
      const data = {
        username: username,
        email: email,
        password: pass,
      };
      try {
        // Create a new user document using the User model by mongoose
        const newUser = await User.create(data);
        console.log("Record inserted successfully");

        // If the request accepts JSON, send JSON response
        return res.status(200).json({ message: "Signup successful" });
      } catch (error) {
        //this is the part that handles server side errors
        console.error("Error inserting user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  });

  // app.get("/", (req, res) => {
  //   res.set({
  //this is a CORS header, used for cross origin request. Neccessary if frontend and backend are on different domains
  //     "Access-Control-Allow-Origin": "*",
  //   });
  //   // return res.redirect("index.html");
  // });
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
  res.status(404).json({ error: "Resource not found" });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

initializeCounter();
