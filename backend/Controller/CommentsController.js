import Comment from "../model/Comments.js"; // Import the Comment model to interact with the database

// =============================
// Get comments by videoId
// =============================
export const getCommentsByVideoId = async (req, res) => {
  try {
    // Find all comments where the videoId matches the parameter from the URL
    // Sort comments in descending order based on timestamp (newest first)
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({ timestamp: -1 });
    
    // Send the list of comments as a JSON response
    res.json(comments);
  } catch (err) {
    // Handle any server errors
    res.status(500).json({ error: err.message });
  }
};

// =============================
// Add a new comment
// =============================
export const addComment = async (req, res) => {
  try {
    // Destructure data from the request body
    const { videoId, userId, text } = req.body;
    
    // Validate required fields
    if (!videoId || !userId || !text) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new comment document
    const newComment = new Comment({ videoId, userId, text });
    
    // Save the comment to the database
    await newComment.save();

    // Send the saved comment as a response
    res.json(newComment);
  } catch (err) {
    // Handle any errors while saving
    res.status(500).json({ error: err.message });
  }
};

// =============================
// Delete a comment by ID
// =============================
export const deleteComment = async (req, res) => {
  try {
    // Find a comment by its ID (from the URL params) and delete it
    await Comment.findByIdAndDelete(req.params.id);

    // Respond with success if deletion is successful
    res.json({ success: true });
  } catch (err) {
    // Handle errors during deletion
    res.status(500).json({ error: err.message });
  }
};
