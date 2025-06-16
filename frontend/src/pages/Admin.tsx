import React, { useState, useEffect } from "react";
import api from "../services/api.ts";

interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  status: string;
  lastLogin: string;
}

interface AdminStats {
  users: {
    total: number;
    active: number;
    inactive: number;
    newThisMonth: number;
  };
  system: {
    uptime: string;
    serverLoad: string;
    memoryUsage: string;
    diskUsage: string;
  };
  security: {
    failedLogins: number;
    blockedIPs: number;
    activeTokens: number;
  };
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"users" | "stats">("users");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, statsResponse] = await Promise.all([
          api.get("/api/admin/users"),
          api.get("/api/admin/stats"),
        ]);

        setUsers(usersResponse.data.data);
        setStats(statsResponse.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load admin data");
        console.error("Admin error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>🔄 Loading Admin Panel...</h2>
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
      <h1>👑 Admin Panel</h1>

      {/* Tabs */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => setActiveTab("users")}
          style={{
            backgroundColor: activeTab === "users" ? "#3498db" : "#ecf0f1",
            color: activeTab === "users" ? "white" : "black",
            border: "none",
            padding: "0.75rem 1.5rem",
            marginRight: "0.5rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          👥 Users Management
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          style={{
            backgroundColor: activeTab === "stats" ? "#3498db" : "#ecf0f1",
            color: activeTab === "stats" ? "white" : "black",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          📊 System Statistics
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === "users" && (
        <div>
          <h2>👥 Users Management</h2>
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#e9ecef" }}>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "left",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    Username
                  </th>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "left",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    Email
                  </th>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "left",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    Roles
                  </th>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "left",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      padding: "0.75rem",
                      textAlign: "left",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    Last Login
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td
                      style={{
                        padding: "0.75rem",
                        border: "1px solid #dee2e6",
                      }}
                    >
                      {user.username}
                    </td>
                    <td
                      style={{
                        padding: "0.75rem",
                        border: "1px solid #dee2e6",
                      }}
                    >
                      {user.email}
                    </td>
                    <td
                      style={{
                        padding: "0.75rem",
                        border: "1px solid #dee2e6",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: user.roles.includes("admin")
                            ? "#f39c12"
                            : "#3498db",
                          color: "white",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                        }}
                      >
                        {user.roles.join(", ")}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "0.75rem",
                        border: "1px solid #dee2e6",
                      }}
                    >
                      <span
                        style={{
                          color:
                            user.status === "active" ? "#27ae60" : "#e74c3c",
                          fontWeight: "bold",
                        }}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "0.75rem",
                        border: "1px solid #dee2e6",
                      }}
                    >
                      {new Date(user.lastLogin).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === "stats" && stats && (
        <div>
          <h2>📊 System Statistics</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {/* User Stats */}
            <div
              style={{
                backgroundColor: "#3498db",
                color: "white",
                padding: "1.5rem",
                borderRadius: "8px",
              }}
            >
              <h3>👥 User Statistics</h3>
              <p>
                <strong>Total Users:</strong> {stats.users.total}
              </p>
              <p>
                <strong>Active:</strong> {stats.users.active}
              </p>
              <p>
                <strong>Inactive:</strong> {stats.users.inactive}
              </p>
              <p>
                <strong>New This Month:</strong> {stats.users.newThisMonth}
              </p>
            </div>

            {/* System Stats */}
            <div
              style={{
                backgroundColor: "#27ae60",
                color: "white",
                padding: "1.5rem",
                borderRadius: "8px",
              }}
            >
              <h3>🖥️ System Health</h3>
              <p>
                <strong>Uptime:</strong> {stats.system.uptime}
              </p>
              <p>
                <strong>Server Load:</strong> {stats.system.serverLoad}
              </p>
              <p>
                <strong>Memory Usage:</strong> {stats.system.memoryUsage}
              </p>
              <p>
                <strong>Disk Usage:</strong> {stats.system.diskUsage}
              </p>
            </div>

            {/* Security Stats */}
            <div
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                padding: "1.5rem",
                borderRadius: "8px",
              }}
            >
              <h3>🔒 Security</h3>
              <p>
                <strong>Failed Logins:</strong> {stats.security.failedLogins}
              </p>
              <p>
                <strong>Blocked IPs:</strong> {stats.security.blockedIPs}
              </p>
              <p>
                <strong>Active Tokens:</strong> {stats.security.activeTokens}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
