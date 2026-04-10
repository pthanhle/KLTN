import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCategoriesLogic } from './hooks/useCategoriesLogic';
import { CategoryHeader } from './components/CategoryHeader';
import { CategoryStats } from './components/CategoryStats';
import { CategoryToolbar } from './components/CategoryToolbar';
import { CategoryTable } from './components/CategoryTable';
import { CategoryDecorative } from './components/CategoryDecorative';
import { CategoryFormModal } from './components/CategoryFormModal';

const AdminCategoriesIndex = () => {
    const { t } = useTranslation(['adminCategories', 'common']);
    const {
        categories,
        isLoading,
        stats,
        searchTerm,
        handleSearch,
        handleDeleteCategory,
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

    const handleSaveCategory = (values) => {
        // Logic giả lập gọi API thêm sửa
        if (editingCategory) {
            // Update
            console.log('Update', values);
        } else {
            // Create
            console.log('Create', values);
        }
        setIsModalOpen(false);
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
