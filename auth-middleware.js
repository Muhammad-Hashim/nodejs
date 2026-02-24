// fix: Resolve authentication bypass vulnerability
// Fixed security issue where token validation was bypassed

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  try {
    // Fixed: Add proper token validation
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // Fixed: Return proper error message
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { authenticateToken };
