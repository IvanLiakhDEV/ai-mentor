import axios from 'axios';
import { buildSystemPrompt, buildUserMessage } from '../utils/promt.js';
export const askAI = async ({ messages, lesson, code }) => {
    const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
        {
            system_instruction: {
                parts: [{ text: buildSystemPrompt(lesson) }],
            },
            contents: messages.map((msg, index) => ({
                role: msg.isBot ? 'model' : 'user',
                parts: [{ text: !msg.isBot && index === messages.length - 1 ? buildUserMessage(msg.message, code) : msg.message }],
            })),
        },
        {
            headers: {
                'X-goog-api-key': process.env.GEMINI_API_KEY,
                'Content-Type': 'application/json',
            },
        },
    );
    return response.data.candidates[0].content.parts[0].text;
};
