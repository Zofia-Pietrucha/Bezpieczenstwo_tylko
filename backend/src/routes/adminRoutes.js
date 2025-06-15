const express = require("express");
const { authenticateToken, requireRole } = require("../middleware/auth");
const router = express.Router();

// Endpoint tylko dla adminów - lista użytkowników
router.get("/users", authenticateToken, requireRole("admin"), (req, res) => {
  const mockUsers = [
    {
      id: "1",
      username: "admin",
      email: "admin@example.com",
      roles: ["admin", "user"],
      status: "active",
      lastLogin: "2025-06-15T10:30:00Z",
    },
    {
      id: "2",
      username: "user",
      email: "user@example.com",
      roles: ["user"],
      status: "active",
      lastLogin: "2025-06-15T09:15:00Z",
    },
    {
      id: "3",
      username: "testuser",
      email: "test@example.com",
      roles: ["user"],
      status: "inactive",
      lastLogin: "2025-06-10T14:20:00Z",
    },
  ];

  res.status(200).json({
    message: "Admin users list",
    data: mockUsers,
    total: mockUsers.length,
    accessLevel: "admin",
  });
});

// Endpoint tylko dla adminów - statystyki systemu
router.get("/stats", authenticateToken, requireRole("admin"), (req, res) => {
  res.status(200).json({
    message: "System statistics",
    data: {
      users: {
        total: 1250,
        active: 890,
        inactive: 360,
        newThisMonth: 45,
      },
      system: {
        uptime: "99.9%",
        serverLoad: "23%",
        memoryUsage: "67%",
        diskUsage: "45%",
      },
      security: {
        failedLogins: 12,
        blockedIPs: 3,
        activeTokens: 156,
      },
    },
    accessLevel: "admin",
    generatedAt: new Date().toISOString(),
  });
});

module.exports = router;
