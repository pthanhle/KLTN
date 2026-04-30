import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ServiceCategory from '../models/serviceCategoryModel.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const fixIcons = async () => {
    await connectDB();
    
    try {
        const categories = await ServiceCategory.find();
        for (const cat of categories) {
            let newIcon = 'Settings';
            const catName = cat.name.toLowerCase();
            
            if (catName.includes('sửa')) newIcon = 'Wrench';
            else if (catName.includes('bảo dưỡng')) newIcon = 'Wrench';
            else if (catName.includes('chăm sóc') || catName.includes('làm đẹp') || catName.includes('sơn')) newIcon = 'Sparkles';
            else if (catName.includes('lốp') || catName.includes('mâm') || catName.includes('phụ kiện')) newIcon = 'CircleDashed';

            cat.icon = newIcon;
            await cat.save();
            console.log(`Updated icon for ${cat.name} -> ${newIcon}`);
        }
        
        console.log('Icons fixed successfully!');
        process.exit(0);
    } catch (error) {
        console.error(`Failed: ${error.message}`);
        process.exit(1);
    }
};

fixIcons();
