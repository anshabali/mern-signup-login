import express from "express";

import { getEmployee, createEmployee, updateEmployee, deleteEmployee } from "../Controlls/EmployeeController.js";

const router = express.Router();

router.get("/employee/", getEmployee);
router.post("/employee/", createEmployee);
router.put("/employee/:id", updateEmployee);
router.delete("/employee/:id", deleteEmployee);

export default router;