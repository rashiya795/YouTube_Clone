import mongoose from "mongoose"; // Import mongoose to define and work with the schema

// =============================
// Comment Schema Definition
// =============================
const commentSchema = new mongoose.Schema({
  // ID of the video the comment belongs to (required)
  videoId: { 
    type: String, 
    required: true 
  },
  // ID of the user who posted the comment (required)
  userId: { 
    type: String, 
    required: true 
  },
  // The actual comment text (required)
  text: { 
    type: String, 
    required: true 
  },
  // Timestamp of when the comment was created (defaults to current date/time)
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

// Create the Comment model from the schema
const Comment = mongoose.model("Comment", commentSchema);

// Export the Comment model to use in other files (e.g., controllers, routes)
export default Comment;
