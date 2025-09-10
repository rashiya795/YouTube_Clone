import express from "express";
import { createChannel, getChannelById, getChannelByUserId } from "../Controller/ChannelController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//  Create a channel (only for logged-in user)
router.post("/", authMiddleware, createChannel);



// Get logged-in user's channel
router.get("/me", authMiddleware, getChannelByUserId);

// Get channel by channelId
router.get("/:channelId", getChannelById);


export default router;
