const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/Routes');
const cors = require('cors');
const app = express();

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

// Middleware
app.use(cors())
app.use(express.json()); // Use express's built-in body-parser

// Database connection
mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("Database connected successfully");
  
  // Start server after DB connection is established
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error("Error connecting to database", error);
});

// Routes
app.use('/api/user', routes);
