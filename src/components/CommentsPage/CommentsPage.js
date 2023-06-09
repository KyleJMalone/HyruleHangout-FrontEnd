import React, { useEffect, useState } from "react";
import { Card, Text } from "react-sheikah-ui";

export const CommentsPage = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Simulating data fetching
    const fetchComments = async () => {
      // Replace this with your actual API call to fetch comments data
      const response = await fetch("https://localhost:7248/api/Comments");
      const commentsData = await response.json();
      setComments(commentsData);
    };

    fetchComments();
  }, []);

  return (
    <div className="comments-page">
      {comments.map((comment) => (
        <Card key={comment.id} className="comment-card">
          <Text>{comment.text}</Text>
          <p>By: {comment.user.userName}</p>
        </Card>
      ))}
    </div>
  );
};
