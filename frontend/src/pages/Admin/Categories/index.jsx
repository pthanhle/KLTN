import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { useCategoriesLogic } from './hooks/useCategoriesLogic';
import { CategoryHeader } from './components/CategoryHeader';
import { CategoryStats } from './components/CategoryStats';
import { CategoryToolbar } from './components/CategoryToolbar';
import { CategoryTable } from './components/CategoryTable';
import { CategoryDecorative } from './components/CategoryDecorative';
import { CategoryFormModal } from './components/CategoryFormModal';
import { CategoryAPI } from '../../../services/api/category';

const AdminCategoriesIndex = () => {
    const { t } = useTranslation(['adminCategories', 'common']);
    const {
        categories,
        isLoading,
        stats,
        searchTerm,
        handleSearch,
        handleDeleteCategory,
        reloadCategories,
        contextHolder
    } = useCategoriesLogic(t);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const handleAddCategory = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleEditCategory = (record) => {
        setEditingCategory(record);
        setIsModalOpen(true);
    };

    const handleSaveCategory = async (values) => {
        try {
            const apiData = {
                category_name: values.name,
                description: values.description
            };
            if (editingCategory) {
                await CategoryAPI.updateAdminCategory(editingCategory._id, apiData);
                message.success('Cập nhật kiểu dáng thành công!');
            } else {
                await CategoryAPI.createAdminCategory(apiData);
                message.success('Thêm mới kiểu dáng thành công!');
            }
            reloadCategories();
            setIsModalOpen(false);
        } catch (error) {
            message.error(error.response?.data?.message || 'Có lỗi xảy ra khi lưu kiểu dáng!');
        }
    };

    return (
        <div className="w-full flex justify-center pb-20 pt-4 md:pt-6">
            <div className="w-full max-w-[1400px] relative z-10">
                {contextHolder}

                <CategoryHeader t={t} onAddCategory={handleAddCategory} />

                <CategoryStats
                    stats={stats}
                    isLoading={isLoading}
                    t={t}
                />

                <CategoryToolbar
                    searchTerm={searchTerm}
                    onSearch={handleSearch}
                    t={t}
                />

                <CategoryTable
                    categories={categories}
                    isLoading={isLoading}
                    handleEdit={handleEditCategory}
                    handleDelete={handleDeleteCategory}
                    t={t}
                />

                <CategoryDecorative />

                <CategoryFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveCategory}
                    editingData={editingCategory}
                    t={t}
                />

            </div>
        </div>
    );
};

export default AdminCategoriesIndex;
