const jwt = require('jsonwebtoken');
const constant = require('../constant');

// Middleware function to verify JWT token and check user role
module.exports = (requiredRoles) => (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: constant.MESSAGE.ACCESS_DENIED });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace with your actual secret key

    // Check if the user has one of the required roles
    if (!requiredRoles.includes(decodedToken.role)) {
      return res.status(403).json({ error: constant.MESSAGE.ACCESS_DENIED });
    }

    // Attach the user object to the request for future use
    req.user = decodedToken;

    // Continue to the next middleware or route
    next();
  } catch (error) {
    return res.status(401).json({ error: constant.MESSAGE.TIMEOUT });
 
  }
}