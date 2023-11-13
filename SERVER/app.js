const express = require("express");
const path = require("path");
const app = express();

app.use("/games", express.static(path.join(__dirname, "/public")));

//specific path
app.get("/games", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/games.html"));
});
// app.get("/games/god-of-war", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/gow.html"));
// });

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
