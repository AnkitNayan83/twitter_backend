import express from "express";
import {
    createTweet,
    deleteTweet,
    getAllTweet,
    getSingleTweet,
    updateTweet,
} from "../controller/tweetController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authenticateToken, createTweet);
router.put("/:id", authenticateToken, updateTweet);
router.delete("/:id", authenticateToken, deleteTweet);
router.get("/", getAllTweet);
router.get("/:id", getSingleTweet);

export default router;
