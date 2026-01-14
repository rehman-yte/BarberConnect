
import { GoogleGenAI } from "@google/genai";

// Standardizing getStyleRecommendation to follow the strict Google GenAI SDK guidelines
export const getStyleRecommendation = async (userPrompt: string, imageBase64?: string) => {
  // Always use a named parameter and initialize right before the call to handle dynamic API keys
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    // Upgraded to gemini-3-pro-preview for complex reasoning tasks like artisanal style curation
    const model = 'gemini-3-pro-preview';
    let contents: any;

    if (imageBase64) {
      // Correct multi-part content structure for image + text
      contents = {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
          { text: `Based on this photo and my request: "${userPrompt}", what haircut or beard style would you recommend for me? Provide a concise, professional recommendation emphasizing face shape and maintenance.` }
        ]
      };
    } else {
      // Basic text-only task
      contents = `Based on my request: "${userPrompt}", what haircut or beard style would you recommend for me? Provide a concise, professional recommendation emphasizing current trends and personality fit.`;
    }

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    // Correctly extracting text: Always use .text property directly, not .text() method
    return response.text || "I couldn't generate a recommendation right now. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong with the AI service. Please check your connectivity.";
  }
};
