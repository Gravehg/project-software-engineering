const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/supportCategoryRoutes");
const supportRoutes = require("./routes/supportRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, "public/browser")));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", authRoutes);
app.use("/api/category/", categoryRoutes);
app.use("/api/support/", supportRoutes);
app.use("/api/ticket/", ticketRoutes);
// Handle Angular routing, return all requests to the Angular app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/browser/index.html"));
});

module.exports = app;
