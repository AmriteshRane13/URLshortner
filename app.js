const express = require("express");
const path = require("path");
const app = express();
const urlRoutes = require("./src/routes/urlRoutes");
app.use(express.json());

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src/public")));

// ✅ Tell express where views are and which engine to use
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Routes
app.use("/", urlRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server running at port 3000");
});
