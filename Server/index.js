import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import employeeRoutes from "./Routes/employeeRoutes.js";
import verifyUser from "./middleware/Verifyuser.js";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

mongoose
  .connect("mongodb://localhost:27017/users")
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
