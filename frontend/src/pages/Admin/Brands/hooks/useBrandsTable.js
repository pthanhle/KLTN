import { useState, useMemo } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import { message } from 'antd';

export const useBrandsTable = (brands, setBrands, t) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 300);
    const [messageApi, contextHolder] = message.useMessage();

    const filteredBrands = useMemo(() => {
        if (!debouncedSearch) return brands;
        const lower = debouncedSearch.toLowerCase();
        return brands.filter(b => 
            b.name.toLowerCase().includes(lower) || 
            b.id.toLowerCase().includes(lower)
        );
    }, [brands, debouncedSearch]);

    const handleSearch = (value) => setSearchTerm(value);

    const handleDeleteBrand = (brandId, count) => {
        if (count > 0) {
            messageApi.error(t('adminBrands:errDeleteLock', 'KHÔNG THỂ XÓA: Hãng này đang chứa {{count}} tài sản!', { count }));
            return;
        }
        setBrands(prev => prev.filter(b => b.id !== brandId));
        messageApi.success(t('adminBrands:msgDeleteSuccess', 'Đã xóa thương hiệu thành công.'));
    };

    return {
        filteredBrands,
        searchTerm,
        handleSearch,
        handleDeleteBrand,
        messageApi,
        contextHolder
    };
};
