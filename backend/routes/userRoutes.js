import express from 'express'; // Import Express to create the router
import { registerUser, loginUser } from '../Controller/userController.js'; 
// Import controller functions to handle user registration and login

const router = express.Router(); // Create a new router instance

// =============================
// User Routes
// =============================

// Route for user registration
// POST /register → Calls the registerUser controller to create a new user
router.post('/register', registerUser);

// Route for user login
// POST /login → Calls the loginUser controller to authenticate the user and return a token
router.post('/login', loginUser);

export default router; // Export the router to be used in the main server file
