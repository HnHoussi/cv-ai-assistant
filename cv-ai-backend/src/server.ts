// import framework express
import express = require('express');
// Middleware to read the request body
import bodyParser = require('body-parser');
// Middleware to allow cross-origin requests (front end)
import cors = require('cors');
// get environment variables from .env
import dotenv = require('dotenv');
dotenv.config();

// create the Express application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
import uploadCV from './routes/uploadCV'
import chatRoute from "./routes/chat"
import coverLetterRoute from "./routes/coverLetter"

//Request the routes
app.use("/api/upload-cv", uploadCV);
app.use("/api/chat", chatRoute);
app.use("/api/coverLetter", coverLetterRoute);

// Starting the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});

