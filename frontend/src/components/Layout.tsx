import React from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh" }}>
      {/* Navigation */}
      <nav
        style={{
          backgroundColor: "#2c3e50",
          color: "white",
          padding: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>🔐 Security Project</h1>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link
              to="/"
              style={{
                color: location.pathname === "/" ? "#3498db" : "white",
                textDecoration: "none",
                fontWeight: location.pathname === "/" ? "bold" : "normal",
              }}
            >
              Home
            </Link>
            <Link
              to="/about"
              style={{
                color: location.pathname === "/about" ? "#3498db" : "white",
                textDecoration: "none",
                fontWeight: location.pathname === "/about" ? "bold" : "normal",
              }}
            >
              About
            </Link>
            <Link
              to="/login"
              style={{
                color: location.pathname === "/login" ? "#3498db" : "white",
                textDecoration: "none",
                fontWeight: location.pathname === "/login" ? "bold" : "normal",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#34495e",
          color: "white",
          textAlign: "center",
          padding: "1rem",
          marginTop: "3rem",
        }}
      >
        <p style={{ margin: 0 }}>
          Security Project - Built with React, Node.js & Keycloak
        </p>
      </footer>
    </div>
  );
};

export default Layout;
