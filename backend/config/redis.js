import IORedis from 'ioredis';

const redisConnection = new IORedis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  maxRetriesPerRequest: null,
  // Thử kết nối lại sau mỗi 10 giây nếu Redis down
  retryStrategy(times) {
    return 10000;
  }
});

redisConnection.on('error', (error) => {
  if (error.code === 'ECONNREFUSED') {
    // Silent error
  } else {
    console.error('Redis Error:', error);
  }
});

export default redisConnection;
