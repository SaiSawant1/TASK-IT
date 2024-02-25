import RedisPool from "ioredis";
import Redis, { RedisOptions } from "ioredis";

const pool = new RedisPool({
  host: process.env.NEXT_PUBLIC_REDIS_HOST,
  port: 10577,
  password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
  lazyConnect: true,
  showFriendlyErrorStack: true,
  enableAutoPipelining: true,
  maxRetriesPerRequest: 0,
});

export const getRedisClient = async () => {};

export function createRedisInstance() {
  try {
    const options: RedisOptions = {
      host: process.env.NEXT_PUBLIC_REDIS_HOST,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: (times: number) => {
        if (times > 3) {
          throw new Error(`[Redis] Could not connect after ${times} attempts`);
        }

        return Math.min(times * 200, 1000);
      },
    };

    options.port = 10577;

    options.password = process.env.NEXT_PUBLIC_REDIS_PASSWORD;

    const redis = new Redis(options);

    redis.on("error", (error: unknown) => {
      console.warn("[Redis] Error connecting", error);
    });

    return redis;
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
}
