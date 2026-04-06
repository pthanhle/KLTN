import { useState } from 'react';
import { Modal } from 'antd';

export const useBulkActions = (messageApi, t) => {
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

    const confirmBulkDelete = () => {
        // TODO: Replace with real API mutator
        messageApi.success(t('adminParts:bulkDeleteSuccess', { count: selectedRowKeys.length }));
        setSelectedRowKeys([]);
        setIsDeleteModalOpen(false);
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
