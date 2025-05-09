import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
let chatSession = null;

export async function sendMessageToGemini(prompt) {
  if (!chatSession) {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-04-17' });
    chatSession = model.startChat();
  }

  const result = await chatSession.sendMessage(prompt);
  const response = await result.response.text();
  return response;
}
