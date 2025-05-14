import redisClient from '../config/redis.config.js';

export const setCache = async (key, value, ttl = 3600) => {
    const str = typeof value === 'string' ? value : JSON.stringify(value);
    if (ttl) {
        await redisClient.set(key, str, { EX: ttl });
    } else {
        await redisClient.set(key, str);
    }
};

export const getCache = async (key) => {
    const data = await redisClient.get(key);
    if (data == null) return null;
    try {
        return JSON.parse(data);
    } catch {
        return data;
    }
};
