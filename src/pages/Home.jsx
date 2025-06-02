import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
const apiBackendUrl = import.meta.env.VITE_API_BACKEND_URL;

const Home = () => {
  const [user, setUser] = useState("");
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [summary, setSummary] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    // Fetch repos
    axios
      .get(`${apiBackendUrl}/repos`, {
        withCredentials: true, // ✅ CRITICAL!
      })
      .then((res) => {
        console.log("REPO RESPONSE:", res.data);
        setRepos(res.data.repos || []);
      })
      .catch((err) => {
        console.error("Failed to fetch repos:", err);
      });

    // Fetch user info
    axios
      .get(`${apiBackendUrl}/auth/me`, {
        withCredentials: true, // ✅ CRITICAL!
      })
      .then((res) => {
        console.log("USER RESPONSE:", res.data);
        setUser(res.data.user.username);
        setAvatarUrl(res.data.user.avatar);
      })
      .catch(() => {});
  }, []);

  const handleConfirm = () => {
    if (!selectedRepo) return alert("Please select a repository");
    const [owner, repoName] = selectedRepo.split("/");
    axios
      .post(
        `${apiBackendUrl}/repos/select`,
        { repoName, owner },
        {
          withCredentials: true, // ✅ CRITICAL!
        }
      )
      .then(() => alert("Repository selected successfully"))
      .catch(() => alert("Failed to select repository"));
  };

  const handleGenerateSummary = () => {
    axios
      .get(`${apiBackendUrl}/summary`, {
        withCredentials: true, // ✅ CRITICAL!
      })
      .then((res) => setSummary(res.data.summary))
      .catch(() => alert("Failed to generate summary"));
  };

  const handleLogout = () => {
    window.location.href = `${apiBackendUrl}/auth/logout`;
  };

  return (
    <div className="layout-container">
      <div className="info-box">
        Even after you log out, your selected repository will be tracked.
        <br />
        So you can come back to generate a summary.
      </div>

      <div className="home-container">
        <div className="header">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          {avatarUrl && <img src={avatarUrl} alt="Avatar" className="avatar" />}
        </div>

        <div className="content">
          <h2>Welcome, {user}</h2>
          <select
            className="dropdown"
            value={selectedRepo}
            onChange={(e) => setSelectedRepo(e.target.value)}
          >
            <option value="">Select a repository</option>
            {repos.map((repo) => (
              <option key={repo.id} value={`${repo.owner.login}/${repo.name}`}>
                {repo.name}
              </option>
            ))}
          </select>

          <div className="confirm-wrapper">
            <button className="confirm-button" onClick={handleConfirm}>
              Confirm
            </button>
            <div className="info-icon-wrapper">
              <span className="info-icon">i</span>
              <span className="tooltip-text">
                You can only select one repository at a time.
              </span>
            </div>
          </div>

          <div className="summary-wrapper">
            <button className="summary-button" onClick={handleGenerateSummary}>
              Generate Summary
            </button>
            <div className="info-icon-wrapper">
              <span className="info-icon">i</span>
              <span className="tooltip-text">
                Summarizes recent events from your selected repository. Events
                that occurred prior to repository selection will not be
                analyzed.
              </span>
            </div>
          </div>

          <div className="output-box">{summary}</div>
        </div>
      </div>
      <div className="footer">Made by Ninad Walanj</div>
    </div>
  );
};

export default Home;
