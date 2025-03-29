require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');


const app = express();

// Enable CORS for specific frontend URL
// app.use(cors({
//   origin: process.env. FRONTEND_URL, "http://localhost:3000",
//   methods: ['POST', 'GET', 'PUT', 'DELETE'], // Allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'Host', 'User-Agent', 'Accept', 'Accept-Encoding', 'Connection'], // Allowed headers
//   credentials: true, // Enable credentials support
// }));
// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://myblogappforcouples.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },  credentials: true
}));



app.use(express.json());

app.get('/posts', (req, res) => {
  res.json({ message: 'CORS issue fixed!' });
});
const PORT = process.env.PORT;  

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" }); // Ensure JSON response for 404 errors
});


// Middleware
// app.use(bodyParser.json());  // Optional body parser, if needed

// Serve static files (like images) from the uploads folder
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes for user and blog handling
app.use('/api', userRoutes);
app.use('/api', blogRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
