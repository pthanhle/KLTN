import { useState } from 'react';
import { Modal } from 'antd';

export const useBulkActions = (messageApi, t, bulkDeleteParts) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleBulkDeleteClick = () => {
        if (selectedRowKeys.length === 0) return;
        setIsDeleteModalOpen(true);
    };

    const confirmBulkDelete = async () => {
        try {
            await bulkDeleteParts(selectedRowKeys);
            messageApi.success(t('adminParts:bulkDeleteSuccess', { count: selectedRowKeys.length }));
            setSelectedRowKeys([]);
            setIsDeleteModalOpen(false);
        } catch (error) {
            // Error is handled in the mutation hook
        }
    };

    const handleBulkHide = () => {
        if (selectedRowKeys.length === 0) return;
        messageApi.success(`Đã ẩn ${selectedRowKeys.length} linh kiện (Mock)`);
        setSelectedRowKeys([]);
    };

    return {
        selectedRowKeys,
        rowSelection,
        handleBulkDeleteClick,
        confirmBulkDelete,
        handleBulkHide,
        isDeleteModalOpen,
        setIsDeleteModalOpen
    };
};
