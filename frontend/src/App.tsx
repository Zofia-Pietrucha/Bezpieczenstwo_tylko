import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { KeycloakProvider } from "./contexts/KeycloakContext.tsx";
import Layout from "./components/Layout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Admin from "./pages/Admin.tsx";
import Products from "./pages/Products.tsx";

const App: React.FC = () => {
  return (
    <KeycloakProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={["user"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute roles={["user"]}>
                  <Products />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Admin />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <h1>404 - Page Not Found</h1>
                  <p>The requested page does not exist.</p>
                </div>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </KeycloakProvider>
  );
};

export default App;
