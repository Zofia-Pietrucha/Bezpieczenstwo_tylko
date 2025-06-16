import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useKeycloak } from "../contexts/KeycloakContext.tsx";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { authenticated, loading, login, logout, userInfo, hasRole } =
    useKeycloak();

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

            {authenticated ? (
              <>
                <Link
                  to="/dashboard"
                  style={{
                    color:
                      location.pathname === "/dashboard" ? "#3498db" : "white",
                    textDecoration: "none",
                    fontWeight:
                      location.pathname === "/dashboard" ? "bold" : "normal",
                  }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/products"
                  style={{
                    color:
                      location.pathname === "/products" ? "#3498db" : "white",
                    textDecoration: "none",
                    fontWeight:
                      location.pathname === "/products" ? "bold" : "normal",
                  }}
                >
                  Products
                </Link>
                {hasRole("admin") && (
                  <Link
                    to="/admin"
                    style={{
                      color:
                        location.pathname === "/admin" ? "#3498db" : "white",
                      textDecoration: "none",
                      fontWeight:
                        location.pathname === "/admin" ? "bold" : "normal",
                    }}
                  >
                    Admin
                  </Link>
                )}
                <span style={{ color: "#bdc3c7", fontSize: "0.9rem" }}>
                  👤 {userInfo?.username}
                </span>
                <button
                  onClick={logout}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {!loading && (
                  <button
                    onClick={login}
                    style={{
                      backgroundColor: "#27ae60",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Login
                  </button>
                )}
              </>
            )}
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
