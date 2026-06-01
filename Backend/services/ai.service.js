import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildSystemPrompt, buildUserMessage } from '../utils/promt.js';
import { process } from 'zod/v4/core';

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
export const generateTask = async ({ lesson }) => {
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
