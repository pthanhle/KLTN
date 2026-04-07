import mongoose from 'mongoose';
import Part from './models/partModel.js';
import PartReview from './models/partReviewModel.js';
import User from './models/userModel.js'; // Assumed userModel exists

mongoose.connect('mongodb://127.0.0.1:27017/carShop')
    .then(async () => {
        console.log('Connected to MongoDB');
        
        const partId = '69d4d84cc8cd42c64a35833b';
        const part = await Part.findById(partId);
        
        if (!part) {
            console.log('Part not found! Cannot seed.');
            process.exit(1);
        }

        // Find a random user or create a temporary one for the reviews
        let user1 = await User.findOne({ role: 'customer' });
        let user2 = await User.findOne({ role: 'admin' });
        
        if (!user1) user1 = await User.findOne(); // Grab any user if no customer exists

        // Fake Data Array
        const reviewsData = [
            {
                user_id: user1 ? user1._id : new mongoose.Types.ObjectId(), // fallbacks
                part_id: part._id,
                rating: 5,
                comment: 'Sản phẩm giao nhanh, đóng gói rất cẩn thận bọc chống sốc đàng hoàng. Lắp ráp vào xe rất khít, zin nguyên bản luôn. Chất lượng TTAUTO xưa giờ không phải chê!',
                variant: 'Kích Thước: 16 inch',
                images: [
                    'https://down-vn.img.susercontent.com/file/vn-11134103-7r98o-lyj9t6ksvw1nca',
                    'https://down-vn.img.susercontent.com/file/vn-11134103-7r98o-lyj9t6kuxak32d'
                ],
                status: 'approved',
                likes: 12,
                replies: [
                    {
                        user_id: user2 ? user2._id : new mongoose.Types.ObjectId(),
                        content: 'Dạ TT AUTO cảm ơn anh đã tin tưởng sử dụng phụ tùng của công ty ạ. Chúc anh vạn dặm bình an!'
                    }
                ]
            },
            {
                user_id: user2 ? user2._id : (user1 ? user1._id : new mongoose.Types.ObjectId()),
                part_id: part._id,
                rating: 4,
                comment: 'Chất lượng cũng ổn định trong tầm giá. Tuy nhiên shop rep tin nhắn hơi chậm tí do mình cần tư vấn gấp. Lắp đặt thì vừa khít xe mình, hy vọng độ bền lâu.',
                variant: 'Kích Thước: 17 inch',
                images: [],
                status: 'approved',
                likes: 3,
                replies: []
            },
            {
                user_id: user1 ? user1._id : new mongoose.Types.ObjectId(),
                part_id: part._id,
                rating: 5,
                comment: 'Hàng bảo hành chính hãng, check được code QR yên tâm luôn. Gắn lên xe êm ru.',
                variant: 'Kích Thước: 18 inch',
                images: [
                    'https://down-vn.img.susercontent.com/file/vn-11134103-7r98o-lyj9t6kw4qeb3c'
                ],
                status: 'approved',
                likes: 5,
                replies: []
            }
        ];

        // Clear existing reviews to prevent duplicates if run multiple times
        await PartReview.deleteMany({ part_id: partId });
        console.log('Cleared old reviews for this part.');

        // Insert new ones individually so the 'save' hook triggers to update Part stats
        for (let data of reviewsData) {
            const review = new PartReview(data);
            await review.save();
            console.log(`Seeded review with rating: ${data.rating}`);
        }

        console.log('Seed completed successfully!');
        process.exit(0);

    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
