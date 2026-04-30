import { useState, useMemo } from 'react';
import { useAdminServiceItemsQuery, useAdminServiceItemsMutations } from '../../../../services/queries/serviceItemQueries';
import { useAdminServiceCategoriesQuery } from '../../../../services/queries/serviceCategoryQueries';
import { PRICE_TYPE_OPTIONS } from '../constants/serviceItems.constants';
import { message } from 'antd';

export const useServiceItemsLogic = (t) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceType, setSelectedPriceType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const [messageApi, contextHolder] = message.useMessage();

    const queryParams = {
        page: currentPage,
        limit: pageSize,
        search: searchTerm,
        category: selectedCategory,
        priceType: selectedPriceType
    };

    const { data: serviceItemsData, isLoading: isItemsLoading } = useAdminServiceItemsQuery(queryParams);
    const { data: categoriesData, isLoading: isCategoriesLoading } = useAdminServiceCategoriesQuery();

    const { createServiceItem, updateServiceItem, deleteServiceItem, toggleStatus, isCreating, isUpdating } = useAdminServiceItemsMutations();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const handleOpenModal = (item = null) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSaveItem = async (data) => {
        try {
            if (editingItem) {
                await updateServiceItem({ id: editingItem._id, data });
                messageApi.success('Cập nhật dịch vụ thành công!');
            } else {
                await createServiceItem(data);
                messageApi.success('Thêm mới dịch vụ thành công!');
            }
            handleCloseModal();
        } catch (error) {
            messageApi.error(error.response?.data?.message || 'Có lỗi xảy ra khi lưu dịch vụ');
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await deleteServiceItem(id);
            messageApi.success('Xóa dịch vụ thành công!');
        } catch (error) {
            messageApi.error(error.response?.data?.message || 'Có lỗi xảy ra khi xóa dịch vụ');
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await toggleStatus(id);
            messageApi.success('Đổi trạng thái thành công!');
        } catch (error) {
            messageApi.error(error.response?.data?.message || 'Có lỗi xảy ra khi đổi trạng thái');
        }
    };

    const isLoading = isItemsLoading || isCategoriesLoading || isCreating || isUpdating;
    const items = serviceItemsData?.serviceItems || [];
    const totalItems = serviceItemsData?.pagination?.total || 0;

    const categoryOptions = useMemo(() => {
        if (!categoriesData) return [];
        return categoriesData.map(cat => ({
            value: cat._id,
            label: cat.name
        }));
    }, [categoriesData]);

    return {
        // State
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedPriceType,
        setSelectedPriceType,
        currentPage,
        setCurrentPage,
        pageSize,
        categoryOptions,
        priceOptions: PRICE_TYPE_OPTIONS.map(opt => ({
            ...opt,
            label: t(`adminServiceItems:${opt.tKey}`, opt.label)
        })),
        items,
        totalItems,
        isLoading,
        isModalOpen,
        editingItem,
        contextHolder,
        handleOpenModal,
        handleCloseModal,
        handleSaveItem,
        handleDeleteItem,
        handleToggleStatus
    };
};