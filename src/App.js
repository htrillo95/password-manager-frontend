import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleLogin = (username) => {
    setLoggedInUser(username);
    localStorage.setItem("loggedInUser", username);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    navigate("/"); // Redirect to Landing Page
  };

  const SecurityPage = () => (
    <div>
      <h1>Security Features</h1>
      <p>Learn about RiverLock's advanced security features.</p>
    </div>
  );

  const PerformancePage = () => (
    <div>
      <h1>Performance Features</h1>
      <p>Discover how RiverLock ensures optimal performance.</p>
    </div>
  );

  const TeamPage = () => (
    <div>
      <h1>Our Team</h1>
      <p>Meet the people behind RiverLock.</p>
    </div>
  );

  const VisionPage = () => (
    <div>
      <h1>Our Vision</h1>
      <p>Learn about RiverLock's mission and long-term goals.</p>
    </div>
  );

  return (
    <>
      <Navbar />
      <Routes>
        {!loggedInUser ? (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/features/security" element={<SecurityPage />} />
            <Route path="/features/performance" element={<PerformancePage />} />
            <Route path="/about/team" element={<TeamPage />} />
            <Route path="/about/vision" element={<VisionPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route
              path="/dashboard"
              element={<Dashboard username={loggedInUser} onLogout={handleLogout} />}
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;