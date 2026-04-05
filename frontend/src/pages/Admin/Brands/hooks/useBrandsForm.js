import { useState } from 'react';

export const useBrandsForm = (setBrands, messageApi, t) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);

    const handleAddBrand = () => {
        setEditingBrand(null);
        setIsModalOpen(true);
    };

    const handleEditBrand = (brand) => {
        setEditingBrand(brand);
        setIsModalOpen(true);
    };

    const handleSaveBrand = (values) => {
        if (editingBrand) {
            setBrands(prev => prev.map(b => b.id === editingBrand.id ? { ...b, ...values } : b));
            messageApi.success(t('adminBrands:msgUpdateSuccess', 'Cập nhật thương hiệu thành công!'));
        } else {
            const newBrand = { ...values, count: 0 };
            setBrands(prev => [newBrand, ...prev]);
            messageApi.success(t('adminBrands:msgCreateSuccess', 'Thêm mới thương hiệu thành công!'));
        }
        setIsModalOpen(false);
    };

    return {
        isModalOpen,
        setIsModalOpen,
        editingBrand,
        handleAddBrand,
        handleEditBrand,
        handleSaveBrand
    };
};
