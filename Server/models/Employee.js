const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  userId: { // Link employee to the user
    type: String,
    required: true,
  },
});

const EmployeeModel = mongoose.model("Employee", employeeSchema);
module.exports = EmployeeModel;
