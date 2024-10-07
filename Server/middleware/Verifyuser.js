
const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.headers["authorization"]?.split(' ')[1];
  // Extract token from 'Bearer <token>'
  
  if (!token) {
    return res.status(401).json({ message: "Token is missing!" });
  }

  try {
    // Correct use of jwt.verify, using your secret token
    const decoded = jwt.verify(token, process.env.myToken);
    
    // Attach the user ID to the request object
    req.userId = decoded.id; 
    
    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!", error: error.message });
  }
};

module.exports = verifyUser;
