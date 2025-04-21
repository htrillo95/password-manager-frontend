import React, { useState } from "react";
import MobileSidebar from "./MobileSidebar";

const MobileTools = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [recentPasswords, setRecentPasswords] = useState([]);
  const [strength, setStrength] = useState("");
  const [passwordToCheck, setPasswordToCheck] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setGeneratedPassword(password);
    setRecentPasswords([password, ...recentPasswords.slice(0, 4)]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
  };

  const checkPasswordStrength = (password) => {
    if (!password) return setStrength("");

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+]/.test(password);
    const isLong = password.length >= 12;

    if (isLong && hasLower && hasUpper && hasNumber && hasSymbol) {
      setStrength("Strong");
    } else if (
      password.length >= 8 &&
      [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length >= 3
    ) {
      setStrength("Medium");
    } else {
      setStrength("Weak");
    }
  };

  return (
    <div className="mobile-tools min-h-screen bg-gradient-to-br from-white to-slate-200">
      <MobileSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} onLogout={onLogout} />
      <div className="mobile-content transition-all duration-300">
        <button onClick={toggleSidebar} className="p-4 text-2xl">☰</button>

        <main className="p-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Tools</h1>
          <p className="text-sm text-gray-600 mb-6">
            Generate secure passwords and check their strength.
          </p>

          <div className="border-t border-gray-300 mb-6" />

          <div className="bg-white p-4 shadow-md rounded-lg mb-6 border border-gray-200">
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

          {recentPasswords.length > 0 && (
            <div className="bg-white p-4 shadow-md rounded-lg mb-6 border border-gray-200">
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

          <div className="border-t border-gray-200 my-6"></div>

          <div className="bg-white p-4 shadow-md rounded-lg border border-gray-200">
            <h2 className="font-semibold text-lg mb-2">Password Strength Checker</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Test your password's strength below. A strong password should be at least 12 characters long and contain all types of characters.
            </p>
            <input
              type="password"
              className="border px-3 py-2 w-full rounded text-sm mb-2"
              placeholder="Enter a password..."
              value={passwordToCheck}
              onChange={(e) => {
                setPasswordToCheck(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
            />

            <ul className="mt-4 text-sm text-gray-600">
              <li><strong className="text-red-500">Weak:</strong> Less than 6 characters, only letters or numbers.</li>
              <li><strong className="text-yellow-500">Medium:</strong> At least 8 characters, includes upper/lowercase and numbers.</li>
              <li><strong className="text-green-500">Strong:</strong> 12+ chars with upper/lowercase, numbers, and symbols.</li>
            </ul>

            {strength && (
              <div className="mt-4">
                <p className={`text-lg font-semibold ${
                  strength === "Weak" ? "text-red-500" :
                  strength === "Medium" ? "text-yellow-500" :
                  "text-green-500"
                }`}>
                  Strength: {strength}
                </p>
                <div className="h-2 w-full bg-gray-300 rounded mt-1">
                  <div className={`h-2 rounded ${
                    strength === "Weak" ? "bg-red-500 w-1/4" :
                    strength === "Medium" ? "bg-yellow-500 w-1/2" :
                    "bg-green-500 w-full"
                  }`} />
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