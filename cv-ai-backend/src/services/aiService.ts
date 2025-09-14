// to make HTTP requests
import fetch from "node-fetch";

const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.2"; // free model

export async function askAI(candidateData: any, question: string): Promise<string> {

    // prompt to the AI
    const prompt = `Candidate Data: ${JSON.stringify(candidateData)}
    Question: ${question}
    Answer clearly`;

    // send post request to Hugging Face
    const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${HF_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({inputs: prompt})
    });

    // Hugging Face returns an array of outputs, we take the first one
    const result: any = await response.json();
    return result[0]?.generated_text || "No answer generated.";
}