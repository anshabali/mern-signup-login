import mongoose from "mongoose";

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
  userId: {
    type: String,
    required: true,
  },
});

const EmployeeModel = mongoose.model("Employee", employeeSchema);
export default EmployeeModel;