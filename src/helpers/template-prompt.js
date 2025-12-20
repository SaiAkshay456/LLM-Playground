import openAiModel from "./openAiHelper.js"
import { ChatPromptTemplate } from "@langchain/core/prompts";


export async function generateSong(inputTopic) {
    const prompt = ChatPromptTemplate.fromTemplate("hey you are singer, suggest some songs with this word {input} only hindi songs ")
    const chain = prompt.pipe(openAiModel.model);
    const output = await chain.invoke({ input: inputTopic });
    console.log(output)
    return output;
}
//to format a prompt and send to models u can use chatPrompt templates
