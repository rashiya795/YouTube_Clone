import mongoose from 'mongoose'; // Import mongoose to create schema and model

// =============================
// User Schema Definition
// =============================
const userSchema = new mongoose.Schema({
  // Username of the user (must be unique and is required)
  username: {
    type: String,
    required: true,
    unique: true
  },
  // Email address of the user (must be unique and is required)
  email: {
    type: String,
    required: true,
    unique: true
  },
  // Hashed password for authentication (required)
  password: {
    type: String,
    required: true
  }
}, { 
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema); // Model name "User" uses a capital "U"

// Export the User model to be used in other parts of the application (e.g., routes, controllers)
export default User;
