// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";
// import MobileDashboard from "./components/MobileDashboard";
// import MobileTools from "./components/MobileTools";
// import MobileSettings from "./components/MobileSettings";
// import MobileSidebar from "./components/MobileSidebar";
// import LandingPage from "./pages/LandingPage";
// import Navbar from "./components/Navbar";
// import Security from "./pages/Security";
// import Performance from "./pages/Performance";
// import Team from "./pages/Team";
// import Vision from "./pages/Vision";
// import FAQ from "./pages/FAQ";
// import Contact from "./pages/Contact";
// import ScrollToTop from "./components/ScrollToTop";
// import { AnimatePresence, motion } from "framer-motion";
// import Tools from "./components/Tools";
// import Settings from "./components/Settings";
// import './styles/Mobile.css';  // Import your consolidated mobile CSS

// function App() {
//   const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("loggedInUser") || null);
//   const [isMobile, setIsMobile] = useState(false);
//   const location = useLocation(); // Get the current location

//   useEffect(() => {
//     const storedUser = localStorage.getItem("loggedInUser");
//     console.log("Stored User:", storedUser); // Log to check if the value is set
//     if (storedUser) {
//       setLoggedInUser(storedUser);
//     }

//     // Check if the window size is mobile
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
    
//     window.addEventListener('resize', handleResize);
//     handleResize();  // Initial check on mount
    
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleLogin = (username) => {
//     setLoggedInUser(username);
//     localStorage.setItem("loggedInUser", username);
//   };

//   const handleLogout = () => {
//     setLoggedInUser(null);
//     localStorage.removeItem("loggedInUser");
//   };

//   const pageVariants = {
//     initial: { opacity: 0, y: 50 },
//     animate: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -50 },
//   };

//   const fetchAccounts = async (username) => {
//     if (!username) return;  // ✅ Prevent unnecessary requests if no user is logged in.

//     try {
//         const response = await fetch(`http://127.0.0.1:5000/accounts?username=${username}`);
//         const data = await response.json();

//         if (response.ok) {
//             console.log("✅ Fetched accounts successfully:", data.accounts);
//             return data.accounts; // ✅ Return the accounts data
//         } else {
//             console.error("⚠️ Failed to fetch accounts:", data.message);
//         }
//     } catch (error) {
//         console.error("❌ Error fetching accounts:", error);
//     }
// };

//   return (
//     <>
//       <ScrollToTop />
//       {/* Conditionally render Navbar: Hide on /dashboard */}
//       {!["/dashboard", "/tools", "/settings"].includes(location.pathname) && <Navbar />}
//       <AnimatePresence mode="wait" initial={false}>
//         <Routes key={location.pathname} location={location}>
//           {!loggedInUser ? (
//             <>
//               <Route
//                 path="/"
//                 element={
//                   <motion.div
//                     variants={pageVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{ duration: 0.5 }}
//                   >
//                     <LandingPage />
//                   </motion.div>
//                 }
//               />
//               <Route
//                 path="/register"
//                 element={
//                   <motion.div
//                     variants={pageVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Register />
//                   </motion.div>
//                 }
//               />
//               <Route
//                 path="/login"
//                 element={
//                   <motion.div
//                     variants={pageVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Login onLogin={handleLogin} />
//                   </motion.div>
//                 }
//               />
//               <Route
//                 path="/features/security"
//                 element={
//                   <motion.div
//                     variants={pageVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Security />
//                   </motion.div>
//                 }
//               />
//               <Route
//                 path="/features/performance"
//                 element={
//                   <motion.div
//                     variants={pageVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Performance />
//                   </motion.div>
//                 }
//               />
//               <Route
//                 path="/about/team"
//                 element={
//                   <motion.div
//                     variants={pageVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Team />
//                   </motion.div>
//                 }
//               />
//               <Route
//                 path="/about/vision"
//                 element={
//                   <motion.div
//                     variants={pageVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Vision />
//                   </motion.div>
//                 }
//               />
//               <Route
//                 path="/faq"
//                 element={
//                   <motion.div
//                     variants={pageVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{ duration: 0.5 }}
//                   >
//                     <FAQ />
//                   </motion.div>
//                 }
//               />
//               <Route
//                 path="/contact"
//                 element={
//                   <motion.div
//                     variants={pageVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Contact />
//                   </motion.div>
//                 }
//               />
//               <Route path="*" element={<Navigate to="/" />} />
//             </>
//           ) : (
//             <>
//               <Route
//                 path="/dashboard"
//                 element={
//                   <motion.div
//                     variants={pageVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Dashboard
//                       username={loggedInUser}
//                       onLogout={handleLogout}
//                     />
//                   </motion.div>
//                 }
//               />
//               <Route
//                 path="/tools"
//                 element={
//                   <motion.div
//                     variants={pageVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Tools onLogout={handleLogout}/>
//                   </motion.div>
//                 }
//               />
//               <Route
//                 path="/settings"
//                 element={
//                   <motion.div
//                     variants={pageVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{ duration: 0.5 }}
//                   >
//                     <Settings 
//                       onLogout={handleLogout} 
//                       username={loggedInUser} 
//                       setUsername={setLoggedInUser}
//                       fetchAccounts={fetchAccounts}
//                    />
//                   </motion.div>
//                 }
//               />
//               <Route path="*" element={<Navigate to="/dashboard" />} />
//             </>
//           )}
//         </Routes>
//       </AnimatePresence>
//     </>
//   );
// }

// export default App;