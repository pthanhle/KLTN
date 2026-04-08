
import { MOCK_PARTS } from '../../Parts/data/parts.mock';

export const mockCartItems = [
    {
        id: '1',
        product_id: MOCK_PARTS[0].id,
        name: MOCK_PARTS[0].name,
        sku: MOCK_PARTS[0].sku,
        price: MOCK_PARTS[0].price,
        original_price: null,
        condition: 'New',
        stock: MOCK_PARTS[0].stock,
        quantity: 1,
        image: MOCK_PARTS[0].image,
        checked: true
    },
    {
        id: '2',
        product_id: MOCK_PARTS[1].id,
        name: MOCK_PARTS[1].name,
        sku: MOCK_PARTS[1].sku,
        price: MOCK_PARTS[1].price,
        original_price: 15000000,
        condition: 'New',
        stock: MOCK_PARTS[1].stock,
        quantity: 4,
        image: MOCK_PARTS[1].image,
        checked: true
    },
    {
        id: '3',
        product_id: MOCK_PARTS[5].id,
        name: MOCK_PARTS[5].name,
        sku: MOCK_PARTS[5].sku,
        price: MOCK_PARTS[5].price,
        original_price: null,
        condition: 'New',
        stock: MOCK_PARTS[5].stock,
        quantity: 2,
        image: MOCK_PARTS[5].image,
        checked: false
    }
];
export const mockBuyNowItem = {
    id: 'buy-now-temp-1',
    product_id: '1',
    name: 'Mâm đúc TT GranTurismo S-Line Forged 19"',
    sku: 'TT-GT-2026',
    price: 1425000000,
    original_price: 150000000,
    condition: 'New',
    stock: 50,
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqJuZNEJ9ixm4s602FjI0pYKc2EI0-vpxn7j0Dhk1s1Prn1UJ1D1NmNu3VptI1Vm8SzozrDfw8OzhDj7k5Epp2ovgDdW_dg8wpsBmSZYC0h3SrMQztXyNKUXGCYJc_vMrg4kIWtWaq0wtvGtZxFC2gyLqCtSIVRY6V3Q2Eo_y_r9i0Ve6T2Ur5cffm1X3dD5VHSvJQDpUhopAkUCUGzHo4GzVMEgQ22aUke52doCz0bDWEWF0AndMIWcMSBI-ghf3dzbpYamVK3MU',
    checked: true
};



export const mockShippingMethods = [
    { id: 'economy', label: 'Tiết kiệm', desc: '5-7 ngày làm việc', price: 0, priceLabel: 'Miễn phí' },
    { id: 'express', label: 'Hỏa tốc (2-4h)', desc: 'Nhận ngay trong ngày', price: 50000, priceLabel: '50.000 đ' },
    { id: 'standard', label: 'Tiêu chuẩn', desc: '2-3 ngày làm việc', price: 15000, priceLabel: '15.000 đ' },
];

export const mockPaymentMethods = [
    { id: 'credit_card', label: 'Thẻ tín dụng (Visa/Mastercard)', tags: ['VISA', 'MC'] },
    { id: 'bank_transfer', label: 'Chuyển khoản ngân hàng', tags: [] },
    { id: 'vnpay', label: 'Ví điện tử VNPay (QR)', tags: [] },
    { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)', tags: [] },
];


