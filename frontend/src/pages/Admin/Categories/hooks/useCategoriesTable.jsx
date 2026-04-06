import { useState, useMemo } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import { message } from 'antd';
import React from 'react';

export const useCategoriesTable = (categories, setCategories, t) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 300);
    const [messageApi, contextHolder] = message.useMessage();

    const filteredCategories = useMemo(() => {
        if (!debouncedSearch.trim()) return categories;
        const lowerSearch = debouncedSearch.toLowerCase();
        return categories.filter(category => 
            category.name.toLowerCase().includes(lowerSearch) ||
            category.id.toLowerCase().includes(lowerSearch)
        );
    }, [categories, debouncedSearch]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleDeleteCategory = (record) => {
        if (record.count > 0) {
            messageApi.error(t('adminCategories:errDeleteLock', { count: record.count, defaultValue: `KHÔNG THỂ XÓA: Danh mục này đang chứa ${record.count} xe!` }));
            return;
        }

        // Thực sự xóa (đã được confirm qua Popconfirm ở UI)
        setCategories(prev => prev.filter(c => c.id !== record.id));
        messageApi.success(t('common:deleteSuccess', 'Đã xóa thành công'));
    };

    return {
        filteredCategories,
        searchTerm,
        handleSearch,
        handleDeleteCategory,
        messageApi,
        contextHolder
    };
};
