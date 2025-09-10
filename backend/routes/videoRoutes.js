import express from "express";
import { getAllVideos, getVideoById ,getComments,addComment,editComment,deleteComment,searchVideos,} from "../Controller/videoController.js";

const router = express.Router();

// GET all videos
router.get("/", getAllVideos);


//get searched videos 
router.get("/search", searchVideos);

// GET single video by ID
router.get("/:id", getVideoById);

//get comments
router.get("/:videoId/comments", getComments);


// Add a comment
router.post("/:videoId/comments", addComment);

// Edit a comment
router.put("/:videoId/comments/:commentId", editComment);

// Delete a comment
router.delete("/:videoId/comments/:commentId", deleteComment);


export default router;
