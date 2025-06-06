import React from "react";
import "./Register.css";
const apiBackendUrl = import.meta.env.VITE_API_BACKEND_URL;

const Register = () => {
  const handleGitHubLogin = () => {
    window.location.href = `${apiBackendUrl}/auth/github`;
  };

  return (
    <div className="register-container">
      <div className="login-box">
        <h2>Welcome to WorkStream AI</h2>
        <button className="login-button" onClick={handleGitHubLogin}>
          Sign up with GitHub
        </button>
      </div>
    </div>
  );
};

export default Register;
