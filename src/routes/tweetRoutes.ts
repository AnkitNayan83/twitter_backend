import express from "express";
import {
    createTweet,
    deleteTweet,
    getAllTweet,
    getSingleTweet,
    updateTweet,
} from "../controller/tweetController";

const router = express.Router();

router.post("/create", createTweet);
router.put("/update", updateTweet);
router.delete("/deleteUser", deleteTweet);
router.get("/", getAllTweet);
router.get("/:id", getSingleTweet);

export default router;
