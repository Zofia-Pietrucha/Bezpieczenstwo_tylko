import React, { useState, useEffect } from "react";
import { useKeycloak } from "../contexts/KeycloakContext.tsx";
import api from "../services/api.ts";

interface DashboardData {
  message: string;
  user: {
    username: string;
    email: string;
    roles: string[];
  };
  data: {
    personalStats: {
      loginCount: number;
      lastLogin: string;
      accountStatus: string;
    };
    adminStats?: {
      totalUsers: number;
      activeUsers: number;
      systemHealth: string;
    };
  };
}

const Dashboard: React.FC = () => {
  const { userInfo, hasRole } = useKeycloak();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/api/user/dashboard");
        setDashboardData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load dashboard");
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>🔄 Loading Dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#f8d7da",
          borderRadius: "8px",
        }}
      >
        <h2>❌ Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>📊 Dashboard</h1>

      {/* Welcome Section */}
      <div
        style={{
          backgroundColor: "#d4edda",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h2>👋 Welcome back, {userInfo?.firstName || userInfo?.username}!</h2>
        <p>
          Your account status:{" "}
          <strong>{dashboardData?.data.personalStats.accountStatus}</strong>
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {/* Personal Stats */}
        <div
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "1.5rem",
            borderRadius: "8px",
          }}
        >
          <h3>👤 Personal Stats</h3>
          <p>
            <strong>Login Count:</strong>{" "}
            {dashboardData?.data.personalStats.loginCount}
          </p>
          <p>
            <strong>Last Login:</strong>{" "}
            {new Date(
              dashboardData?.data.personalStats.lastLogin || ""
            ).toLocaleString()}
          </p>
          <p>
            <strong>Roles:</strong> {userInfo?.roles.join(", ")}
          </p>
        </div>

        {/* Admin Stats (tylko dla adminów) */}
        {hasRole("admin") && dashboardData?.data.adminStats && (
          <div
            style={{
              backgroundColor: "#f39c12",
              color: "white",
              padding: "1.5rem",
              borderRadius: "8px",
            }}
          >
            <h3>👑 Admin Stats</h3>
            <p>
              <strong>Total Users:</strong>{" "}
              {dashboardData.data.adminStats.totalUsers}
            </p>
            <p>
              <strong>Active Users:</strong>{" "}
              {dashboardData.data.adminStats.activeUsers}
            </p>
            <p>
              <strong>System Health:</strong>{" "}
              {dashboardData.data.adminStats.systemHealth}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div
          style={{
            backgroundColor: "#27ae60",
            color: "white",
            padding: "1.5rem",
            borderRadius: "8px",
          }}
        >
          <h3>⚡ Quick Actions</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <button
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                border: "none",
                padding: "0.5rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              📝 Update Profile
            </button>
            <button
              style={{
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                border: "none",
                padding: "0.5rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              🔒 Change Password
            </button>
            {hasRole("admin") && (
              <button
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "none",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                👑 Admin Panel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Raw Data (dla developmentu) */}
      <details style={{ marginTop: "2rem" }}>
        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
          🔍 Debug Info
        </summary>
        <pre
          style={{
            backgroundColor: "#f8f9fa",
            padding: "1rem",
            borderRadius: "4px",
            overflow: "auto",
            fontSize: "0.8rem",
          }}
        >
          {JSON.stringify(dashboardData, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default Dashboard;
