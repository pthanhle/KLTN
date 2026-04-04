import { Worker } from 'bullmq';
import sendEmail from '../utils/sendEmail.js';
import redisConnection from '../config/redis.js';

const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    const { to, subject, html } = job.data;
    console.log(`Processing email job for: ${to}`);
    try {
      await sendEmail({ to, subject, html });
      console.log(`Email sent successfully to: ${to}`);
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error.message);
      throw error;
    }
  },
  {
    connection: redisConnection,
  }
);

emailWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed!`);
});

emailWorker.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed with error ${err.message}`);
});

export default emailWorker;
