const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes');
dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: [

    "http://localhost:5173",
    "https://myspace-frontend.vercel.app",
    "https://nasirfreelance-euxl.vercel.app",

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