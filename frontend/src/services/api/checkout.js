export const CheckoutAPI = {
    // API GET - Lấy danh sách sản phẩm trong giỏ hàng
    getCartItems: async () => {
        await new Promise(resolve => setTimeout(resolve, 500)); // Giả lập ping
        // Hiện tại trả về từ mock data, sau này thay bằng axios.get('/cart')
        return []; 
    },

    // API POST - Nộp đơn hàng
    submitOrder: async (payload) => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('[API Global Service] => Đã gửi Order:', payload);
        return {
            status: 200,
            success: true,
            data: payload
        };
    },

    // API POST - Chuyển sang danh sách yêu thích
    moveToWishlist: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return { success: true };
    },

    // API VERIFY - Áp dụng mã giảm giá
    applyPromoCode: async (code) => {
        await new Promise(resolve => setTimeout(resolve, 600));
        return { valid: true, discount: 10 }; // Giả định Giảm 10%
    },

    // API GET - Lấy thông tin tài khoản người dùng đổ vào Form
    getUserProfile: async () => {
        await new Promise(resolve => setTimeout(resolve, 400));
        // Đáng lẽ import từ file data, nhưng mình mock trực tiếp ở API layer để render hook
        return {
            full_name: 'Nguyễn Văn Định',
            phone: '0901234567',
            email: 'dinh.nguyen.sv@gmail.com',
            city: 'hcm',
            district: 'q7',
            address: '123 Đường Nam Kỳ Khởi Nghĩa, Phường 3'
        };
    }
};
