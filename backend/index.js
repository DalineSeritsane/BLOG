require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');
const mysql = require("mysql2");

const app = express();

// Enable CORS for frontend
app.use(
  cors({
    origin: [
      "https://myblogappforcouples.vercel.app",
      "http://localhost:3000"
    ],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

//  Define /api/posts AFTER importing routes to avoid conflicts
app.use('/api', userRoutes);
app.use('/api', blogRoutes);

//  Confirm API is working
app.get('/api/posts', (req, res) => {
  console.log("GET /api/posts called");
  res.json([{ id: 1, title: "Test Post", content: "This is a sample post." }]);
});


const PORT = process.env.PORT ;


app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
