import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildPracticeTaskPrompt, buildSystemPrompt, buildUserMessage } from '../utils/promt.js';

export const askAI = async ({ messages, lesson, code }) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite',
        systemInstruction: buildSystemPrompt(lesson),
        generationConfig: { maxOutputTokens: 250, temperature: 0.4 },
    });
    const history = messages.slice(1).map((msg, index, arr) => ({
        role: msg.isBot ? 'model' : 'user',
        parts: [{ text: !msg.isBot && index === arr.length - 1 ? buildUserMessage(msg.message, code) : msg.message }],
    }));
    const lastMessageObj = history.pop();
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessageObj.parts[0].text);
    return result.response.text();
};
export const generateTask = async ({ topic, difficulty, language }) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite',
        generationConfig: { maxOutputTokens: 500, temperature: 0.6, responseMimeType: 'application/json' },
    });
    const prompt = buildPracticeTaskPrompt({ topic, difficulty, language });
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
};
