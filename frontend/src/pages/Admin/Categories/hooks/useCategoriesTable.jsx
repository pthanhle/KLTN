import { useState, useMemo } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import { message } from 'antd';
import React from 'react';
import { CategoryAPI } from '../../../../services/api/category';

export const useCategoriesTable = (categories, reloadCategories, t) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 300);
    const [messageApi, contextHolder] = message.useMessage();

    const filteredCategories = useMemo(() => {
        if (!debouncedSearch.trim()) return categories;
        const lowerSearch = debouncedSearch.toLowerCase();
        return categories.filter(category => 
            (category.category_name || '').toLowerCase().includes(lowerSearch) ||
            (category._id || '').toLowerCase().includes(lowerSearch)
        );
    }, [categories, debouncedSearch]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleDeleteCategory = async (record) => {
        if (record.count > 0) {
            messageApi.error(t('adminCategories:errDeleteLock', { count: record.count, defaultValue: `KHÔNG THỂ XÓA: Danh mục này đang chứa ${record.count} xe!` }));
            return;
        }

        try {
            await CategoryAPI.deleteAdminCategory(record._id);
            messageApi.success(t('common:deleteSuccess', 'Đã xóa thành công'));
            reloadCategories();
        } catch (error) {
            messageApi.error(error.response?.data?.message || 'Có lỗi xảy ra khi xóa danh mục');
        }
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
