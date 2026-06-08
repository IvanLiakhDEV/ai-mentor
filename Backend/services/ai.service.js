import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildPracticeTaskPrompt, buildSystemPromptForLesson, buildSystemPromptForTask, buildUserMessage } from '../utils/promt.js';

export const askAI = async ({ messages, data, code, type }) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const promt = type === 'practiceTask' ? buildSystemPromptForTask(data) : buildSystemPromptForLesson(data);
    const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite',
        systemInstruction: promt,
        generationConfig: { maxOutputTokens: 350, temperature: 0.4 },
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
        generationConfig: { maxOutputTokens: 3000, temperature: 0.4, responseMimeType: 'application/json' },
    });
    const prompt = buildPracticeTaskPrompt({ topic, difficulty, language });
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
};
