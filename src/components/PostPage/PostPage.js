import React, { useEffect, useState } from "react";
import { Text } from "react-sheikah-ui";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  // State variables
  const [posts, setPosts] = useState(null); // Array of posts
  const [newPostText, setNewPostText] = useState(""); // Text of the new post
  const [forumId, setForumId] = useState(-1); // ID of the selected forum
  const [forums, setForums] = useState(null); // Array of forums
  const [editingPostId, setEditingPostId] = useState(null); // ID of the post being edited

  const currentUser = localStorage.getItem("capstone_user");
  const userObject = JSON.parse(currentUser);

  const navigate = useNavigate();

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://localhost:7248/api/Post");
        const postData = await response.json();
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (!posts) {
      fetchPosts();
    }
  }, []);

  // Fetch forums on component mount
  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await fetch("https://localhost:7248/api/Forums");
        const forumsData = await response.json();
        setForums(forumsData);
      } catch (error) {
        console.error("Error fetching forums:", error);
      }
    };

    if (!forums) {
      fetchForums();
    }
  }, []);

  // Handle the submission of a new post
  const handleNewPostSubmit = async (e) => {
    e.preventDefault();

    // Create a new post object
    const newPost = {
      text: newPostText,
      forumId: forumId,
      userId: userObject.id,
      date: new Date(),
    };

    try {
      const response = await fetch("https://localhost:7248/api/Post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        navigate("/post");
      } else {
        console.error("Failed to create post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Handle the update of an existing post
  const handlePostUpdate = async (postId, newText) => {
    console.log(postId,newText)
    try {
      const updatedPost = {
        id: postId,
        text: newText,
      };
     console.log(updatedPost)
      const response = await fetch(
        `https://localhost:7248/api/Post/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        }
      );

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, text: newText } : post
          )
        );
        setEditingPostId(null);
      } else {
        console.error("Failed to update post:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  // Handle the deletion of a post
  const handlePostDelete = async (postId) => {
    try {
      const response = await fetch(
        `https://localhost:7248/api/Post/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== postId));
      } else {
        console.error("Failed to delete post:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditStart = (postId) => {
    setEditingPostId(postId);
  };

  const handleEditCancel = () => {
    setEditingPostId(null);
  };


  const handleEditSubmit = async (postId, newText) => {
    console.log(postId,newText)
   await handlePostUpdate(postId, newText);
    setEditingPostId(null);
  };

  return (
    <div>
      <div className="forum-container">
        <div className="post-form">
          <form onSubmit={handleNewPostSubmit}>
            <select
              value={forumId}
              onChange={(e) => {
                setForumId(parseInt(e.target.value));
              }}
            >
              <option value={-1}>Select a forum</option>
              {forums &&
                forums.map((forum) => (
                  <option key={forum.id} value={forum.id}>
                    {forum.title}
                  </option>
                ))}
            </select>
            <input
              type="text"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Enter your post"
            />
            <button type="submit">Submit Post</button>
          </form>
        </div>
        <div className="post-list">
          {posts &&
            posts.map((post) => (
              <div key={post.id} className="post">
                {editingPostId === post.id ? (
                  <div>
                    <textarea
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                    />
                    <button
                      onClick={() => handleEditSubmit(post.id, newPostText)}
                    >
                      Save
                    </button>
                    <button onClick={handleEditCancel}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <Text>{post.text}</Text>
                    {post.userId === userObject.id && (
                      <>
                        <button onClick={() => handleEditStart(post.id)}>
                          Edit
                        </button>
                        <button onClick={() => handlePostDelete(post.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
