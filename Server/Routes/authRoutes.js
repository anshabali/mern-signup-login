import express from "express";

import { registerValidate, loginValidate } from "../Controlls/Authcontrolls";

const router = express.Router();

router.post("/login", loginValidate);
router.post("/register", registerValidate);

export default router;
