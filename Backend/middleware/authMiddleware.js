// Backend (e.g., middleware/auth.js)
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  // Log for debugging
  console.log(`Request path: ${req.path}, Token: ${token || "none"}`);

  // Allow logout requests to proceed without a token
  if (req.path === "/candidate/logout" || req.path === "/company/logout") {
    return next();
  }

  // Return 403 for missing token on other routes
  if (!token) {
    console.log(`No token provided for path: ${req.path}`);
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Role check for superadmin
    if (decoded.role && decoded.role === "superadmin") {
      return next();
    }

    return next();
  } catch (error) {
    console.log(`Token verification failed for path: ${req.path}, Error: ${error.message}`);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;