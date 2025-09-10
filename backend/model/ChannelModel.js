import mongoose from "mongoose"; // Import mongoose to create and manage the schema
import { v4 as uuidv4 } from "uuid"; // Import uuid to generate unique IDs for channels

// =============================
// Channel Schema Definition
// =============================
const channelSchema = new mongoose.Schema(
  {
    // Channel name (required and trimmed to remove extra spaces)
    channelName: {
      type: String,
      required: true,
      trim: true,
    },
    // Channel description (optional, trimmed)
    description: {
      type: String,
      trim: true,
    },
    // URL or path of the channel's icon (optional)
    channelIcon: {
      type: String,
    },
    // Reference to the User who owns the channel
    owner: {
      type: mongoose.Schema.Types.ObjectId, // Link to a User document
      ref: "User", // References the User model
      required: true, // Every channel must have an owner
      unique: true, // Ensure a user can only own one channel
    },
    // Unique channel ID generated automatically
    channelId: {
      type: String,
      default: uuidv4, // Automatically generate a unique UUID for the channel
      unique: true, // Ensure each channelId is unique in the database
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Export the Channel model to be used in other parts of the app
export default mongoose.model("Channel", channelSchema);
