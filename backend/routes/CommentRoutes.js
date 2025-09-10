import express from "express";
import { getCommentsByVideoId, addComment, deleteComment } from "../Controller/CommentsController.js";

const router = express.Router();

// GET all comments for a video
router.get("/youtube/:videoId", getCommentsByVideoId);

//  POST a new comment
router.post("/", addComment);

//  DELETE a comment
router.delete("/:id", deleteComment);

export default router;
