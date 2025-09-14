
// placeholder function that return an object
export function parseCV(text: string) {
    // TODO : regex ai for parsing
    return {
        summary: text.slice(0, 300), // first 300 chars as summary
        skills: ["JavaScript", "NodeJS"],
        experience: [],
        education: []
    };
}