import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const token = localStorage.getItem("loggedInUser"); // Check if user is logged in
  return token ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;