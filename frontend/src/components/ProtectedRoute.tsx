import React from "react";
import { useKeycloak } from "../contexts/KeycloakContext.tsx";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles = [],
  fallback,
}) => {
  const { authenticated, loading, hasRole, login } = useKeycloak();

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>🔄 Loading...</h2>
        <p>Checking authentication status...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      fallback || (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: "8px",
            margin: "2rem auto",
            maxWidth: "600px",
          }}
        >
          <h2>🔒 Authentication Required</h2>
          <p>You need to be logged in to access this page.</p>
          <button
            onClick={login}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            🚀 Login with Keycloak
          </button>
        </div>
      )
    );
  }

  if (roles.length > 0) {
    const hasRequiredRole = roles.some((role) => hasRole(role));
    if (!hasRequiredRole) {
      return (
        fallback || (
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              backgroundColor: "#f8d7da",
              border: "1px solid #f1aeb5",
              borderRadius: "8px",
              margin: "2rem auto",
              maxWidth: "600px",
            }}
          >
            <h2>⛔ Access Denied</h2>
            <p>You don't have the required permissions to access this page.</p>
            <p>
              <strong>Required roles:</strong> {roles.join(", ")}
            </p>
          </div>
        )
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
