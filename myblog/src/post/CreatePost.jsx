import React, { useState, useEffect } from 'react';
import './Createpost.css';

const backendUrl = process.env.REACT_APP_API_URL + "/api"; // Define once

const CreatePost = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!backendUrl) {
            console.error("Backend URL is missing!");
            setError("Backend URL is not set.");
            return;
        }

        fetch(`${backendUrl}/posts`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setPosts(Array.isArray(data) ? data : []);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setError("Error fetching posts.");
            });
    }, [backendUrl]);

    const handlePost = async () => {
        if (!backendUrl) {
            setError("Backend URL is not set.");
            return;
        }

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

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setPosts((prevPosts) => [...prevPosts, { id: data.postId, name, surname, title, content }]);
            setMessage("Blog created successfully!");
            setError("");
            setName("");
            setSurname("");
            setTitle("");
            setContent("");
        } catch (error) {
            console.error("Error adding post:", error);
            setError("Error adding post. Backend error.");
        }
    };

    const handleDelete = async (id) => {
        if (!backendUrl) {
            setError("Backend URL is not set.");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            const response = await fetch(`${backendUrl}/posts/${id}`, { method: "DELETE" });

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
                <input type="text" placeholder="First Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="Last Name" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Write content here..." value={content} onChange={(e) => setContent(e.target.value)} required />
                <button type="button" onClick={handlePost}>Create Blog Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
