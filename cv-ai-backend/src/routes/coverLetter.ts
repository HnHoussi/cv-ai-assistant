import {Router} from "express";

// import service (AI model)
import {askAI} from "../services/aiService.js";

import { getCandidateProfile } from "../services/candidateService.js";

// create router object to hold routes
const router = Router();

// post method with candidate data and a job description
router.post("/", async (req, res) => {
    try {
        const {candidateId, jobDescription} = req.body;

        // Fetch candidate profile
        const candidateData = await getCandidateProfile(candidateId);

        // prompt for the AI
        const prompt = `Candidate Data: ${JSON.stringify(candidateData)}
                        Job Description: ${jobDescription}
                        Write a professional cover letter (300 words).
                        `;

        //Sends the prompt to the AI service
        const coverLetter = await askAI(candidateData, prompt);

        // return the generated cover letter
        res.json({coverLetter});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Cover Letter generation failed."});
    }
});

export default router;
