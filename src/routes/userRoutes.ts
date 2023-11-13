import express from "express";
import { getAllUser } from "../controller/userController";

const router = express.Router();

// router.put("/update",updateUser);
// router.delete("/deleteUser",deleteUser);
// router.get("/:id",getSingleUser);
router.get("/all", getAllUser);

export default router;
