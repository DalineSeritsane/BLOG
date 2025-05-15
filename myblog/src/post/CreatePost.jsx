import React, { useState, useEffect } from "react";
import "./create-post.css";

const CreatePost = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const backendUrl = "https://blog-lv0f.onrender.com/api"; // Added /api to backend URL

  // Fetch posts from backend when component loads
  useEffect(() => {
    fetch(`${backendUrl}/posts`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  // Function to add a new post
  const handlePost = async () => {
    if (!name || !surname || !title || !content) {
      alert("All fields are required");
      return;
    }
  
    try {
      const response = await fetch(`${backendUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, title, content }),
      });
  
      // Check if the response is valid
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to add post");
      }
  
      const text = await response.text();
  
      if (!text) {
        throw new Error("Empty response from the server");
      }
  
      const data = JSON.parse(text);
  
      setPosts((prevPosts) => [
        ...prevPosts,
        { _id: data.postId, name, surname, title, content },
      ]);
      setName("");
      setSurname("");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding post:", error);
      alert(error.message || "Error adding post. Please check your backend.");
    }
  };
  

  // Function to delete a post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`${backendUrl}/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      } else {
        alert("Error deleting post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>Create a Blog Post</h2>

      <input type="text" placeholder="First Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Write your content here..." value={content} onChange={(e) => setContent(e.target.value)} />

      <button onClick={handlePost}>Post Blog</button>

      <h3>All Posts</h3>
      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post) => (
          <div key={post._id || `${post.title}-${Math.random()}`}>
            <h4>{post.title}</h4>
            <p>
              <strong>By:</strong> {post.name} {post.surname}
            </p>
            <p>{post.content}</p>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CreatePost;
