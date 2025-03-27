const express = require('express');
const multer = require('multer');
const Joi = require('joi'); // Import Joi for validation
const { dbQuery } = require('../db'); // Import promisified query
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Define Joi Validation Schema for Blog Posts
const postSchema = Joi.object({
  name: Joi.string().min(2).required(),
  surname: Joi.string().min(2).required(),
  title: Joi.string().min(3).required(),
  content: Joi.string().min(5).required(),
});

// Ensure the uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set storage engine for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Upload folder
  },
  filename: (req, file, cb) => {
    const imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  }
});

// Initialize upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit size to 1MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Allow only these formats
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
  }
}).single('image');

// GET /api/blogs - Fetch all blog posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await dbQuery('SELECT * FROM posts');
    res.json(Array.isArray(posts) ? posts : []);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Error fetching posts ' });
  }
});

// GET /api/posts/:id - Fetch a single post
router.get('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await dbQuery('SELECT * FROM posts WHERE id = ?', [id]);
    if (post.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Database error' });
  }
});


// POST /api/blogs - Create a new blog post with Joi validation
router.post('/posts',  async (req, res) => {
  const { name, surname, title, content } = req.body;
 
  // Validate the request body using Joi schema
  const { error } = postSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { name, surname, title, content} = req.body;
    const sql ='INSERT INTO posts (name, surname, title, content) VALUES (?, ?, ?, ?)'; 
    
    
    const result = await dbQuery(sql,[name, surname, title, content]
    ); console.log ("Post insterted successfully:", result);

    res.status(201).json({ message: 'Post created successfully', postId: result.insertId });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Database error' });
  }
});


router.delete("/posts/id:", async (req,res) =>{
  try{
    const id = parseInt(req.params.id);

    if(!id || isNaN(id)) {
      return res.status(400).json({message: "Valid post ID is required"});
    }
    const checkSql = "SELECT * FROM posts WHERE id = ?";
    const post = await query(checkSql, [id]);
    if (post.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const deleteSql = "DELETE FROM posts WHERE id = ?";
    await query(deleteSql, [id]);

    res.json({ message: "Post deleted successfully" });

  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Error deleting post", error: err });
  }
})
// Export the router
module.exports = router;
