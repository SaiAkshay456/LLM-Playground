import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.OPENAI_API_KEY, "key openai");

const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    maxTokens: 200,
    temperature: 0.5,

})

export default { model };