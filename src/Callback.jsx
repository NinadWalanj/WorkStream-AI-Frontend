import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.workstream-ai.online/auth/github/callback", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate("/");
        } else {
          navigate("/register");
        }
      })
      .catch(() => navigate("/register"));
  }, [navigate]);

  return <p>Logging you in...</p>;
};

export default Callback;
