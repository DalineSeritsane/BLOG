import React, { useState, useEffect } from 'react';
import './Createpost.css';

const CreatePost = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const backendUrl = process.env.REACT_APP_API_URL; 

    useEffect(() => {
        if (!backendUrl) {
            console.error("Backend URL is not set.");
            setError("Backend URL is not set. Please configure REACT_APP_API_URL.");
            return;
        }
    
        fetch(`${backendUrl}/posts`)
            .then((response) => response.json())
            .then((data) => {
                setPosts(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setError("Error fetching posts.");
            });
    }, [backendUrl]);
    
    // Fetch posts from backend 
    useEffect(() => {
        fetch(`${backendUrl}/posts`)
            .then((response) => response.json())
            .then((data) => {
                setPosts(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setError("Error fetching posts.");
            });
    }, [backendUrl]);

    // Add new post function 
    const handlePost = async () => {
        if (!name || !surname || !title || !content) {
            alert("All fields are required.");
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

            if (response.ok) {
                const data = await response.json();
                setPosts((prevPosts) => [
                    ...prevPosts,
                    { id: data.postId, name, surname, title, content },
                ]);
                setMessage("Blog created successfully!");
                setError("");
                setName("");
                setSurname("");
                setTitle("");
                setContent("");
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to add post.");
            }
        } catch (error) {
            console.error("Error adding post:", error);
            setError("Error adding post. Backend error.");
        }
    };

    // Delete post function 
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            const response = await fetch(`${backendUrl}/posts/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
            } else {
                alert("Error deleting post.");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Error deleting post.");
        }
    };

    return (
        <div className="create-blog container my-5">
            <h2 className="text-center">Create a New Blog</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form>
                {/* Name Field */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Surname Field */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                </div>

                {/* Title Field */}
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Content Field */}
                <div className="mb-3">
                    <textarea
                        placeholder="Write content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="button" onClick={handlePost}>Create Blog Post</button>
            </form>

            <h3>All Posts</h3>
            {posts.length === 0 ? (
                <p>No posts yet</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id}>
                        <h4>{post.title}</h4>
                        <p><strong>By:</strong> {post.name} {post.surname}</p>
                        <p>{post.content}</p>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default CreatePost;
