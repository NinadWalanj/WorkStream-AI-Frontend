// src/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./spinner.css";
const apiBackendUrl = import.meta.env.VITE_API_BACKEND_URL;

// console.log("Backend URL: ROUTE", apiBackendUrl);

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiBackendUrl}/auth/me`, { withCredentials: true })
      .then(() => setLoading(false))
      .catch(() => {
        navigate("/register");
      });
  }, []);

  if (loading)
    return (
      <div className="spinner-container">
        <div className="spinner" />
      </div>
    );

  return children;
};

export default ProtectedRoute;
