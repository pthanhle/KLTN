import { Worker } from 'bullmq';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import Car from '../models/carModel.js';
import redisConnection from '../config/redis.js';
import { getIO } from '../config/socket.js';

const imageWorker = new Worker(
    'imageQueue',
    async (job) => {
        const { productId, files, type } = job.data;
        console.log(`[Worker] Started processing images for ${type} ${productId}`);

        try {
            if (type === 'car') {
                const car = await Car.findById(productId);
                if (!car) throw new Error(`Car ${productId} not found`);

                for (const file of files) {
                    try {
                        const result = await cloudinary.uploader.upload(file.path, {
                            folder: 'carshop/products',
                            use_filename: true,
                            unique_filename: true,
                        });

                        const cloudinaryUrl = result.secure_url;

                        if (file.fieldname === 'image') {
                            car.image = cloudinaryUrl;
                        } else if (file.fieldname.startsWith('color_file_')) {
                            const match = file.fieldname.match(/color_file_(\d+)_/);
                            if (match) {
                                const index = parseInt(match[1]);
                                if (car.colors[index]) {
                                    car.colors[index].image = cloudinaryUrl;
                                    car.markModified(`colors.${index}`);
                                }
                            }
                        } else if (file.fieldname.startsWith('feature_file_')) {
                            const match = file.fieldname.match(/feature_file_(\d+)_/);
                            if (match) {
                                const index = parseInt(match[1]);
                                if (car.features[index]) {
                                    car.features[index].image = cloudinaryUrl;
                                    car.markModified(`features.${index}`);
                                }
                            }
                        } else if (file.fieldname === 'photos') {
                            if (!car.gallery) car.gallery = { photos: [], videos: [] };
                            const idx = car.gallery.photos.findIndex(p => p.includes(path.basename(file.path)));
                            if (idx !== -1) car.gallery.photos[idx] = cloudinaryUrl;
                            else car.gallery.photos.push(cloudinaryUrl);
                            car.markModified('gallery.photos');
                        }

                        if (fs.existsSync(file.path)) {
                            fs.unlinkSync(file.path);
                        }

                    } catch (uploadErr) {
                        console.error(`  - Failed to upload ${file.fieldname}:`, uploadErr);
                    }
                }

                await car.save();
                console.log(`[Worker] Finished updating ${productId} with CDN URLs`);

                const io = getIO();
                if (io) {
                    io.emit('product_image_updated', {
                        productId,
                        message: 'Images have been optimized and uploaded to Cloud.'
                    });
                }
            }
        } catch (error) {
            console.error(`[Worker] Error processing job ${job.id}:`, error);
            throw error;
        }
    },
    {
        connection: redisConnection,
        concurrency: 5,
    }
);

imageWorker.on('completed', (job) => {
    console.log(`[Worker] Job ${job.id} completed successfully`);
});

imageWorker.on('failed', (job, err) => {
    console.error(`[Worker] Job ${job.id} failed:`, err);
});

export default imageWorker;
