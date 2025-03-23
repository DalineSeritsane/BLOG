import React, { useState } from "react";
import "./write.css";
import pool from "../../Image/pool.jpg";

function Write() {
    // State to hold title, content, and image
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);

    // Handle file selection
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) formData.append("image", image);

        try {
            const response = await fetch("http://localhost:5000/api/blogs", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert("Story published successfully!");
                // Clear the form inputs
                setTitle("");
                setContent("");
                setImage(null);
            } else {
                console.error("Failed to publish story:", result.message);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className="write">
            <img className="writeImg" src={pool} alt="" />
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Tell your story.."
                        type="text"
                        className="writeInput writeText"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="writeSubmit">
                    Publish
                </button>
            </form>
        </div>
    );
}

export default Write;
 