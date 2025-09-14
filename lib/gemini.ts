import { GoogleGenAI } from "@google/genai";

// This key is automatically managed by the environment.
// Do not change it or add any user-facing UI for it.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  // In a real app, you might want to disable translation features
  // or show a message, but for this context, we'll throw an error.
  console.error("API_KEY environment variable not set. Translation will not work.");
}

// Initialize with a placeholder if the key is missing, allowing the app to run.
const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" });

export const gemini = ai.models;
