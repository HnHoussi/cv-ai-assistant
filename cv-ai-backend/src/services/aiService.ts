// to make HTTP requests
import fetch from "node-fetch";

const HF_MODEL = "HuggingFaceH4/zephyr-7b-beta:featherless-ai";
const HF_API_KEY = process.env.HF_API_KEY;

export async function askAI(candidateData: any, question: string): Promise<string> {

    // Debug: check that env variables are loaded
    console.log("HF_API_KEY loaded:", HF_API_KEY?.slice(0, 8));
    console.log("Using HF_MODEL:", HF_MODEL);

    if (!HF_API_KEY) {
        console.error("HF_API_KEY is missing!");
        return "AI key not configured.";
    }

    // prompt to the AI
    const prompt = `Candidate Data: ${JSON.stringify(candidateData)}
    Question: ${question}
    Answer clearly`;

    try {

        // send post request to Hugging Face
        const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: prompt,
                options: { wait_for_model: true } // important for gated models
            }),
        });

        // Read as text first
        const text = await response.text();

        // Try to parse JSON, fallback to raw text if it fails
        try {
            // Hugging Face returns an array of outputs, we take the first one
            const result = JSON.parse(text);
            return result[0]?.generated_text || "No answer generated.";
        } catch {
            console.error("HuggingFace returned non-JSON response:", text);
            return `AI error: ${text}`;
        }
    } catch (err) {
        console.error("Failed to fetch from HuggingFace:", err);
        return "AI request failed";
    }
}