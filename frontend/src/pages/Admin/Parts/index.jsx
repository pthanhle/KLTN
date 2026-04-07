import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import PartHeader from './components/PartHeader';
import PartStats from './components/PartStats';
import PartToolbar from './components/PartToolbar';
import PartTable from './components/PartTable';
import BulkActionBar from './components/BulkActionBar';
import BulkDeleteModal from './components/BulkDeleteModal';
import { useAdminPartsData, useAdminPartsMutations } from '../../../services/queries/adminPart.queries';
import { useBulkActions } from './hooks/useBulkActions';

const AdminPartsIndex = () => {
    const { t } = useTranslation(['adminParts', 'common']);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [categoryFilter, setCategoryFilter] = React.useState('all');
    const [brandFilter, setBrandFilter] = React.useState('all');
    const [statusFilter, setStatusFilter] = React.useState('all');

    const [tableParams, setTableParams] = React.useState({ current: 1, pageSize: 10 });

    const { parts, categories, brands, isLoadingParts, pagination, stats } = useAdminPartsData({
        search: searchTerm,
        category: categoryFilter,
        brand: brandFilter,
        status: statusFilter,
        current: tableParams.current,
        pageSize: tableParams.pageSize
    });

    const handleTableChange = (newPagination) => {
        setTableParams({
            current: newPagination.current,
            pageSize: newPagination.pageSize
        });
    };

    const { deletePart, isDeleting, bulkDeleteParts, toggleStatus, isTogglingStatus } = useAdminPartsMutations(messageApi, t);

    const {
        selectedRowKeys,
        rowSelection,
        handleBulkDeleteClick,
        confirmBulkDelete,
        handleBulkHide,
        isDeleteModalOpen,
        setIsDeleteModalOpen
    } = useBulkActions(messageApi, t, bulkDeleteParts);

    const handleEditPart = (record) => {
        navigate(`/admin/parts/edit/${record.id}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            {contextHolder}
            <PartHeader t={t} />
            <PartStats stats={stats} t={t} loading={isLoadingParts} />
            <PartToolbar
                searchTerm={searchTerm}
                onSearch={setSearchTerm}
                categoryFilter={categoryFilter}
                onCategoryFilter={setCategoryFilter}
                brandFilter={brandFilter}
                onBrandFilter={setBrandFilter}
                statusFilter={statusFilter}
                onStatusFilter={setStatusFilter}
                categories={categories}
                brands={brands}
                t={t}
            />

            <BulkActionBar
                selectedCount={selectedRowKeys.length}
                onHideBulk={handleBulkHide}
                onDeleteBulk={handleBulkDeleteClick}
                t={t}
            />

            <PartTable
                parts={parts}
                loading={isLoadingParts}
                paginationInfo={pagination}
                onChange={handleTableChange}
                onEdit={handleEditPart}
                onDelete={deletePart}
                t={t}
                rowSelection={rowSelection}
            />

            <BulkDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmBulkDelete}
                count={selectedRowKeys.length}
                t={t}
            />
        </div>
    );
};

export default AdminPartsIndex;
