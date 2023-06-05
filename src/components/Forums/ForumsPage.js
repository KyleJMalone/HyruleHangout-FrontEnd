import React, { useEffect, useState } from "react";
import { Card, Text } from "react-sheikah-ui";
import "./ForumsPage.css";
import { CommentsPage } from "../CommentsPage/CommentsPage"; // Import the CommentsPage component

export const ForumsPage = () => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    // Simulating data fetching
    const fetchForums = async () => {
      // Replace this with your actual API call to fetch forums data
      const response = await fetch("https://localhost:7248/api/Forums");
      const forumsData = await response.json();
      setForums(forumsData);
    };

    fetchForums();
  }, []);

  return (
    <div className="forums-page">
      <h1>Forums</h1>
      {forums.map((forum) => (
        <Card key={forum.id} className="forum-card">
          <Text>{forum.title}</Text>
        </Card>
      ))}
      <CommentsPage /> {/* Include the CommentsPage component */}
    </div>
  );
};
