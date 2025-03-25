import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './postDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setBlog(response.data);
        setComments(response.data.comments || []);
      } catch (err) {
        setError('Blog not found!');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${id}/comments`, {
        username,
        comment
      });
      setComments([...comments, response.data]);
      setUsername('');
      setComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${id}/comments/${commentId}/reply`, {
        username,
        reply,
      });
      const updatedComments = comments.map(c => {
        if (c.id === commentId) {
          return { ...c, replies: [...c.replies, response.data] };
        }
        return c;
      });
      setComments(updatedComments);
      setReply('');
      setReplyToCommentId(null);
    } catch (err) {
      console.error('Error adding reply:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}/comments/${commentId}`);
      setComments(comments.filter(c => c.id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const imageUrl = blog && blog.image ? `http://localhost:5000/uploads/${blog.image}` : '';

  return (
    <div className="blog-detail container my-5">
      <h2 className="text-center">{blog.title}</h2>
      <h5 className="text-muted text-center">
        By {blog.author} | {new Date(blog.date).toLocaleDateString()}
      </h5>
      <img src={imageUrl} alt={blog.title} className="img-fluid my-4" />
      <p className="lead">{blog.shortDescription}</p>
      <div className="content">
        <h4>Blog Content</h4>
        <p>{blog.content}</p>
      </div>

      {/* Comments Section */}
      <div className="comments-section mt-5">
        <h4>Comments</h4>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="comment">
              <strong>{c.username}</strong>
              <p>{c.comment}</p>
              <button onClick={() => setReplyToCommentId(c.id)}>Reply</button>
              <button onClick={() => handleDeleteComment(c.id)}>Delete</button>
              {replyToCommentId === c.id && (
                <form onSubmit={(e) => handleReplySubmit(e, c.id)}>
                  <input
                    type="text"
                    placeholder="Your Reply"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    required
                  />
                  <button type="submit">Add Reply</button>
                </form>
              )}
              {c.replies && c.replies.length > 0 && (
                <div className="replies">
                  <h5>Replies:</h5>
                  {c.replies.map((r) => (
                    <div key={r.id} className="reply">
                      <strong>{r.username}</strong>
                      <p>{r.reply}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default PostDetail;
