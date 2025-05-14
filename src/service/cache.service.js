import redisClient from '../config/redis.config.js';

/**
 * Set a value in the cache with a given TTL.
 *
 * @param {string} key Cache key
 * @param {string|object} value Value to be cached
 * @param {number} [ttl=3600] TTL in seconds
 * @returns {Promise<void>}
 */
export const setCache = async (key, value, ttl = 3600) => {
    const str = typeof value === 'string' ? value : JSON.stringify(value);
    if (ttl) {
        await redisClient.set(key, str, { EX: ttl });
    } else {
        await redisClient.set(key, str);
    }
};

/**
 * Retrieves a cached value from Redis, or returns null if the key is not found.
 *
 * This function will attempt to parse the value as JSON. If the value is not
 * valid JSON, the function will return the value as a string.
 *
 * @param {string} key - The key to retrieve from Redis
 * @returns {(Promise<string | object> | null)} The cached value or null
 */
export const getCache = async (key) => {
    const data = await redisClient.get(key);
    if (data == null) return null;
    try {
        return JSON.parse(data);
    } catch {
        return data;
    }
};
