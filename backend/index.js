const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')
const path = require('path')

const app = express()
const PORT = 4000
const allowedOrigins = ['http://localhost:4000', 'https://ramdev-motors.onrender.com', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'], // Including OPTIONS for preflight
  allowedHeaders: ['Content-Type', 'Authorization'], // Added 'Authorization' in case it's needed
  credentials: true, // Allow credentials (cookies, HTTP authentication, etc.)
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, etc.) may choke on 204
}));

app.use(body_parser.json())

app.use("/api/manage",require('./routes/profile.routes'))
app.use("/api/manage",require('./routes/vehicle.routes'))
app.use("/api/manage",require('./routes/service.routes'))
app.use("/api/manage",require('./routes/bills.routes'))
app.use(express.static(path.join(__dirname, "/dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });

app.listen(PORT,()=>{
    console.log("app is listen on the http://localhost:4000")
})