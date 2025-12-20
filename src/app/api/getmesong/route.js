import { generateSong } from "../../../helpers/template-prompt.js"


export async function POST(request) {
    try {
        const { word } = await request.json();
        const responseGenerator = await generateSong(word);
        return new Response(
            JSON.stringify({ reply: responseGenerator?.content || "No reply from AI", noOfTokens: responseGenerator?.usage_metadata?.output_tokens }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        return new Response(
            JSON.stringify({ message: err.message || "failed to generate" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}