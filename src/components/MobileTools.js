import React, { useState } from "react";
import MobileSidebar from "./MobileSidebar"; // Importing the sidebar component

const MobileTools = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [recentPasswords, setRecentPasswords] = useState([]);
  const [strength, setStrength] = useState(""); // Track password strength separately
  const [passwordToCheck, setPasswordToCheck] = useState(""); // Password input for strength checker

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to generate a random password
  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGeneratedPassword(password);
    setRecentPasswords([password, ...recentPasswords.slice(0, 4)]); // Keep last 5 passwords
  };

  // Function to copy password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
  };

  // Function to check password strength
  const checkPasswordStrength = (password) => {
    if (!password) {
      setStrength(""); // Reset if empty
      return;
    }

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+]/.test(password);
    const isLong = password.length >= 12;

    // Strong: Must have all character types AND be at least 12 characters
    if (isLong && hasLower && hasUpper && hasNumber && hasSymbol) {
      setStrength("Strong");
    }
    // Medium: At least 8 characters and missing one element
    else if (password.length >= 8 && (hasLower + hasUpper + hasNumber + hasSymbol >= 3)) {
      setStrength("Medium");
    }
    // Weak: Anything below 8 characters or missing multiple elements
    else {
      setStrength("Weak");
    }
  };

  return (
    <div className="mobile-tools">
      <MobileSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : ""}`}>
        {/* Hamburger button for sidebar */}
        <button onClick={toggleSidebar} className="p-4 text-2xl">
          ☰ {/* Hamburger icon */}
        </button>

        <main className="p-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Tools</h1>
          {/* Instruction Text (Optionally Adjusted or Removed) */}
          {/* You can either keep this or remove based on your preference */}
          <p className="text-sm text-gray-600 mb-6">
            Generate secure passwords and check their strength.
          </p>

          {/* Divider above password generator */}
          <div className="border-t border-gray-300 mb-6"></div>

          {/* Password Generator */}
          <div className="bg-white p-4 shadow-lg rounded-lg mb-6">
            <h2 className="font-semibold text-lg mb-2">Password Generator</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Create strong, random passwords for better security. Click to generate and copy.
            </p>
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600"
              onClick={generatePassword}
            >
              Generate Password
            </button>
            {generatedPassword && (
              <div className="mt-3 flex items-center space-x-2">
                <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">
                  {generatedPassword}
                </span>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600"
                  onClick={copyToClipboard}
                >
                  Copy
                </button>
              </div>
            )}
          </div>

          {/* Divider below password generator */}
          <div className="border-t border-gray-300 mb-6"></div>

          {/* Recent Passwords */}
          {recentPasswords.length > 0 && (
            <div className="bg-white p-4 shadow-lg rounded-lg mb-6">
              <h2 className="font-semibold text-lg mb-2">Recent Passwords</h2>
              <p className="text-gray-600 mb-4 text-sm">
                These are the last 5 passwords you generated. Access them if needed.
              </p>
              <ul className="list-disc list-inside text-gray-700">
                {recentPasswords.map((pwd, index) => (
                  <li key={index} className="font-mono text-sm">{pwd}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Divider below recent passwords */}
          <div className="border-t border-gray-300 mb-6"></div>

          {/* Password Strength Checker */}
          <div className="bg-white p-4 shadow-lg rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Password Strength Checker</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Test your password's strength below. A strong password should be at least 12 characters long and contain all types of characters.
            </p>
            <input
              type="password"
              className="border px-3 py-2 w-full rounded text-sm"
              placeholder="Enter a password..."
              value={passwordToCheck}
              onChange={(e) => {
                setPasswordToCheck(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
            />

            {/* Bullet Point Instructions for Strength Levels */}
            <ul className="mt-4 text-sm text-gray-600">
              <li><strong className="text-red-500">Weak:</strong> Less than 6 characters, only letters or numbers.</li>
              <li><strong className="text-yellow-500">Medium:</strong> At least 8 characters, includes uppercase/lowercase letters and numbers.</li>
              <li><strong className="text-green-500">Strong:</strong> At least 12 characters, includes uppercase/lowercase letters, numbers, and symbols (!@#$%^&*).</li>
            </ul>

            {strength && (
              <div className="mt-4">
                <p className={`text-lg font-semibold ${strength === "Weak" ? "text-red-500" : strength === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
                  Strength: {strength}
                </p>
                <div className="h-2 w-full bg-gray-300 rounded mt-1">
                  <div
                    className={`h-2 rounded ${strength === "Weak" ? "bg-red-500 w-1/4" : strength === "Medium" ? "bg-yellow-500 w-1/2" : "bg-green-500 w-full"}`}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MobileTools;