import React, { useEffect, useState } from "react";
import { Card, Text } from "react-sheikah-ui";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    // Simulating data fetching
    const fetchPosts = async () => {
      // Replace this with your actual API call to fetch post data
      const response = await fetch("https://localhost:7248/api/Post");
      const postData = await response.json();
      setPosts(postData);
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    // Replace this with your actual API call to submit the post
    // and update the posts list
    const response = await fetch("https://localhost:7248/api/Post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newPost }),
    });
    const postData = await response.json();
    const updatedPosts = [...posts, postData];
    setPosts(updatedPosts);
    setNewPost("");
  };

  return (
    <div>
      <h1></h1>
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={newPost}
          onChange={(event) => setNewPost(event.target.value)}
          placeholder="Write your post..."
        />
        <button type="submit">Submit Post</button>
      </form>
      {posts.map((post) => (
        <Card key={post.id}>
          <Text>{post.text}</Text>
        </Card>
      ))}
    </div>
  );
};

export default PostPage;
