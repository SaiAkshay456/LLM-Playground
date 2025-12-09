import openAiHelper from "./openAiHelper.js"
import { JsonOutputParser } from "@langchain/core/output_parsers"
import { ChatPromptTemplate } from "@langchain/core/prompts"

const prompt = ChatPromptTemplate.fromTemplate(`
You are a senior developer with 20+ years of experience.
Your ONLY task is to generate JSON following the exact format given below.

Topic: {topic}

DO NOT write explanations.  
DO NOT start with words like "Absolutely", "Sure", or anything else.  
Return STRICT JSON only.

{{format_instructions}}
`);

const jsonParser = new JsonOutputParser()
const chain = prompt.pipe(openAiHelper.model).pipe(jsonParser)

const output = await chain.invoke({ topic: "frontend", format_instructions: jsonParser.getFormatInstructions() })
console.log(output);