import { MOCK_PARTS } from '@/pages/Customer/Parts/data/parts.mock';
import { DUMMY_CARS } from '@/pages/Customer/Cars/data/cars.mock';

/**
 * Lấy toàn bộ thông tin sản phẩm (Xe / Phụ tùng) để Fake API Response
 * Khi tích hợp API thật, hàm này sẽ được thay thế bằng lệnh call API GET /products/:id
 */
export const getFullProductDetails = (productId) => {
    // Tìm trong danh sách phụ tùng (Parts)
    const part = MOCK_PARTS.find(p => p.id === productId);
    if (part) return { sku: part.sku, stock: part.stock, condition: 'New' };
    
    // Tìm trong danh sách xe (Cars)
    const car = DUMMY_CARS.find(c => c.id === productId || `c_${c.id}` === productId);
    if (car) return { sku: car.sku, stock: car.stock, condition: car.isNew ? 'New' : 'Used' };

    // Fallback nếu không tìm thấy
    return { sku: 'UNKNOWN', stock: 1, condition: 'New' };
};
