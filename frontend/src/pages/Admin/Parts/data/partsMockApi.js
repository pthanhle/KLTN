import { MOCK_PARTS, MOCK_CATEGORIES, MOCK_BRANDS } from '../../../Customer/Parts/data/parts.mock';

/**
 * ĐÂY LÀ FAKE API ADAPTER CHO MÔI TRƯỜNG DEV.
 * Sau này khi có API Backend (Axios), chúng ta chỉ cần sửa URL trong này.
 */

// Giả lập DB Memory
let partsDatabase = MOCK_PARTS.map((p, idx) => ({
    ...p,
    is_best_seller: idx % 3 === 0
}));

export const partsApi = {
    getAllParts: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...partsDatabase]);
            }, 600); // Giả lập độ trễ mạng
        });
    },

    getFiltersData: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    categories: MOCK_CATEGORIES.filter(c => c.id !== 'all').map(c => c.id),
                    brands: MOCK_BRANDS.map(b => b.name)
                });
            }, 300);
        });
    },

    getPartById: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const part = partsDatabase.find(p => p.id === id);
                if (part) resolve({...part});
                else reject(new Error('Khu vực 404: Không tìm thấy linh kiện'));
            }, 400);
        });
    },

    createPart: async (payload) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newPart = { ...payload, id: `NEW-${Date.now()}` };
                partsDatabase.push(newPart);
                resolve(newPart);
            }, 600);
        });
    },

    updatePart: async (id, payload) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = partsDatabase.findIndex(p => p.id === id);
                if (index !== -1) {
                    partsDatabase[index] = { ...partsDatabase[index], ...payload };
                    resolve(partsDatabase[index]);
                } else {
                    reject(new Error('Khu vực 404: Không tìm thấy linh kiện'));
                }
            }, 600);
        });
    },

    deletePart: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = partsDatabase.findIndex(p => p.id === id);
                if (index !== -1) {
                    partsDatabase.splice(index, 1);
                    resolve({ success: true, id });
                } else {
                    reject(new Error('Khu vực 500: Lỗi không tìm thấy Linh Kiện!'));
                }
            }, 400);
        });
    }
};
