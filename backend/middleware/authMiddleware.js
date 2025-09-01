import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Check for token in Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(401).json({ message: "Token invalid or expired" });
  }
};
