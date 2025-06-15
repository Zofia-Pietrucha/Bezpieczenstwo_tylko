import React, { useState, useEffect } from "react";
import axios from "axios";

interface ApiStatus {
  status: string;
  timestamp: string;
  endpoints: {
    public: string[];
    protected: string[];
    admin: string[];
  };
}

const About: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/health");
        setApiStatus(response.data);
      } catch (err) {
        setError("Failed to connect to backend API");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApiStatus();
  }, []);

  return (
    <div>
      <h1>📋 About This Project</h1>

      <div style={{ marginBottom: "2rem" }}>
        <h2>🏗️ Architecture</h2>
        <div
          style={{
            backgroundColor: "#ecf0f1",
            padding: "1.5rem",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            <div>
              <h3>Frontend</h3>
              <ul>
                <li>React 18 with TypeScript</li>
                <li>React Router for navigation</li>
                <li>Keycloak integration</li>
                <li>Responsive design</li>
              </ul>
            </div>
            <div>
              <h3>Backend</h3>
              <ul>
                <li>Node.js + Express</li>
                <li>JWT authentication</li>
                <li>Role-based authorization</li>
                <li>RESTful API design</li>
              </ul>
            </div>
            <div>
              <h3>Identity Provider</h3>
              <ul>
                <li>Keycloak server</li>
                <li>OpenID Connect</li>
                <li>User management</li>
                <li>Role assignment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h2>🔌 API Status</h2>
        <div
          style={{
            backgroundColor: loading
              ? "#f39c12"
              : error
              ? "#e74c3c"
              : "#27ae60",
            color: "white",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          {loading && <p>🔄 Checking API connection...</p>}
          {error && <p>❌ {error}</p>}
          {apiStatus && (
            <div>
              <p>✅ Backend API is running</p>
              <p>
                <strong>Status:</strong> {apiStatus.status}
              </p>
              <p>
                <strong>Last Check:</strong>{" "}
                {new Date(apiStatus.timestamp).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2>🔗 Available Endpoints</h2>
        {apiStatus && (
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
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <h3>🌐 Public Endpoints</h3>
              <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                {apiStatus.endpoints.public.map((endpoint, index) => (
                  <li key={index}>{endpoint}</li>
                ))}
              </ul>
            </div>
            <div
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <h3>🔒 Protected Endpoints</h3>
              <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                {apiStatus.endpoints.protected.map((endpoint, index) => (
                  <li key={index}>{endpoint}</li>
                ))}
              </ul>
            </div>
            <div
              style={{
                backgroundColor: "#f39c12",
                color: "white",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <h3>👑 Admin Endpoints</h3>
              <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                {apiStatus.endpoints.admin.map((endpoint, index) => (
                  <li key={index}>{endpoint}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
