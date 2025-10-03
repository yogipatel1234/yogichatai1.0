
import { GoogleGenAI, Chat } from "@google/genai";

// Ensure you have your API key set in your environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

export function createChatSession(systemInstruction: string): Chat {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
}
