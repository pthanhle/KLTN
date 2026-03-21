import axiosClient from '../../utils/axiosClient';

/**
 * Thư mục API Tập trung (Centralized Services Architect)
 * Nơi chứa toàn bộ khai báo Endpoint và Call Server cho phần Category (như Brands)
 */
export const CategoryAPI = {
    // API GET - Lấy danh sách category (brands)
    getCategoryList: async (params = {}) => {
        try {
            const { page = 1, limit = 12, search = '' } = params;
            // Endpoint là /client/categories do axiosClient đã cấu hình baseURL là /api
            const response = await axiosClient.get('/client/categories', {
                params: {
                    current: page,
                    pageSize: limit,
                    search: search
                }
            });
            return response;
        } catch (error) {
            console.error('[CategoryAPI] Error fetching categories:', error);
            throw error;
        }
    }
};
