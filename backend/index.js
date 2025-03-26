require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');
const path = require('path');  // Missing 'path' import

const app = express();

// Enable CORS for specific frontend URL
app.use(cors({
  origin: process.env.FRONTEND_LOCAL_URL, // Corrected typo here
  methods: ['POST', 'GET', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'Host', 'User-Agent', 'Accept', 'Accept-Encoding', 'Connection'], // Allowed headers
  credentials: true, // Enable credentials support
}));

// Remove redundant CORS middleware

const PORT = process.env.PORT;  

// Middleware
// app.use(bodyParser.json());  // Optional body parser, if needed

// Serve static files (like images) from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes for user and blog handling
app.use('/api', userRoutes);
app.use('/api', blogRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
