const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();


// Load environment variables
dotenv.config();

// Helper function to generate a new token
const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized to access this router" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
          ignoreExpiration: true,
        });

        const newToken = generateToken(decoded);
        res.setHeader("Authorization", `Bearer ${newToken}`);

        req.user = decoded;
        next();
      } catch (err) {
        return res.status(401).json({ message: "Not authorized to access this router" });
      }
    } else {
      return res.status(401).json({ message: "Not authorized to access this router" });
    }}}