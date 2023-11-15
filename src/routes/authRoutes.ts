import express from "express";
import { tokenVerification, userLogin } from "../controller/authController";

const router = express.Router();

router.post("/login", userLogin);
router.post("/authenticate", tokenVerification);

export default router;
