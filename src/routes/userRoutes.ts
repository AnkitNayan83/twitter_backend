import express from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getSingleUser,
    updateUser,
} from "../controller/userController";

const router = express.Router();

router.post("/create", createUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);
router.get("/:id", getSingleUser);
router.get("/all", getAllUsers);

export default router;
