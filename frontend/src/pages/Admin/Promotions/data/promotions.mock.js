import { DISCOUNT_TYPES, PROMOTION_STATUS } from '../constants/promotions.constants';

export const mockPromotionsData = [
    {
        _id: '1',
        title: 'Summer Sale 2024',
        description: 'Giảm giá dầu nhớt cho mùa hè',
        discount_type: DISCOUNT_TYPES.PERCENT,
        discount_value: 20,
        max_discount: 100000,
        is_loyalty: false,
        points_required: 0,
        validity_days: 0,
        code: 'SUMMER2024',
        min_order_value: 500000,
        start_date: '2024-06-01',
        end_date: '2024-08-31',
        status: PROMOTION_STATUS.ACTIVE,
        claimed_count: 345,
        used_count: 120
    },
    {
        _id: '2',
        title: 'Khách Hàng Thân Thiết',
        description: 'Voucher thay nhớt miễn phí',
        discount_type: DISCOUNT_TYPES.FREE_SHIPPING,
        discount_value: 0,
        is_loyalty: true,
        points_required: 5000,
        validity_days: 30,
        code: null,
        min_order_value: 0,
        start_date: '2024-01-01',
        end_date: '2024-12-31',
        status: PROMOTION_STATUS.ACTIVE,
        claimed_count: 89,
        used_count: 45
    },
    {
        _id: '3',
        title: 'Black Friday Phụ Tùng',
        description: 'Giảm giá cố định phụ tùng gầm',
        discount_type: DISCOUNT_TYPES.FIXED,
        discount_value: 500000,
        is_loyalty: false,
        points_required: 0,
        validity_days: 0,
        code: 'BFPARTS',
        min_order_value: 2000000,
        start_date: '2024-11-20',
        end_date: '2024-11-30',
        status: PROMOTION_STATUS.INACTIVE,
        claimed_count: 0,
        used_count: 0
    },
    {
        _id: '4',
        title: 'Ưu đãi Rửa Xe VIP',
        description: 'Dành cho hạng thành viên Platinum',
        discount_type: DISCOUNT_TYPES.PERCENT,
        discount_value: 50,
        max_discount: 150000,
        is_loyalty: true,
        points_required: 2500,
        validity_days: 7,
        code: null,
        min_order_value: 0,
        start_date: '2024-01-01',
        end_date: '2099-12-31',
        status: PROMOTION_STATUS.ACTIVE,
        claimed_count: 420,
        used_count: 380
    },
    {
        _id: '5',
        title: 'Tân Trang Nội Thất',
        description: 'Khuyến mãi gói chăm sóc xe toàn diện',
        discount_type: DISCOUNT_TYPES.FIXED,
        discount_value: 2000000,
        is_loyalty: false,
        points_required: 0,
        validity_days: 0,
        code: 'INTERIOR2024',
        min_order_value: 10000000,
        start_date: '2024-08-01',
        end_date: '2024-09-15',
        status: PROMOTION_STATUS.ACTIVE,
        claimed_count: 15,
        used_count: 5
    }
];

export const mockPromotionsStats = {
    active_campaigns: 24,
    total_claimed: 1240,
    points_burned: 450000
};
