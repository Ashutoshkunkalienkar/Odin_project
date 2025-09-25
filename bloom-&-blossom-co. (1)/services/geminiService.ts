
import { GoogleGenAI, Type } from "@google/genai";
import { MOCK_PRODUCTS } from '../constants';
import { AIRecommendation } from '../types';

// IMPORTANT: This file uses a mock API key. In a real application, 
// process.env.API_KEY would be set in the environment.
const MOCK_API_KEY = "YOUR_API_KEY_HERE";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || MOCK_API_KEY });

const model = "gemini-2.5-flash";

export const getBouquetRecommendation = async (prompt: string): Promise<AIRecommendation | null> => {
  if (!process.env.API_KEY && MOCK_API_KEY === "YOUR_API_KEY_HERE") {
    console.warn("Gemini API key not found. Returning mock data.");
    // Return mock data if API key is not set
    return new Promise(resolve => setTimeout(() => resolve({
      title: "For Your Wonderful Mom",
      reasoning: "Based on your request for a vibrant bouquet for your mom's birthday, I've selected the 'Sunny Day Arrangement'. Its cheerful sunflowers and bright daisies are perfect for celebrating such a happy occasion and bringing a smile to her face.",
      suggestedProductIds: [2]
    }), 1500));
  }
    
  const productList = MOCK_PRODUCTS.map(p => `ID: ${p.id}, Name: ${p.name}, Description: ${p.description}, Occasions: ${p.occasion.join(', ')}`).join('\n');

  const fullPrompt = `
    You are a friendly and helpful flower shop assistant. A customer is looking for a flower recommendation.
    Customer's request: "${prompt}"

    Based on this request and the available products below, please provide a single, top recommendation.
    Your response must be in JSON format. Do not add any markdown formatting like \`\`\`json.
    
    Available products:
    ${productList}
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A creative and fitting title for your recommendation, like 'A Touch of Sunshine'."
            },
            reasoning: {
              type: Type.STRING,
              description: "A short, friendly paragraph explaining why you chose these flowers for the customer's specific request."
            },
            suggestedProductIds: {
              type: Type.ARRAY,
              items: { type: Type.NUMBER },
              description: "An array containing the numeric ID of the single best product you recommend. Only include one ID."
            }
          },
          required: ["title", "reasoning", "suggestedProductIds"]
        }
      }
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    // Basic validation
    if(parsedJson.title && parsedJson.reasoning && Array.isArray(parsedJson.suggestedProductIds)) {
        return parsedJson as AIRecommendation;
    }
    throw new Error("Invalid JSON structure from AI");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Fallback to mock data on API error
    return {
      title: "An Error Occurred",
      reasoning: "I couldn't generate a recommendation at the moment. However, our 'Crimson Rose Bouquet' is a timeless classic for any occasion!",
      suggestedProductIds: [1]
    };
  }
};
