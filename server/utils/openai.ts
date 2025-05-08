import OpenAI from "openai";

const apiKey = process.env.OPENAI_TOKEN;
const baseURL = "https://api.deepseek.com";
console.log("apiKey", apiKey);
export const openai = new OpenAI({ baseURL, apiKey });
