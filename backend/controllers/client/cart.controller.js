import asyncHandler from 'express-async-handler';
import Cart from '../../models/cartModel.js';
import Part from '../../models/partModel.js';

const mapCartItem = (item) => {
    return {
        id: item._id,
        part_id: item.part._id,
        name: item.part.name,
        sku: item.part.sku,
        price: parseFloat(item.part.price),
        original_price: parseFloat(item.part.original_price || item.part.price),
        image: item.part.images && item.part.images.length > 0 ? item.part.images[0] : '',
        quantity: item.quantity,
        selected_options: item.selected_options || {},
        condition: item.part.condition_name || item.part.condition || '',
        category: item.part.category || 'Phụ tùng',
        slug: item.part.slug,
        type: 'part',
        is_best_seller: item.part.is_best_seller,
        inventory: item.part.inventory || { stock_on_hand: 0, allocated: 0, available_stock: 0 }
    };
};

export const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id })
        .populate({
            path: 'items.part',
            select: 'name sku price original_price images category condition_name condition slug is_best_seller inventory status'
        });

    if (!cart || !cart.items || cart.items.length === 0) {
        return res.json({ data: { items: [], total: 0 } });
    }

    let total = 0;
    const items = cart.items.map(item => {
        if (!item.part || item.part.status !== 'active') {
            return null;
        }

        const price = parseFloat(item.part.price || 0);
        const quantity = item.quantity;
        total += price * quantity;

        return mapCartItem(item);
    }).filter(item => item !== null);

    res.json({
        data: {
            items: items,
            total: total
        }
    });
});

export const addToCart = asyncHandler(async (req, res) => {
    const { part_id, quantity, selected_options = {} } = req.body;

    if (!part_id || !quantity || quantity < 1) {
        res.status(400);
        throw new Error('Vui lòng cung cấp part_id và số lượng hợp lệ.');
    }

    const part = await Part.findById(part_id);
    if (!part || part.status !== 'active') {
        res.status(404);
        throw new Error('Linh kiện không tồn tại hoặc đã ngừng kinh doanh.');
    }

    if (part.options && part.options.length > 0) {
        const missingOptions = part.options.filter(opt => !selected_options[opt.type]);
        if (missingOptions.length > 0) {
            res.status(400);
            throw new Error(`Vui lòng chọn ${missingOptions[0].type} cho sản phẩm này.`);
        }
    }

    const stock = part.inventory?.available_stock || 0;
    if (stock < quantity) {
        res.status(400);
        throw new Error(`Kho chỉ còn ${stock} đơn vị sản phẩm này.`);
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        cart = await Cart.create({
            user: req.user._id,
            items: [{ part: part_id, quantity, selected_options }]
        });
    } else {
        const itemIndex = cart.items.findIndex(item =>
            item.part.toString() === part_id &&
            JSON.stringify(item.selected_options || {}) === JSON.stringify(selected_options)
        );

        if (itemIndex > -1) {
            const newQuantity = cart.items[itemIndex].quantity + quantity;
            if (stock < newQuantity) {
                res.status(400);
                throw new Error(`Kho chỉ còn ${stock} đơn vị sản phẩm này.`);
            }
            cart.items[itemIndex].quantity = newQuantity;
        } else {
            cart.items.push({ part: part_id, quantity, selected_options });
        }
        await cart.save();
    }

    res.status(201).json({
        message: 'Thêm vào giỏ hàng thành công',
        data: {
            cartCount: cart.items.length
        }
    });
});

export const updateCartItem = asyncHandler(async (req, res) => {
    const { item_id, quantity } = req.body;

    if (!item_id || !quantity || quantity < 1) {
        res.status(400);
        throw new Error('Vui lòng cung cấp item_id và số lượng hợp lệ (tối thiểu 1).');
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        res.status(404);
        throw new Error('Giỏ hàng không tồn tại.');
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === item_id);
    if (itemIndex === -1) {
        res.status(404);
        throw new Error('Không tìm thấy sản phẩm trong giỏ hàng.');
    }

    const part = await Part.findById(cart.items[itemIndex].part);
    if (!part) {
        res.status(404);
        throw new Error('Linh kiện này đã bị xoá khỏi hệ thống.');
    }

    const stock = part.inventory?.available_stock || 0;
    if (stock < quantity) {
        res.status(400);
        throw new Error(`Kho chỉ còn ${stock} đơn vị sản phẩm này. Hãy giảm số lượng.`);
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.json({
        message: 'Đã cập nhật số lượng thành công.'
    });
});

export const removeFromCart = asyncHandler(async (req, res) => {
    const item_id = req.params.item_id;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        return res.json({ message: 'Đã gỡ sản phẩm khỏi giỏ hàng.' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === item_id);
    if (itemIndex === -1) {
        return res.json({ message: 'Đã gỡ sản phẩm khỏi giỏ hàng.' });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.json({
        message: 'Đã gỡ sản phẩm khỏi giỏ hàng.'
    });
});

export const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
        cart.items = [];
        await cart.save();
    }
    res.json({ message: 'Đã làm trống giỏ hàng.' });
});