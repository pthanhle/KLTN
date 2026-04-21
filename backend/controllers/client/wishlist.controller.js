import asyncHandler from 'express-async-handler';
import Wishlist from '../../models/wishlistModel.js';
import Part from '../../models/partModel.js';
import mongoose from 'mongoose';


export const getWishlist = asyncHandler(async (req, res) => {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
        path: 'parts',
        match: { status: 'active' },
        select: 'name sku price original_price discount_percent images slug is_best_seller total_stock condition condition_name inventory rating reviews_summary reviews_count compatible_brands options'
    });

    if (!wishlist) {
        wishlist = await Wishlist.create({ user: req.user._id, parts: [] });
    }

    const activeParts = wishlist.parts.filter(p => p !== null).map(part => {
        const stock = (part.inventory?.warehouse || 0) + (part.inventory?.showroom || 0);
        let stock_status = "in_stock";
        if (stock === 0) stock_status = "out_of_stock";
        else if (stock < 5) stock_status = "low_stock";

        let badge_type = null;
        if (part.is_best_seller) badge_type = "best_seller";
        else if (part.discount_percent > 0) badge_type = "sale";
        else badge_type = "new_arrival";

        return {
            id: part._id,
            part_id: part._id,
            type: 'part',
            brand: part.brand?.name || part.brand || (part.compatible_brands && part.compatible_brands.length > 0 ? part.compatible_brands[0] : 'Phụ kiện'),
            name: part.name,
            sku: part.sku,
            image: part.images?.length > 0 ? part.images[0] : '',
            price: part.price,
            original_price: part.original_price,
            discount_percent: part.discount_percent,
            stock_status,
            stock,
            condition: part.condition_name || part.condition || '',
            rating: part.reviews_summary?.average || part.rating || 0,
            reviews_count: part.reviews_summary?.total || part.reviews_count || 0,
            badge_type,
            slug: part.slug,
            options: part.options
        };
    });

    const mockCarItems = (wishlist.mock_cars || []).map(carId => ({
        id: carId,
        part_id: carId,
        type: 'car'
    }));

    res.json({
        data: {
            items: [...activeParts, ...mockCarItems]
        }
    });
});


export const toggleWishlistStatus = asyncHandler(async (req, res) => {
    const { part_id } = req.body;

    let isMockCar = false;
    let part = null;

    if (!mongoose.Types.ObjectId.isValid(part_id)) {
        isMockCar = true;
    } else {
        part = await Part.findOne({ _id: part_id, status: 'active' });
        if (!part) {
            res.status(404);
            throw new Error('Sản phẩm này không tồn tại hoặc đã ngừng kinh doanh.');
        }
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
        wishlist = await Wishlist.create({ user: req.user._id, parts: [], mock_cars: [] });
    }

    let isAdded = false;

    if (isMockCar) {
        const index = wishlist.mock_cars.findIndex(id => String(id) === String(part_id));
        if (index > -1) {
            wishlist.mock_cars.splice(index, 1);
        } else {
            wishlist.mock_cars.push(String(part_id));
            isAdded = true;
        }
    } else {
        const index = wishlist.parts.findIndex(p => p.toString() === part_id);
        if (index > -1) {
            wishlist.parts.splice(index, 1);
        } else {
            wishlist.parts.push(part_id);
            isAdded = true;
        }
    }

    await wishlist.save();

    res.json({
        message: isAdded ? 'Đã thêm vào danh mục yêu thích.' : 'Đã gỡ khỏi danh mục yêu thích.',
        data: {
            isAdded,
            wishlistCount: wishlist.parts.length
        }
    });
});


export const clearWishlist = asyncHandler(async (req, res) => {
    await Wishlist.findOneAndUpdate(
        { user: req.user._id },
        { parts: [] }
    );
    res.json({ message: 'Danh sách yêu thích đã được dọn sạch.' });
});

