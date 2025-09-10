import Video from "../model/videoModel.js"; // Import the Video model to interact with MongoDB

// =============================
// Get all videos
// =============================
export const getAllVideos = async (req, res) => {
  try {
    // Fetch all videos from the database
    const videos = await Video.find();
    // Send the list of videos as a JSON response
    res.json(videos);
  } catch (error) {
    // Handle any errors and send an error response
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};

// =============================
// SEARCH videos by title
// =============================
export const searchVideos = async (req, res) => {
  try {
    // Extract the search term from the query parameters
    const { search } = req.query;

    // If no search term is provided, send a 400 error
    if (!search) {
      return res.status(400).json({ message: "Search term is required" });
    }

    // Perform a case-insensitive search on the title field using regex
    const videos = await Video.find({
      title: { $regex: search, $options: "i" },
    });

    // If no videos are found, send a 404 response
    if (videos.length === 0) {
      return res.status(404).json({ message: "No videos found" });
    }

    // Send the matching videos as a JSON response
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error searching videos:", error);
    res.status(500).json({ message: "Error searching videos", error });
  }
};

// =============================
// Get single video by ID
// =============================
export const getVideoById = async (req, res) => {
  try {
    // Find a video by its videoId field
    const video = await Video.findOne({ videoId: req.params.id });
    // If the video is not found, return a 404 error
    if (!video) return res.status(404).json({ message: "Video not found" });
    // Send the found video as JSON
    res.json(video);
  } catch (error) {
    // Handle any errors while fetching the video
    res.status(500).json({ error: "Failed to fetch video" });
  }
};

// =============================
// Get all comments from a video
// =============================
export const getComments = async (req, res) => {
  try {
    // Find a video by its videoId
    const video = await Video.findOne({ videoId: req.params.videoId });
    // If the video does not exist, return 404
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    // Return the comments array from the video
    res.json(video.comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

// =============================
// Add a new comment to a video
// =============================
export const addComment = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Params:", req.params);

    // Destructure userId and text from the request body
    const { userId, text } = req.body;

    // Validate that userId and text are provided
    if (!userId || !text) {
      return res.status(400).json({ message: "userId and text are required" });
    }

    // Find the video by videoId
    const video = await Video.findOne({ videoId: req.params.videoId });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Create a new comment object
    const newComment = {
      userId,
      text,
      createdAt: new Date(),
    };

    // Push the new comment into the video's comments array
    video.comments.push(newComment);
    await video.save(); // Save the updated video document

    console.log("Comment added successfully:", newComment);
    // Return the newly added comment
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment", error });
  }
};

// =============================
// Edit a comment on a video
// =============================
export const editComment = async (req, res) => {
  try {
    // Extract videoId and commentId from URL parameters
    const { videoId, commentId } = req.params;
    const { text } = req.body; // Extract updated text from body

    // Find the video by videoId
    const video = await Video.findOne({ videoId });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Locate the specific comment by its _id
    const comment = video.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Update the comment's text
    comment.text = text;
    await video.save(); // Save the updated video document

    // Send a success response with updated comment
    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    console.error("Error editing comment:", error);
    res.status(500).json({ message: "Error editing comment", error });
  }
};

// =============================
// Delete a comment from a video
// =============================
export const deleteComment = async (req, res) => {
  try {
    // Extract videoId and commentId from URL parameters
    const { videoId, commentId } = req.params;

    // Find the video by videoId
    const video = await Video.findOne({ videoId });
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Find the index of the comment to delete
    const commentIndex = video.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    // If the comment does not exist, return 404
    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the comment from the array
    video.comments.splice(commentIndex, 1);
    await video.save(); // Save the updated video

    // Send a success response
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment", error });
  }
};
