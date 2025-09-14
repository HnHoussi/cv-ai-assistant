import {Router} from "express";

// import service (AI model)
import {askAI} from "../services/aiService";

// create router object to hold routes
const router = Router();

// post route
// async because we will send the data and question to the AI model and await for the response
router.post("/", async (req, res) => {
    try {
        // question about the candidate infos
        const {candidateData, question} = req.body;

        // calls the AI service
        const response = await askAI(candidateData, question);

        // send back a JSON with the AI answer
        res.json({answer: response});

    } catch (err) {

        console.log(err);
        res.status(500).json({error: "AI chat failed"});
    }
});

export default router;