const jwt = require("jsonwebtoken");
const Faculty = require("../models/Faculty");
const Admin = require("../models/Admin");
const Alumni = require("../models/Alumni");
const Student = require("../models/Student");
const PlacementCell = require("../models/PlacementCell");

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

    // Decide collection based on role / userType
    if (decoded.role === "admin" || decoded.userType === "admin") {
      user = await Admin.findById(decoded.id).select("name email role");
      if (user) user.role = "admin";
    } else if (decoded.role === "faculty" || decoded.userType === "faculty") {
      user = await Faculty.findById(decoded.id).select("name email role");
      if (user) user.role = "faculty";
    } else if (decoded.role === "alumni" || decoded.userType === "alumni") {
      user = await Alumni.findById(decoded.id).select("name email role");
      if (user) user.role = "alumni";
    } else if (decoded.role === "placement-cell" || decoded.userType === "placement-cell") {
      user = await PlacementCell.findById(decoded.id).select("name email role");
      if (user) user.role = "placement-cell";
    } else if (decoded.role === "student" || decoded.userType === "student") {
      user = await Student.findById(decoded.id).select("name email role");
      if (user) user.role = "student";
    } else {
      // fallback: try searching all models
      user =
        (await Admin.findById(decoded.id).select("name email role")) ||
        (await Faculty.findById(decoded.id).select("name email role")) ||
        (await Alumni.findById(decoded.id).select("name email role"));
    }

    if (!user) {
      console.log("❌ User not found in any collection");
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Normalize and attach a clean object
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log("✅ User authenticated:", req.user);
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
        userRole: req.user.role,
      });
    }

    console.log(`✅ User ${req.user.name} (${req.user.role}) authorized`);
    next();
  };
};

// Shortcut middleware for admin + faculty
const requireAdminOrFaculty = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (!["admin", "faculty"].includes(req.user.role)) {
    return res.status(403).json({
      error: "Access denied. Only admin and faculty can perform this action.",
      userRole: req.user.role,
    });
  }

  next();
};

module.exports = {
  authMiddleware,
  protect: authMiddleware,
  authorize,
  requireAdminOrFaculty,
};
