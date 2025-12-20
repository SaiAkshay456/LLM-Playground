import openAiHelper from "./openAiHelper.js";
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { JsonOutputParser } from "@langchain/core/output_parsers"
const jsonParser = new JsonOutputParser()
const prompt = ChatPromptTemplate.fromTemplate(`
    Hey,Answer the questions : {input}
    Return valid JSON ONLY.
    {format_instructions}
`)

const chain = prompt.pipe(openAiHelper.model).pipe(jsonParser);

const output = await chain.invoke({
    input: "what is AI/ML? explain in simple terms",
    format_instructions: jsonParser.getFormatInstructions()

})
console.log(output);

