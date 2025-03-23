import React, { useState } from 'react';
import axios from 'axios';
import './Createpost.css';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        date: '',
        shortDescription: '',
        content: '',
        image: null,
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

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
        Object.entries(formData).forEach(([key, value]) => {
            if (value) blogData.append(key, value);
        });
        blogData.append('comments', JSON.stringify([]));

        try {
            await axios.post('http://localhost:7412/api/posts', blogData, {
                headers: { 'Content-Type': 'applicationn/json' },
            });
            setMessage('Blog created successfully!');
            setError('');
            setFormData({ title: '', author: '', date: '', shortDescription: '', content: '', image: null });
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
                {['title', 'author', 'shortDescription', 'content'].map((field) => (
                    <div key={field} className="mb-3">
                        <input
                            type={field === 'content' || field === 'shortDescription' ? 'textarea' : 'text'}
                            className="form-control"
                            name={field}
                            placeholder={field.replace(/([A-Z])/g, ' $1')}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}
                <div className="mb-3">
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Blog Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
