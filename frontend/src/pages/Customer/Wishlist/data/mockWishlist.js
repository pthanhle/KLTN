import { MOCK_PARTS } from '../../Parts/data/parts.mock';

export const mockWishlistItems = [
    {
        id: "wl_1",
        product_id: MOCK_PARTS[0].id,
        brand: MOCK_PARTS[0].compatible_brands[0] || 'Phụ kiện',
        name: MOCK_PARTS[0].name,
        image: MOCK_PARTS[0].image,
        price: MOCK_PARTS[0].price,
        original_price: null,
        stock_status: "in_stock",
        rating: 5.0,
        reviews_count: 24,
        badge_type: "best_seller"
    },
    {
        id: "wl_2",
        product_id: MOCK_PARTS[1].id,
        brand: MOCK_PARTS[1].compatible_brands[0] || 'Phụ kiện',
        name: MOCK_PARTS[1].name,
        image: MOCK_PARTS[1].image,
        price: MOCK_PARTS[1].price,
        original_price: 15000000,
        stock_status: "in_stock",
        rating: 5.0,
        reviews_count: 18,
        badge_type: "sale"
    },
    {
        id: "wl_3",
        product_id: MOCK_PARTS[2].id,
        brand: MOCK_PARTS[2].compatible_brands[0] || 'Phụ kiện',
        name: MOCK_PARTS[2].name,
        image: MOCK_PARTS[2].image,
        price: MOCK_PARTS[2].price,
        original_price: null,
        stock_status: "pre_order",
        rating: 4.8,
        reviews_count: 12,
        badge_type: "new_arrival"
    },
    {
        id: "wl_4",
        product_id: MOCK_PARTS[3].id,
        brand: MOCK_PARTS[3].compatible_brands[0] || 'Phụ kiện',
        name: MOCK_PARTS[3].name,
        image: MOCK_PARTS[3].image,
        price: MOCK_PARTS[3].price,
        original_price: null,
        stock_status: "out_of_stock",
        rating: 4.9,
        reviews_count: 32,
        badge_type: null
    }
];
