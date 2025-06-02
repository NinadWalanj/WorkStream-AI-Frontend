import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.workstream-ai.online/auth/github/callback", {
      method: "GET",
      credentials: "include", // CRITICAL: must be included for cookies
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.redirectTo) {
          window.location.href = data.redirectTo;
        } else {
          navigate("/register");
        }
      })
      .catch((err) => {
        console.error("Callback error:", err);
        navigate("/register");
      });
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default Callback;
