import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Createpost.css';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        name: '',  
        surname: '',  
        title: '',
        date: '',
        shortDescription: '',
        content: '',
        image: null,
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const fileInputRef = useRef(null); // Correctly define ref for file input

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith("image/")) {
            setError('Only image files are allowed');
            return;
        }
        setFormData((prev) => ({ ...prev, image: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const blogData = new FormData();

        // Append all form fields to FormData
        Object.entries(formData).forEach(([key, value]) => {
            if (value) blogData.append(key, value);
        });

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, blogData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setMessage('Blog created successfully!');
            setError('');

            // Reset form fields
            setFormData({ name: '', surname: '', title: '', date: '', shortDescription: '', content: '', image: null });

            // Reset file input field
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

        } catch {
            setError('Error creating blog. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="create-blog container my-5">
            <h2 className="text-center">Create a New Blog</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="First Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Surname Field */}
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="surname"
                        placeholder="Last Name"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Title Field */}
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Short Description Field */}
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        name="shortDescription"
                        placeholder="Short Description"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Content Field */}
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        name="content"
                        placeholder="Content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Date Field */}
                <div className="mb-3">
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        ref={fileInputRef} // Attach ref here
                        onChange={handleFileChange}
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">Create Blog Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
