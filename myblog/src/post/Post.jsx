import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './post.css';
import beach from '../Image/beach.jpg';

// Default images (placeholders)
const defaultImages = {
  beach: beach,
};

function Post() {
  const [posts, setPosts] = useState([]);  // Initialize posts as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL); // Ensure this route is correct
        console.log('Fetched posts:', response.data); // Debugging log

        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          setPosts([]);
          setError('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching posts:', err.response ? err.response.data : err.message);
        setError('Error fetching posts');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(); 
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!Array.isArray(posts) || posts.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <div className="posts-container">
      {posts.map((post, index) => {
        const postImage = post.image ? `${process.env.REACT_APP_API_URL}/${post.image}` : defaultImages.beach;

        return (
          <div className="post" key={index}>
            <img className="postImg" src={postImage} alt={post.title} />
            <div className="postInfo">
              <div className="postCats">
                {post.categories && post.categories.map((cat, i) => (
                  <span className="postCat" key={i}>{cat}</span>
                ))}
              </div>
              <span className="postTitle">{post.title}</span>
              <hr />
              <span className="postDate">{post.date ? post.date : '1 hour ago'}</span>
            </div>
            <p className="postDesc">
              {post.description || 'No description available'}
            </p>
            <Link to={`/blog/${post.id}`} className="readMoreLink">
              Read More
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Post;
