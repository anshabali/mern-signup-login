const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./Routes/authRoutes.js");
const employeeRoutes = require("./Routes/employeeRoutes.js");
const verifyUser = require ("./middleware/Verifyuser")
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true,
  })
);


mongoose.connect("mongodb://localhost:27017/users")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/api/employee", verifyUser, employeeRoutes);
app.use("/api/auth", authRoutes);




app.listen(3001, () => {
  console.log("Server is running");
});
