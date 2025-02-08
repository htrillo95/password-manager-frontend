import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Tools = () => {
  const navigate = useNavigate();
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [recentPasswords, setRecentPasswords] = useState([]);
  const [strength, setStrength] = useState(""); // Track password strength separately
  const [passwordToCheck, setPasswordToCheck] = useState(""); // Password input for strength checker

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
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col items-center py-6">
        <h2 className="text-2xl font-bold mb-8">PasswordVault</h2>
        <nav className="w-full px-4 space-y-6">
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700" onClick={() => navigate("/dashboard")}>
            Vault
          </button>
          <button className="w-full text-left py-2 px-4 rounded bg-gray-700">
            Tools
          </button>
          <button className="w-full text-left py-2 px-4 rounded hover:bg-gray-700" onClick={() => navigate("/settings")}>
            Settings
          </button>
        </nav>
        <button
          onClick={() => navigate("/login")}
          className="mt-auto w-11/12 py-2 px-4 bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-hidden">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Tools</h1>
        <p className="text-gray-600 mb-6">
          This section provides tools to help you create secure passwords and check their strength. 
          Use the <strong>Password Generator</strong> to create strong, random passwords, and the 
          <strong> Password Strength Checker</strong> to ensure your passwords are secure.
        </p>

        {/* Password Generator */}
        <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
          <h2 className="font-semibold text-lg mb-2">Password Generator</h2>
          <p className="text-gray-600 mb-4">
            Generate a strong and random password for improved security. Click the button below and copy the password for safe storage.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={generatePassword}>
            Generate Password
          </button>
          {generatedPassword && (
            <div className="mt-3 flex items-center">
              <span className="font-mono text-lg bg-gray-200 px-3 py-1 rounded">
                {generatedPassword}
              </span>
              <button className="ml-3 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={copyToClipboard}>
                Copy
              </button>
            </div>
          )}
        </div>

        {/* Recent Passwords */}
        {recentPasswords.length > 0 && (
          <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
            <h2 className="font-semibold text-lg mb-2">Recent Passwords</h2>
            <p className="text-gray-600 mb-4">
              Below are the last <strong>five passwords</strong> you generated. This helps in case you need to retrieve a password you copied earlier.
            </p>
            <ul className="list-disc list-inside text-gray-700">
              {recentPasswords.map((pwd, index) => (
                <li key={index} className="font-mono text-sm">{pwd}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Password Strength Checker */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="font-semibold text-lg mb-2">Password Strength Checker</h2>
          <p className="text-gray-600 mb-4">
            Enter a password below to check its strength. A <strong>strong password</strong> should be at least 12 characters long and include 
            uppercase, lowercase letters, numbers, and symbols.
          </p>
          <input
            type="password"
            className="border px-4 py-2 w-full rounded"
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
  );
};

export default Tools;