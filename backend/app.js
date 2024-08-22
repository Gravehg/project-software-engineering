const path = require("path");
const express = require("express");
const app = express();

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, "public/browser")));

// Handle Angular routing, return all requests to the Angular app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/browser/index.html"));
});

module.exports = app;
