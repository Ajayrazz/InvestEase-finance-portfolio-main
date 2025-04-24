import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getAIResponse(userMessage: string, portfolioData: any) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const context = `
      Portfolio Summary:
      Total Value: $${portfolioData.totalValue}
      Total Gain/Loss: $${portfolioData.totalGain} (${portfolioData.totalGainPercentage}%)
      Asset Allocation: ${portfolioData.allocationByType.map((item: any) => 
        `${item.type}: ${item.percentage}%`
      ).join(', ')}
    `;

    const prompt = `
      As an AI investment assistant, analyze the following portfolio data and respond to the user's question.
      ${context}

      User Question: ${userMessage}

      Provide specific, data-driven advice based on the portfolio information above.
      Keep the response concise but informative.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting AI response:', error);
    return "I apologize, but I'm having trouble analyzing your portfolio right now. Please try again later.";
  }
}