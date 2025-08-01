import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (decoded.role === 'superadmin') return next();

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
