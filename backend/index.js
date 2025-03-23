require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');

const app = express();


// Enable CORS for specific frontend URL
app.use(cors({
  origin: process.env.FRONTEND_URL , // Your frontend URL (Uncomment and modify as needed)
  credentials: true,
}));


const PORT = process.env.PORT;  // Default to 7412 if PORT is not set

// Middleware
app.use(bodyParser.json());  // Parse incoming JSON requests

// Serve static files (like images) from the uploads folder
app.use('/uploads', express.static('uploads'));

// Routes for user and blog handling
app.use('/api', userRoutes);
app.use('/api', blogRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
