import React from "react";

const Login: React.FC = () => {
  const handleLogin = () => {
    alert("Keycloak integration will be implemented in the next commit!");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h1 style={{ textAlign: "center" }}>🔐 Login</h1>

      <div
        style={{
          backgroundColor: "#ecf0f1",
          padding: "2rem",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h2>Authentication</h2>
        <p>This application uses Keycloak for secure authentication.</p>

        <div style={{ margin: "2rem 0" }}>
          <p>
            <strong>Test Users:</strong>
          </p>
          <div
            style={{
              textAlign: "left",
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "4px",
            }}
          >
            <p>
              <strong>Admin:</strong>
            </p>
            <p>Username: admin</p>
            <p>Password: admin123</p>
            <br />
            <p>
              <strong>User:</strong>
            </p>
            <p>Username: user</p>
            <p>Password: user123</p>
          </div>
        </div>

        <button
          onClick={handleLogin}
          style={{
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            padding: "1rem 2rem",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
            width: "100%",
          }}
        >
          🚀 Login with Keycloak
        </button>

        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#7f8c8d" }}>
          Keycloak integration coming in Commit 10!
        </p>
      </div>
    </div>
  );
};

export default Login;
