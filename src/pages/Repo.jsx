import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Search from "./Search.jsx";

function Repository() {
  const [repos, setRepos] = useState([]);
  const [repos2, setRepos2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [repoName, setRepoName] = useState("");
  const [repoDescription, setRepoDescription] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Function to open modal
    const openModal = () => {
      const modal = document.getElementById("myModal");
      if (modal) {
        modal.style.display = "block";
      }
    };

    // Function to close modal
    const closeModal = () => {
      const modal = document.getElementById("myModal");
      if (modal) {
        modal.style.display = "none";
      }
    };

    // When the user clicks on the button, open the modal
    const btn = document.getElementById("myBtn");
    if (btn) {
      btn.onclick = openModal;
    }

    // When the user clicks on <span> (x), close the modal
    const span = document.getElementsByClassName("close")[0];
    if (span) {
      span.onclick = closeModal;
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
      const modal = document.getElementById("myModal");
      if (event.target === modal) {
        closeModal();
      }
    };

    // Clean up event listeners when component unmounts
    return () => {
      if (btn) {
        btn.onclick = null;
      }
      if (span) {
        span.onclick = null;
      }
      window.onclick = null;
    };
  }, []);

  useEffect(() => {
    // Fetch repositories
    const fetchRepos = async () => {
      const perPage = 5;

      try {
        const response = await fetch(
          `https://api.github.com/users/Princessinyaba/repos?page=${page}&per_page=${perPage}`
        );

        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        } else {
          console.error("Failed to fetch repositories");
        }
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepos();
  }, [page]);

  // Search repositories
  const searchRepos = async (query) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRepos2(data.items);
    } catch (error) {
      console.error("Error searching repositories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: repoName,
      description: repoDescription,
      private: false,
      auto_init: true,
    };

    try {
      const response = await axios.post(
        "https://api.github.com/user/repos",
        data
      );

      if (response.status === 201) {
        setResponseMessage("Repository created successfully.");
        setIsModalOpen(false);
      }
    } catch (error) {
      setResponseMessage(`Failed to create repository: ${error.message}`);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="repo-box">
      <Outlet />
      <Search onSearchRepo={searchRepos} />
      <div className="repo-section">
        {repos.map((repo) => (
          <div className="repo-hold" key={repo.id}>
            <p>
              <b>
                project id: <Link to={`/repos/${repo.name}`}>{repo.name}</Link>
              </b>
            </p>
            <hr />
            <p>
              <b>project name:</b> {repo.name}
            </p>
            <p>{repo.description || "No description"}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        ))}
      </div>
      <button id="myBtn">create Repo</button>
      <div className="button-box">
        <button onClick={prevPage} disabled={page === 1}>
          Previous Page
        </button>
        <button onClick={nextPage}>Next Page</button>
      </div>
      {loading && <p>Loading...</p>}
      <ul>
        {repos2.map((repos) => (
          <li key={repos.id}>
            <a href={repos.html_url} target="_blank" rel="noopener noreferrer">
              {repos.full_name}
            </a>
          </li>
        ))}
      </ul>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={toggleModal}>
            &times;
          </span>
          <h2>Create a New Repository</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-form">
              <label htmlFor="repoName">Repository Name:</label>
              <input
                type="text"
                id="repoName"
                name="repoName"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                required
              />
            </div>
            <div className="text-area-form">
              <label htmlFor="repoDescription">Description:</label>
              <textarea
                id="repoDescription"
                name="repoDescription"
                value={repoDescription}
                onChange={(e) => setRepoDescription(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="repo-button">
              Create Repository
            </button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Repository;
