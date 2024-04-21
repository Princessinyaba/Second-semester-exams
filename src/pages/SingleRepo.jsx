import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RepoDetails = () => {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    fetchRepo();
  }, [repoName]);

  const fetchRepo = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/Princessinyaba/${repoName}`
      );
      setRepo(response.data);
    } catch (error) {
      console.error("Error fetching repository details:", error);
    }
  };

  return (
    <div className="repo-details">
      <h1>{repo ? repo.name : "Loading..."}</h1>
      {repo && (
        <>
          <p>Description: {repo.description || "No description"}</p>
          <p>
            URL:{" "}
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.html_url}
            </a>
          </p>
          <p>Stars: {repo.stargazers_count}</p>
          <p>Watchers: {repo.watchers_count}</p>
          <p>Forks: {repo.forks_count}</p>
        </>
      )}
    </div>
  );
};

export default RepoDetails;
