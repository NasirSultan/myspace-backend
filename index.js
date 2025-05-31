const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
const path = require('path');
const fs = require('fs');


// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const contactRoutes = require('./routes/contactRoutes');
dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: [

    "http://localhost:5173",
    "https://myspace-frontend.vercel.app",
    "https://nasirfreelance.vercel.app",

  ],
  methods: ["POST", "DELETE", "GET", "PUT"],
  credentials: true
}));

app.use(express.json());

// Root test route
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', contactRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/posts', postRoutes);
// MongoDB connection and server startup
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');

    // Start server on port 5000
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB error:', err));