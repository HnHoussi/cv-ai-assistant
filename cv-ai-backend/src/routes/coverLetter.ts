import {Router} from "express";

// import service (AI model)
import {askAI} from "../services/aiService.js";

// create router object to hold routes
const router = Router();

// post method with candidate data and a job description
router.post("/", async (req, res) => {
    try {
        const {candidateData, jobDescription} = req.body;

        // prompt for the AI
        const prompt = `Candidate Data: ${JSON.stringify(candidateData)}
                        Job Description: ${jobDescription}
                        Write a professional cover letter (300 words).
                        `;

        //Sends the prompt to the AI service
        const letter = await askAI(candidateData, prompt);

        // return the generated cover letter
        res.json({coverLetter: letter});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Cover Letter generation failed."});
    }
});

export default router;
