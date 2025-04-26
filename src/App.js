import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AppProvider } from "./context/AppContext";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import LandingPage from "./pages/LandingPage";
import PreLanding from "./pages/PreLanding";
import Security from "./pages/Security";
import Performance from "./pages/Performance";
import Team from "./pages/Team";
import Vision from "./pages/Vision";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

// Components
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import MobileDashboard from "./components/MobileDashboard";
import Tools from "./components/Tools";
import MobileTools from "./components/MobileTools";
import Settings from "./components/Settings";
import MobileSettings from "./components/MobileSettings";
import MobileSidebar from "./components/MobileSidebar";
import Navbar from "./components/Navbar";

// Styles
import './styles/Mobile.css';

// Utilities
import { fetchAccounts as fetchUserAccounts } from "./utils/api";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("loggedInUser") || null);
  const [isMobile, setIsMobile] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Detect logged in user and mobile screen size
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) setLoggedInUser(storedUser);

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock scrolling when sidebar is open (Mobile only)
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isSidebarOpen]);

  // Redirect first-time users to PreLanding page
  useEffect(() => {
    const hasSeenPreLanding = localStorage.getItem("hasSeenPreLanding");
    if (!hasSeenPreLanding && location.pathname === "/") {
      localStorage.setItem("hasSeenPreLanding", "true");
      navigate("/pre-landing");
    }
  }, [location.pathname, navigate]);

  // Handle login and logout
  const handleLogin = (username) => {
    setLoggedInUser(username);
    localStorage.setItem("loggedInUser", username);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  // Sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <AppProvider>
      <>
        <ScrollToTop />
        {/* Show Navbar on public pages only */}
        {!["/dashboard", "/tools", "/settings", "/pre-landing"].includes(location.pathname) && <Navbar />}

        <AnimatePresence mode="wait" initial={false}>
          <Routes key={location.pathname} location={location}>
            {!loggedInUser ? (
              <>
                {/* Public Routes */}
                <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
                <Route path="/pre-landing" element={<PageWrapper><PreLanding /></PageWrapper>} />
                <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><Login onLogin={handleLogin} /></PageWrapper>} />
                <Route path="/features/security" element={<PageWrapper><Security /></PageWrapper>} />
                <Route path="/features/performance" element={<PageWrapper><Performance /></PageWrapper>} />
                <Route path="/about/team" element={<PageWrapper><Team /></PageWrapper>} />
                <Route path="/about/vision" element={<PageWrapper><Vision /></PageWrapper>} />
                <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
                <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                {/* Protected Routes */}
                {isMobile ? (
                  <>
                    {/* Mobile Dashboard */}
                    <Route path="/dashboard" element={<PageWrapper><MobileDashboard username={loggedInUser} onLogout={handleLogout} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /></PageWrapper>} />
                    <Route path="/tools" element={<PageWrapper><MobileTools onLogout={handleLogout} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /></PageWrapper>} />
                    <Route path="/settings" element={<PageWrapper><MobileSettings username={loggedInUser} setUsername={setLoggedInUser} fetchAccounts={fetchUserAccounts} onLogout={handleLogout} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /></PageWrapper>} />
                  </>
                ) : (
                  <>
                    {/* Desktop Dashboard */}
                    <Route path="/dashboard" element={<PageWrapper><Dashboard username={loggedInUser} onLogout={handleLogout} /></PageWrapper>} />
                    <Route path="/tools" element={<PageWrapper><Tools onLogout={handleLogout} /></PageWrapper>} />
                    <Route path="/settings" element={<PageWrapper><Settings username={loggedInUser} setUsername={setLoggedInUser} fetchAccounts={fetchUserAccounts} onLogout={handleLogout} /></PageWrapper>} />
                  </>
                )}
              </>
            )}
          </Routes>
        </AnimatePresence>
      </>
    </AppProvider>
  );
}

// Wrapper for page transitions
const PageWrapper = ({ children }) => (
  <motion.div
    variants={{
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 },
    }}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export default App;