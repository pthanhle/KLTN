import { useState, useMemo } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import { message } from 'antd';
import { useAdminBrandsMutations } from '../../../../services/queries/brandQueries';

export const useBrandsTable = (brands, t) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 300);
    const [messageApi, contextHolder] = message.useMessage();
    const { deleteBrand, isDeleting } = useAdminBrandsMutations();

    const filteredBrands = useMemo(() => {
        if (!debouncedSearch) return brands;
        const lower = debouncedSearch.toLowerCase();
        return brands.filter(b => 
            b.name.toLowerCase().includes(lower) || 
            b.id.toLowerCase().includes(lower)
        );
    }, [brands, debouncedSearch]);

    const handleSearch = (value) => setSearchTerm(value);

    const handleDeleteBrand = async (brandId, count) => {
        if (count > 0) {
            messageApi.error(t('adminBrands:errDeleteLock', 'KHÔNG THỂ XÓA: Hãng này đang chứa {{count}} tài sản!', { count }));
            return;
        }
        try {
            await deleteBrand(brandId);
            messageApi.success(t('adminBrands:msgDeleteSuccess', 'Đã xóa thương hiệu thành công.'));
        } catch (error) {
            messageApi.error(error.response?.data?.message || 'Có lỗi xảy ra khi xóa thương hiệu');
        }
    };

    return {
        filteredBrands,
        searchTerm,
        handleSearch,
        handleDeleteBrand,
        messageApi,
        contextHolder,
        isDeleting
    };
};
