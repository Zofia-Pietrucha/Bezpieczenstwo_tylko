import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Login from "./pages/Login.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
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
  );
};

export default App;
