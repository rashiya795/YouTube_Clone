import mongoose from "mongoose"; // Import mongoose to define schemas and models

// =============================
// Comment Schema
// =============================
const commentSchema = new mongoose.Schema({
  // ID of the user who posted the comment
  userId: { type: String, required: true },

  // Content of the comment
  text: { type: String, required: true },

  // Timestamp when the comment was created (defaults to current date/time)
  createdAt: { type: Date, default: Date.now }
});

// =============================
// Video Schema
// =============================
const videoSchema = new mongoose.Schema({
  // Unique identifier for the video
  videoId: { type: String, required: true, unique: true },

  // Title of the video (required field)
  title: { type: String, required: true },

  // URL of the video's thumbnail (required field)
  thumbnailUrl: { type: String, required: true },

  // Optional logo or branding for the video
  logo: { type: String },

  // Optional description of the video content
  description: { type: String },

  // ID of the channel to which the video belongs (required field)
  channelId: { type: String, required: true },

  // Name or identifier of the uploader (required field)
  uploader: { type: String, required: true },

  // Number of views (defaults to 0)
  views: { type: Number, default: 0 },

  // Number of likes (defaults to 0)
  likes: { type: Number, default: 0 },

  // Number of dislikes (defaults to 0)
  dislikes: { type: Number, default: 0 },

  // Date when the video was uploaded (required field)
  uploadDate: { type: Date, required: true },

  // Category under which the video is classified (required field)
  category: { type: String, required: true },

  // Array of comments associated with the video, using the commentSchema
  comments: [commentSchema]
});

// Export the Video model so it can be used across the application (e.g., controllers, routes)
export default mongoose.model("Video", videoSchema);
