const jwt = require("jsonwebtoken");

//Protected Routes based on token
module.exports = {
  requireSignIn: async (req, res, next) => {
    try {
      const token = req.headers.authorization;

      // Check if the token exists
      if (!token) {
        return res.status(401).json({ message: "Missing authorization token" });
      }

      try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
      } catch (error) {
        // If the token is invalid or expired
        return res.status(401).json({ message: "Invalid authorization token" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
