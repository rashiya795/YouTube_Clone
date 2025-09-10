import jwt from "jsonwebtoken"; // Import jsonwebtoken to verify and decode JWT tokens

// =============================
// Authentication Middleware
// =============================
const authMiddleware = (req, res, next) => {
  // Extract token from the Authorization header (format: "Bearer <token>")
  const token = req.headers.authorization?.split(" ")[1];
  
  // If no token is found, deny access
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token using the secret key stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user ID to the request object for use in controllers
    req.user = { userId: decoded.userId };

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If verification fails, send an unauthorized error
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware; // Export the middleware for use in routes
