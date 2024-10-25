const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Agrega esto
const app = express();

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/supportCategoryRoutes");
const supportRoutes = require("./routes/supportRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const adminRoutes = require("./routes/adminRoutes");

const corsOptions = {
  origin: '*', // O el dominio de tu frontend en producción
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Si necesitas compartir cookies o sesiones entre frontend y backend
};

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, "public/browser")));

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); // Esto permite todas las solicitudes de todos los orígenes

app.use("/api/auth/", authRoutes);
app.use("/api/category/", categoryRoutes);
app.use("/api/support/", supportRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/chat/", chatRoutes);
app.use("/api/message/", messageRoutes);
app.use("/api/ticket/", ticketRoutes);
app.use("/api/admin/", adminRoutes);

// Handle Angular routing, return all requests to the Angular app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/browser/index.html"));
});

module.exports = app;
