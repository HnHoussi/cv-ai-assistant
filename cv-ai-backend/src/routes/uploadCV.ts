import {Router} from "express";
import {parseCV} from "../services/cvParserService.js"
import {supabase} from "../config/db.js";

// create router object to hold routes
const router = Router();

// runs when a post req is made to api/upload-cv
router.post("/", async (req, res) => {
    try {
        // req body should have these constants
        const {cvText, candidateName, email} = req.body;

        // call the service to parse the cv infos
        const parseData = parseCV(cvText);

        // save to supabase(postgres)
        const {data, error} = await supabase
            .from("candidates")
            .insert([{name: candidateName, email, summary: parseData.summary}])
            .select(); // return the inserted row

        // handle errors
        if (error) throw error;
        res.json({success: true, candidate: data[0]});

    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to process the cv"});
    }
});

export default router;