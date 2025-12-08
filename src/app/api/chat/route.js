import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    openAIApiKey: process.env.OPENAI_API_KEY  // note: property name is openAIApiKey
});

export async function POST(req) {
    try {
        const { message } = await req.json();
        if (!message) throw new Error("No message provided");

        const response = await model.invoke(message);  // returns string
        const text = response.content; // "Hello! How can I assist you today?"
        console.log(text)
        return new Response(
            JSON.stringify({ reply: text || "No reply from AI" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (err) {
        console.error("OpenAI Error:", err);
        return new Response(
            JSON.stringify({ message: "Failed to generate" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
