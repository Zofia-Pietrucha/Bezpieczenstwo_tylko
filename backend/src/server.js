const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const { verifyKeycloakConnection } = require("./services/keycloak");
const { authenticateToken, requireRole } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Public routes
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend server is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/public/info", (req, res) => {
  res.status(200).json({
    message: "This is a public endpoint",
    data: "Anyone can access this",
  });
});

// Protected routes (will be expanded in next commits)
app.get("/api/protected/test", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "This is a protected endpoint",
    user: {
      sub: req.user.sub,
      email: req.user.email,
      roles: req.user.realm_access?.roles || [],
    },
  });
});

// Admin only route
app.get(
  "/api/admin/test",
  authenticateToken,
  requireRole("admin"),
  (req, res) => {
    res.status(200).json({
      message: "This is an admin-only endpoint",
      user: {
        sub: req.user.sub,
        email: req.user.email,
        roles: req.user.realm_access?.roles || [],
      },
    });
  }
);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong!",
  });
});

// Start server with Keycloak verification
const startServer = async () => {
  // Verify Keycloak connection
  await verifyKeycloakConnection();

  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on port ${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 Public API: http://localhost:${PORT}/api/public/info`);
    console.log(
      `🔒 Protected API: http://localhost:${PORT}/api/protected/test`
    );
    console.log(`👑 Admin API: http://localhost:${PORT}/api/admin/test`);
  });
};

startServer().catch(console.error);
