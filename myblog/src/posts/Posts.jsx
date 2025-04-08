import React from 'react'
import "./posts.css";
import Post from "../post/Post";


//for pages id blog posts
function Posts() {
  return (
    <div className="posts">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  )
};

export default Posts;