const EmployeeModel = require("../models/Employee");

  const getEmployee =  async (req, res) => {
    try {
     
      
      const employees = await EmployeeModel.find({ userId: req.userId }); // Use userId to find employees
      return res.json(employees);
    } catch (error) {
      console.error("Error fetching employees:", error); // Log the error for debugging
      return res.status(500).json({ message: "Error fetching employees", error: error.message });
    }
  };


const createEmployee = async (req, res) => {
    const { name, contact, position } = req.body;
    const userId = req.userId; // Retrieved from the token
  
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access!" });
    }
  
    const newEmployee = new EmployeeModel({
      name,
      contact,
      position,
      userId, // Associate employee with the user
    });
  
    try {
      const savedEmployee = await newEmployee.save();
      res.status(201).json(savedEmployee);
    } catch (error) {
      return res.status(500).json({ message: "Error adding employee", error: error.message });
    }
  };
  
  const updateEmployee = async (req, res) => {
    const { name, contact, position } = req.body;
    const userId = req.userId; // Retrieved from token
    const employeeId = req.params.id; // Employee ID from the URL

    try {
        const updatedEmployee = await EmployeeModel.findOneAndUpdate(
            { _id: employeeId, userId }, // Ensure that the employee belongs to the user
            { name, contact, position },  // Updated employee data
            { new: true } // Return the updated document
        );
        
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found or unauthorized!" });
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        return res.status(500).json({ message: "Error updating employee", error: error.message });
    }
};


const deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const userId = req.userId;

  try {
      const deletedEmployee = await EmployeeModel.findOneAndDelete({ _id: employeeId, userId });

      if (!deletedEmployee) {
          return res.status(404).json({ message: "Employee not found or unauthorized!" });
      }

      res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
      return res.status(500).json({ message: "Error deleting employee", error: error.message });
  }
};



  

  module.exports = {getEmployee,createEmployee,updateEmployee,deleteEmployee};