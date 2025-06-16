const express = require("express");
const { authenticateToken, requireRole } = require("../middleware/auth");
const router = express.Router();

// Endpoint dla wszystkich zalogowanych użytkowników
router.get("/profile", authenticateToken, (req, res) => {
  const user = req.user;
  const userRoles = user.realm_access?.roles || [];

  res.status(200).json({
    message: "User profile data",
    user: {
      id: user.sub,
      username: user.preferred_username,
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
      roles: userRoles,
    },
    accessLevel: "user",
  });
});

// Endpoint dostępny dla user i admin
router.get("/dashboard", authenticateToken, requireRole("user"), (req, res) => {
  const user = req.user;
  const userRoles = user.realm_access?.roles || [];
  const isAdmin = userRoles.includes("admin");

  const dashboardData = {
    message: "Welcome to your dashboard",
    user: {
      username: user.preferred_username,
      email: user.email,
      roles: userRoles,
    },
    data: {
      personalStats: {
        loginCount: Math.floor(Math.random() * 100),
        lastLogin: new Date().toISOString(),
        accountStatus: "active",
      },
    },
  };

  // Admin dodatkowo
  if (isAdmin) {
    dashboardData.data.adminStats = {
      totalUsers: 1250,
      activeUsers: 890,
      systemHealth: "good",
    };
  }

  res.status(200).json(dashboardData);
});

module.exports = router;
