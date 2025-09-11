import express from 'express';           // Import Express framework for creating the server
import mongoose from 'mongoose';         // Import Mongoose for MongoDB connection and modeling
import userRoutes from './routes/userRoutes.js';    // Import user-related routes
import videoRoutes from './routes/videoRoutes.js';  // Import video-related routes
import ChannelRoutes from './routes/ChannelRoutes.js'; // Import channel-related routes
import dotenv from 'dotenv';             // Import dotenv to manage environment variables
import cors from 'cors';                 // Import CORS to allow cross-origin requests

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application
const port = process.env.PORT || 5000; // Use the port from .env or default to 5000

// ===============================
// Middleware
// ===============================

// Parse incoming JSON requests
app.use(express.json());

// Enable CORS for your frontend (e.g., React app running on localhost:5173)
app.use(cors({
  origin: "http://localhost:5173", // Only allow requests from this origin
  credentials: true                // Allow credentials (e.g., cookies, authorization headers)
}));

// ===============================
// MongoDB Connection
// ===============================
console.log('MONGO_URI value:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,    // Use new URL parser (avoids deprecation warning)
  useUnifiedTopology: true  // Use new server discovery and monitoring engine
})
.then(() => console.log("Database is successfully connected")) // Log success message
.catch(err => console.log(err)); // Log any connection errors

// ===============================
// Routes
// ===============================

// User routes (e.g., /api/users/register, /api/users/login)
app.use('/api/users', userRoutes);

// Video routes (e.g., /api/videos, /api/videos/:id)
app.use('/api/videos', videoRoutes);

// Channel routes (e.g., /api/channels)
app.use('/api/channels', ChannelRoutes);

// ===============================
// Start Server
// ===============================
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log server running message
});
