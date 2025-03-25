require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');

const app = express();


// Enable CORS for specific frontend URL
app.use(cors({
  origin: process.env.FRONTEND_LOCAL_UR , // Your frontend URL 
  methods: ['POST', 'GET', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'Host', 'User-Agent', 'Accept', 'Accept-Encoding', 'Connection'], // Allowed headers
  credentials: true, // Enable credentials support
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


const PORT = process.env.PORT;  

// Middleware
// app.use(bodyParser.json());  // Parse incoming JSON requests

// Serve static files (like images) from the uploads folder
app.use('/uploads', express.static('uploads'));

// Routes for user and blog handling
app.use('/api', userRoutes);
app.use('/api', blogRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
