import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Password Manager
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Securely store and manage your passwords in one place.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;