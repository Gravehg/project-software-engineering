const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/authRoutes");

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, "public/browser")));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", authRoutes);

// Handle Angular routing, return all requests to the Angular app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/browser/index.html"));
});

module.exports = app;
