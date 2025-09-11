// routes/auth.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // default import

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  if (!req.user) return res.status(404).json({ message: "User not found" });

  res.json({
    role: req.user.role,
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      token: req.token,
    },
  });
});

export default router;
