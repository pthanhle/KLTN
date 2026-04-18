import { Queue } from 'bullmq';
import redisConnection from '../config/redis.js';

export const imageQueue = new Queue('imageQueue', {
    connection: redisConnection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 5000,
        },
        removeOnComplete: true,
        removeOnFail: false,
    },
});

export const addImageUploadJob = async (productId, files, type = 'car') => {
    try {
        const job = await imageQueue.add('processUpload', {
            productId,
            files: files.map(f => ({
                fieldname: f.fieldname,
                path: f.path,
                filename: f.filename,
                mimetype: f.mimetype
            })),
            type
        });
        console.log(`[Queue] Added upload job ${job.id} for product ${productId}`);
        return job;
    } catch (error) {
        console.error(`[Queue] Failed to add job:`, error);
        throw error;
    }
};
