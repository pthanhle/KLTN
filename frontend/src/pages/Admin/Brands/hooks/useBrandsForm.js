import { useState } from 'react';
import { useAdminBrandsMutations } from '../../../../services/queries/brandQueries';

export const useBrandsForm = (messageApi, t) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);
    const { createBrand, updateBrand, isCreating, isUpdating } = useAdminBrandsMutations();

    const handleAddBrand = () => {
        setEditingBrand(null);
        setIsModalOpen(true);
    };

    const handleEditBrand = (brand) => {
        setEditingBrand(brand);
        setIsModalOpen(true);
    };

    const handleSaveBrand = async (values) => {
        try {
            if (editingBrand) {
                await updateBrand({ id: editingBrand.id, data: values });
                messageApi.success(t('adminBrands:msgUpdateSuccess', 'Cập nhật thương hiệu thành công!'));
            } else {
                await createBrand(values);
                messageApi.success(t('adminBrands:msgCreateSuccess', 'Thêm mới thương hiệu thành công!'));
            }
            setIsModalOpen(false);
        } catch (error) {
            messageApi.error(error.response?.data?.message || 'Có lỗi xảy ra khi lưu thương hiệu');
        }
    };

    return {
        isModalOpen,
        setIsModalOpen,
        editingBrand,
        handleAddBrand,
        handleEditBrand,
        handleSaveBrand,
        isSaving: isCreating || isUpdating
    };
};
