import IORedis from 'ioredis';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

let redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

if (process.platform === 'win32' && redisUrl.includes('://redis')) {
  redisUrl = redisUrl.replace('://redis', '://127.0.0.1');
}

console.log(`[Redis] Đang kết nối tới: ${redisUrl}`);

const redisConnection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

redisConnection.on('connect', () => {
  console.log(`[Redis] Kết nối thành công tới ${redisUrl}`);
});

redisConnection.on('error', (error) => {
  if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
    console.warn(`[Redis] Đang đợi Redis... (${error.code})`);
  } else {
    console.error('[Redis] Lỗi:', error);
  }
});

export default redisConnection;
