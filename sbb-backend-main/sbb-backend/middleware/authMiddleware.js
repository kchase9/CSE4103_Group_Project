// const jwt = require('jsonwebtoken');

// // In-memory token blacklist (consider using Redis for production)
// const tokenBlacklist = new Set();

// const authMiddleware = {
//   // Verify JWT token
//   authenticateToken(req, res, next) {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

//     if (!token) {
//       return res.status(401).json({ error: 'Authentication token required' });
//     }

//     // Check if token is blacklisted
//     if (tokenBlacklist.has(token)) {
//       return res.status(401).json({ error: 'Token has been invalidated' });
//     }

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;
//       next();
//     } catch (err) {
//       return res.status(403).json({ error: 'Invalid or expired token' });
//     }
//   },

//   // Check if user is admin
//   isAdmin(req, res, next) {
//     if (req.user && req.user.role === 'admin') {
//       next();
//     } else {
//       res.status(403).json({ error: 'Admin access required' });
//     }
//   },

//   // Add token to blacklist on sign out
//   signOut(req, res) {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(' ')[1];
    
//     if (token) {
//       tokenBlacklist.add(token);
      
//       // Optional: Remove old tokens from blacklist after they expire
//       setTimeout(() => {
//         tokenBlacklist.delete(token);
//       }, process.env.JWT_EXPIRY || 24 * 60 * 60 * 1000); // Default 24 hours
//     }

//     res.json({ message: 'Successfully signed out' });
//   }
// };

// module.exports = authMiddleware;

const jwt = require('jsonwebtoken');

// In-memory token blacklist (consider using Redis for production)
const tokenBlacklist = new Set();

const authMiddleware = {
  authenticateToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ error: 'Authentication token required' });
      }

      if (tokenBlacklist.has(token)) {
        return res.status(401).json({ error: 'Token has been invalidated' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
  },

  isAdmin(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  },

  // Add owner check middleware
  isResourceOwner(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (req.params.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    next();
  },

  signOut(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token) {
      tokenBlacklist.add(token);
      
      setTimeout(() => {
        tokenBlacklist.delete(token);
      }, parseInt(process.env.JWT_EXPIRY) || 24 * 60 * 60 * 1000);
    }
    
    res.json({ message: 'Successfully signed out' });
  }
};

module.exports = authMiddleware;