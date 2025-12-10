const OpenAI = require("openai");

const client1 = new OpenAI({
  apiKey: process.env.LLMKey1,
  baseURL: "https://api.groq.com/openai/v1",
});


const client2 = new OpenAI({
    apiKey: process.env.LLMKey2,
    baseURL: "https://api.groq.com/openai/v1",
});


module.exports = {client1 , client2};