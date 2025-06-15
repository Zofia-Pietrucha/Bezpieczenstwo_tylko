const jwt = require("jsonwebtoken");
const axios = require("axios");

// Prosty cache dla kluczy publicznych
let publicKeys = null;
let lastFetch = 0;
const CACHE_DURATION = 3600000; // 1 godzina

const getPublicKeys = async () => {
  const now = Date.now();

  if (publicKeys && now - lastFetch < CACHE_DURATION) {
    return publicKeys;
  }

  try {
    const response = await axios.get(
      `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/certs`
    );
    publicKeys = response.data.keys;
    lastFetch = now;
    return publicKeys;
  } catch (error) {
    console.error("Failed to fetch public keys:", error.message);
    throw error;
  }
};

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      error: "Access denied",
      message: "No token provided",
    });
  }

  try {
    // Dla uproszczenia - sprawdzimy tylko czy token nie jest pusty
    // W następnym commicie dodamy pełną weryfikację
    const decoded = jwt.decode(token);

    if (!decoded) {
      return res.status(401).json({
        error: "Invalid token",
        message: "Token malformed",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({
      error: "Invalid token",
      message: "Token verification failed",
    });
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User not authenticated",
      });
    }

    const userRoles = req.user.realm_access?.roles || [];

    if (!userRoles.includes(role)) {
      return res.status(403).json({
        error: "Forbidden",
        message: `Role '${role}' required`,
      });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  requireRole,
};
