const express = require("express");
const { authenticateToken, requireRole } = require("../middleware/auth");
const router = express.Router();

// Produkty dostępne dla wszystkich zalogowanych użytkowników
router.get("/", authenticateToken, (req, res) => {
  const user = req.user;
  const userRoles = user.realm_access?.roles || [];
  const isAdmin = userRoles.includes("admin");

  const products = [
    {
      id: 1,
      name: "Laptop Pro",
      price: isAdmin ? 1299.99 : 1499.99, // Admin widzi cenę hurtową
      category: "Electronics",
      inStock: 25,
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: isAdmin ? 29.99 : 39.99,
      category: "Electronics",
      inStock: 150,
    },
    {
      id: 3,
      name: "Office Chair",
      price: isAdmin ? 199.99 : 249.99,
      category: "Furniture",
      inStock: 8,
    },
  ];

  // Admin widzi dodatkowe informacje
  if (isAdmin) {
    products.forEach((product) => {
      product.cost = product.price * 0.7; // koszt zakupu
      product.margin = (product.price - product.cost).toFixed(2);
    });
  }

  res.status(200).json({
    message: "Products list",
    data: products,
    userRole: isAdmin ? "admin" : "user",
    showPricing: isAdmin ? "wholesale" : "retail",
  });
});

// Zarządzanie produktami - tylko admin
router.post("/", authenticateToken, requireRole("admin"), (req, res) => {
  const { name, price, category, inStock } = req.body;

  const newProduct = {
    id: Math.floor(Math.random() * 1000),
    name: name || "New Product",
    price: price || 0,
    category: category || "General",
    inStock: inStock || 0,
    createdBy: req.user.preferred_username,
    createdAt: new Date().toISOString(),
  };

  res.status(201).json({
    message: "Product created successfully",
    data: newProduct,
    accessLevel: "admin",
  });
});

// Statystyki produktów - tylko admin
router.get("/stats", authenticateToken, requireRole("admin"), (req, res) => {
  res.status(200).json({
    message: "Product statistics",
    data: {
      totalProducts: 156,
      categories: {
        Electronics: 89,
        Furniture: 34,
        Clothing: 23,
        Books: 10,
      },
      inventory: {
        totalValue: 125000,
        lowStock: 12,
        outOfStock: 3,
      },
      sales: {
        thisMonth: 45600,
        lastMonth: 38900,
        growth: "+17.2%",
      },
    },
    accessLevel: "admin",
    generatedAt: new Date().toISOString(),
  });
});

module.exports = router;
