// import framework express
import express from 'express';

// Middleware to read the request body
import bodyParser from 'body-parser';

// Middleware to allow cross-origin requests (front end)
import cors from 'cors';

// get environment variables from .env
import dotenv from 'dotenv';
dotenv.config();

// create the Express application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
import uploadCV from './routes/uploadCV.js'
import chatRoute from "./routes/chat.js"
import coverLetterRoute from "./routes/coverLetter.js"

//Request the routes
app.use("/api/upload-cv", uploadCV);
app.use("/api/chat", chatRoute);
app.use("/api/coverLetter", coverLetterRoute);

// Starting the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Test : Listening on port http://localhost:${port}`);
});

