import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';
import connectDB from '../config/db.js';

dotenv.config();

// Fix for Mongo connection if MONGO_URI is missing (use the one from seeder logic)
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://pthanh:pthanhle@cluster0.p7r6b.mongodb.net/KLTN?retryWrites=true&w=majority&appName=Cluster0';

const seedFullCar = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB...');

        let carCategory = await Category.findOne({ category_name: /xe/i });
        if (!carCategory) {
            carCategory = await Category.create({
                category_name: 'Xe Ô Tô',
                description: 'Các dòng xe sang trọng và đẳng cấp'
            });
        }

        const fullCar = {
            category_id: carCategory._id,
            type: 'car',
            sku: 'MB-G63-2024',
            product_name: 'Mercedes-Benz G-Class AMG G63',
            tagline: 'Biểu tượng của sự sang trọng và sức mạnh vô song',
            description: 'Dòng xe SUV huyền thoại với khả năng vận hành vượt trội trên mọi địa hình, kết hợp nội thất xa hoa và công nghệ hàng đầu.',
            price: 11750000000,
            stock: 5,
            isNew: true,
            brandName: 'Mercedes-Benz',
            brandId: 'mercedes',
            year: 2024,
            odo: 0,
            engine: '4.0L V8 Biturbo',
            fuel: 'Xăng',
            seats: 5,
            bodyStyle: 'SUV',
            images: [
                'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1200'
            ],
            colors: [
                { id: 'black', name: 'Đen Obsidian', value: '#000000', filterStyle: 'brightness(0.3)' },
                { id: 'white', name: 'Trắng Polar', value: '#FFFFFF', filterStyle: 'brightness(1.8)' },
                { id: 'grey', name: 'Xám Selenite', value: '#808080', filterStyle: 'grayscale(0.6)' }
            ],
            features: [
                { 
                    title: 'Thiết kế Ngoại Thất Độc Bản', 
                    desc: 'Diện mạo mạnh mẽ với lưới tản nhiệt Panamericana đặc trưng của dòng AMG, kết hợp đèn pha LED Multibeam thông minh.', 
                    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d' 
                },
                { 
                    title: 'Nội thất Thủ Công Xa Hoa', 
                    desc: 'Sử dụng da Nappa cao cấp nhất, kết hợp chi tiết sợi Carbon thủ công và hệ thống âm thanh vòm Burmester 15 loa.', 
                    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8' 
                }
            ],
            specs: [
                {
                    category: 'Động cơ & Khả năng Vận hành',
                    items: [
                        { label: 'Loại động cơ', value: 'V8 4.0L Tăng áp kép' },
                        { label: 'Công suất cực đại', value: '585 mã lực tại 6000 v/ph' },
                        { label: 'Mô-men xoắn cực đại', value: '850 Nm tại 2500-3500 v/ph' },
                        { label: 'Tăng tốc 0-100 km/h', value: '4.5 giây' },
                        { label: 'Hộp số', value: 'AMG SPEEDSHIFT TCT 9G' }
                    ]
                },
                {
                    category: 'Thông số Kích thước',
                    items: [
                        { label: 'Dài x Rộng x Cao', value: '4873 x 1984 x 1969 mm' },
                        { label: 'Chiều dài cơ sở', value: '2890 mm' },
                        { label: 'Dung tích bình xăng', value: '100 Lít' },
                        { label: 'Tự trọng', value: '2560 kg' }
                    ]
                }
            ],
            threeSixty: Array.from({ length: 36 }).map((_, i) => 
                `https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1200&frame=${i}`
            ),
            gallery: {
                photos: [
                    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341',
                    'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
                    'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e'
                ],
                videos: ['https://www.youtube.com/watch?v=mD_a-C-XQWk']
            }
        };

        // Remove existing if any
        await Product.deleteMany({ product_name: fullCar.product_name });
        
        // Insert new
        const seededProduct = await Product.create(fullCar);

        console.log('✅ Seeding Complete! Car ID:', seededProduct._id);
        process.exit();
    } catch (error) {
        console.error('❌ Seeding Error:', error);
        process.exit(1);
    }
}

seedFullCar();
