const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { registerValidate, loginValidate } = require("./Controlls/Authcontrolls");
const verifyUser = require ("./middleware/Verifyuser")
const {getEmployee,createEmployee,updateEmployee,deleteEmployee} = require ("./Controlls/EmployeeController")
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


   app.get("/employee", verifyUser,getEmployee);
  
app.post("/login", loginValidate);
app.post("/register", registerValidate);
app.post("/employee",verifyUser, createEmployee);
app.put("/employee/:id", verifyUser, updateEmployee); 
app.delete("/employee/:id", verifyUser, deleteEmployee);


app.listen(3001, () => {
  console.log("Server is running");
});
