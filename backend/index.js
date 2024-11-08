const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const path = require('path');

const app = express();
const allowedOrigins = [
  'http://localhost:4000', 
  'https://ramdev-motors.onrender.com', 
  'http://localhost:5173',
  'https://ramdevmotors.vercel.app' // Add your Vercel URL here
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(body_parser.json());

// API Routes
app.use("/api/manage", require('./routes/profile.routes'));
app.use("/api/manage", require('./routes/vehicle.routes'));
app.use("/api/manage", require('./routes/service.routes'));
app.use("/api/manage", require('./routes/bills.routes'));

// Serve static React files from /dist
app.use(express.static(path.join(__dirname, "/dist")));

// Catch-all route for React app (client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Export the app as a serverless function
module.exports = app;
