const API_URL = `${process.env.REACT_APP_API_URL}/api/posts`; // Corrected API URL

const defaultHeaders = {
  "Content-Type": "application/json", // For JSON requests
};

// Handle API errors centrally
const handleErrors = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${response.status} - ${errorText}`);
  }
  return response.json();
};

// Fetch all blog posts
export const fetchBlogs = async () => {
  try {
    const response = await fetch(API_URL);
    return await handleErrors(response);
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};

// Create a new blog post
export const createBlog = async (blogData) => {
  try {
    const formData = new FormData();
    for (const key in blogData) {
      if (blogData[key]) formData.append(key, blogData[key]);
    }

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData, // Sending FormData for image uploads
    });
    return await handleErrors(response);
  } catch (error) {
    console.error("Error creating blog:", error);
  }
};

// Fetch a single blog post by ID
export const fetchBlogById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    return await handleErrors(response);
  } catch (error) {
    console.error("Error fetching blog:", error);
  }
};

// Fetch comments for a specific blog post
export const fetchComments = async (blogId) => {
  try {
    const response = await fetch(`${API_URL}/${blogId}/comments`);
    return await handleErrors(response);
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

// Post a new comment
export const postComment = async (blogId, commentData) => {
  try {
    const response = await fetch(`${API_URL}/${blogId}/comments`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(commentData),
    });
    return await handleErrors(response);
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};
