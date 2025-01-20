import jwt from "jsonwebtoken"; // Assuming you're using JWT for authentication

// Middleware to check if the user has the required usertype
const checkUserType = (requiredUserType) => {
  return (req, res, next) => {
    // Assuming the user information is stored in the JWT token and the token is sent in the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      // Verify the token and get the user info
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
      req.user = decoded; // Assuming the token contains user info

      // Check if the usertype matches the required usertype
      if (requiredUserType && !requiredUserType.includes(req.user.usertype)) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Continue to the next middleware or route handler
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

export default checkUserType;
