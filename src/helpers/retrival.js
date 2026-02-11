import { ChatPromptTemplate, PromptTemplate } from "langchain/prompts";
import { createStuffDocumentsChain } from "langchain/chains";
import { Document } from "langchain/document";
import openAiHelper from "./openAiHelper.js";

const prompt = ChatPromptTemplate.fromTemplate(`
Hey explain the question
Context: {context}
Question: {concept}
`);

const documentA = new Document({
    pageContent: "LangChain Expression Language (LCEL) is a declarative, composable way to build and manage production-ready chains in LangChain, using a pipe syntax (|) to connect components. It is designed to bridge the gap between prototyping and production, supporting streaming, asynchronous, and parallel execution by default."
});

const chat = await createStuffDocumentsChain({
    llm: openAiHelper.model,
    prompt
});

const response = await chat.invoke({
    concept: "what is LCEL?",
    context: [documentA]
});

console.log(response);
