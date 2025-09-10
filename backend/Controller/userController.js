import user from "../model/userModel.js"; // Import the user model to interact with MongoDB
import bcrypt from 'bcrypt'; // For hashing and verifying passwords securely
import jwt from 'jsonwebtoken'; // For generating JSON Web Tokens (JWT)

// =============================
// Register Controller
// =============================
export const registerUser = async (req, res) => {
  try {
    // Extract required fields from the request body
    const { username, email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password before storing it for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document in the database
    const newUser = await user.create({ username, email, password: hashedPassword });

    // Generate a JWT token for the newly registered user
    const token = jwt.sign(
      { userId: newUser._id },         // Payload with the user's ID
      process.env.JWT_SECRET,          // Secret key from environment variables
      { expiresIn: '1d' }              // Token expires in 1 day
    );

    // Send a success response with token and user info
    res.status(201).json({ message: 'User registered successfully', token, user: newUser });

  } catch (err) {
    // Handle any server-side errors
    res.status(500).json({ error: err.message });
  }
};

// =============================
// Login Controller
// =============================
export const loginUser = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Validate that both fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find the user by email
    const existingUser = await user.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: 'User not found' });

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Wrong password' });

    // Generate a JWT token for the logged-in user
    const token = jwt.sign(
      { userId: existingUser._id },    // Payload with the user's ID
      process.env.JWT_SECRET,          // Secret key
      { expiresIn: '1d' }              // Token valid for 1 day
    );

    // Send a success response with the token
    res.status(200).json({ message: 'Login successful', token });

  } catch (err) {
    // Handle server errors gracefully
    res.status(500).json({ error: err.message });
  }
};
