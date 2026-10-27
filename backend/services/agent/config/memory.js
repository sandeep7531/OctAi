import redis from "../../../shared/redis.js";
import axios from "axios";

const getMemory = async (conversationId, cookieHeader) => {
    const key = "chat:" + conversationId;
    const cached = await redis.get(key);
    if (cached) {
        return JSON.parse(cached);
    }

    const chatServiceUrl = process.env.CHAT_SERVICE_URL;
    const response = await axios.post(
        `${chatServiceUrl}/get-message`,
        { conversationId },
        {
            headers: {
                Cookie: cookieHeader,
            },
        },
    );

    const messages = response.data?.data || [];
    await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60);
    return messages;
};

const addMessages = async (conversationId, role, content) => {
    const key = "chat:" + conversationId;
    const rawMessages = await redis.get(key);
    let messages = rawMessages ? JSON.parse(rawMessages) : [];

    messages.push({ role, content });

    // Keep only last 20 messages to limit memory
    if (messages.length > 20) {
        messages = messages.slice(-20);
    }

    await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60);
};

export { getMemory, addMessages };
