import { GoogleGenerativeAI } from "@google/generative-ai";

// Note: In a real app, store this in an .env file as EXPO_PUBLIC_GEMINI_API_KEY
const GEMINI_API_KEY =
  process.env.EXPO_PUBLIC_GEMINI_API_KEY ||
  "AIzaSyDaGSS4SYlCkj5KolabY90U7J1y8S9cpQM";
const GEMINI_MODEL =
  process.env.EXPO_PUBLIC_GEMINI_MODEL || "gemini-3.1-flash-lite-preview";

export const getProductReviewSummary = async (
  productTitle,
  productDescription,
) => {
  if (!GEMINI_API_KEY) {
    return "Set EXPO_PUBLIC_GEMINI_API_KEY in your .env to enable AI-powered product insights.";
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const prompt = `You are a shopping assistant. Provide a brief, engaging 2-sentence summary of why someone should buy this product, highlighting its key benefits.\nProduct Title: ${productTitle}\nProduct Description: ${productDescription}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not load AI insights at this time.";
  }
};
