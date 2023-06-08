import React, { useEffect, useState } from "react";
import { Card, Text } from "react-sheikah-ui";
import "./ForumsPage.css";
import { CommentsPage } from "../CommentsPage/CommentsPage";
import PostPage from "../PostPage/PostPage";

export const ForumsPage = () => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await fetch("https://localhost:7248/api/Forums");
        const forumsData = await response.json();
        console.log(forumsData); // Log the fetched data for inspection
        setForums(forumsData);
      } catch (error) {
        console.error("Error fetching forums:", error);
      }
    };

    fetchForums();
  }, []);

  console.log(forums); // Log the forums state for inspection

  return (
    <div className="forums-page">
      <h1>Forums</h1>
      {forums.map((forum) => (
        <Card key={forum.id} className="forum-card">
          <Text>{forum.title}</Text>
          <div className="post-thread">
            {forum.posts.map((post) => (
              <div key={post.id} className="post">
                <Card>
                  <Text>{post.text}</Text>
                </Card>
                {/* Display replies */}
                {post.comments && post.comments.length > 0 && (
                  <div className="replies">
                    {post.comments.map((comment) => (
                      <Card key={comment.id}>
                        <Text>{comment.text}</Text>
                      </Card>
                    ))}
                  </div>
                )}
                {/* Include the PostPage component for replying */}
                <PostPage forumId={forum.id} parentId={post.id} />
              </div>
            ))}
            <CommentsPage forumId={forum.id} /> {/* Include the CommentsPage component for each forum */}
          </div>
        </Card>
      ))}
    </div>
  );
};
