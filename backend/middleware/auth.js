import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access denied. No token provided" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only" });
  }
  next();
};
