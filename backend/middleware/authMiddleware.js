const jwt = require("jsonwebtoken");
const Faculty = require("../models/Faculty");
const Admin = require("../models/Admin");
const Alumni = require("../models/Alumni");

const authMiddleware = async (req, res, next) => {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔍 Token decoded:", { id: decoded.id, role: decoded.role, userType: decoded.userType });

    let user = null;

    // Check different user models based on role or userType
    if (decoded.role === 'admin' || decoded.userType === 'admin') {
      user = await Admin.findById(decoded.id).select("name email role");
      if (user) user.role = 'admin'; // Ensure role is set
    } 
    else if (decoded.role === 'faculty' || decoded.userType === 'faculty') {
      user = await Faculty.findById(decoded.id).select("name email role");
      if (user) user.role = 'faculty'; // Ensure role is set
    }
    else if (decoded.role === 'alumni' || decoded.userType === 'alumni') {
      user = await Alumni.findById(decoded.id).select("name email role");
      if (user) user.role = 'alumni'; // Ensure role is set
    }
    else {
      // If no specific role, try all models
      user = await Admin.findById(decoded.id).select("name email role") ||
             await Faculty.findById(decoded.id).select("name email role") ||
             await Alumni.findById(decoded.id).select("name email role");
    }

    if (!user) {
      console.log("❌ User not found in any collection");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("✅ User authenticated:", { name: user.name, role: user.role });
    req.user = user; // attach full user to req
    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    return res.status(403).json({ error: "Invalid token" });
  }
};

/**
 * Role-based protection
 * @param {Array<string>} roles - Allowed roles ['admin', 'faculty', 'alumni']
 */
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Access denied. Your role '${req.user.role}' is not allowed.`,
        allowedRoles: roles,
        userRole: req.user.role
      });
    }

    console.log(`✅ User ${req.user.name} (${req.user.role}) authorized`);
    next();
  };
};

// Specific middleware for admin and faculty only (for verification tasks)
const requireAdminOrFaculty = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (!['admin', 'faculty'].includes(req.user.role)) {
    return res.status(403).json({ 
      error: `Access denied. Only admin and faculty can perform this action.`,
      userRole: req.user.role
    });
  }

  next();
};

module.exports = {
  authMiddleware,
  protect: authMiddleware,
  authorize,
  requireAdminOrFaculty
};