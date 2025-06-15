import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <h1>🏠 Welcome to Security Project</h1>
      <div
        style={{
          backgroundColor: "#ecf0f1",
          padding: "2rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h2>Project Overview</h2>
        <p>This is a secure web application demonstrating:</p>
        <ul>
          <li>🔐 JWT Authentication with Keycloak</li>
          <li>👥 Role-based Access Control (RBAC)</li>
          <li>🎛️ Admin Panel for privileged users</li>
          <li>🔒 Protected API endpoints</li>
          <li>🐳 Dockerized deployment</li>
        </ul>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h3>🔓 Public Access</h3>
          <p>Anyone can view this page and access public endpoints.</p>
        </div>

        <div
          style={{
            backgroundColor: "#e74c3c",
            color: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h3>🔒 Protected Area</h3>
          <p>Login required to access user dashboard and profile.</p>
        </div>

        <div
          style={{
            backgroundColor: "#f39c12",
            color: "white",
            padding: "1.5rem",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h3>👑 Admin Panel</h3>
          <p>Admin role required for user management and system stats.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
