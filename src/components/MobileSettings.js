import React, { useState } from "react";
import MobileSidebar from "./MobileSidebar"; // Importing the sidebar component

const MobileSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="mobile-settings">
      <MobileSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : ""}`}>
        {/* Hamburger button for sidebar */}
        <button onClick={toggleSidebar} className="p-4 text-2xl">
          ☰ {/* Hamburger icon */}
        </button>

        <main className="p-4">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          {/* Your settings content */}
        </main>
      </div>
    </div>
  );
};

export default MobileSettings;