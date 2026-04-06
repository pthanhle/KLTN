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
import { usePartsData } from './hooks/usePartsData';
import { usePartsMutations } from './hooks/usePartsMutations';
import { usePartsTable } from './hooks/usePartsTable';
import { useBulkActions } from './hooks/useBulkActions';

const AdminPartsIndex = () => {
    const { t } = useTranslation(['adminParts', 'common']);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    
    // Logic 1: Lấy Dữ liệu (Mock API qua TanStack)
    const { parts, categories, brands, isLoadingParts } = usePartsData();

    // Logic 2: Xử lý thao tác (Delete) với Optimistic Update
    const { deletePart, isDeleting } = usePartsMutations(messageApi, t);

    // Logic 3: Quản lý Form tìm kiếm & Lọc trên Client
    const {
        filteredParts,
        stats,
        searchTerm,
        setSearchTerm,
        categoryFilter,
        setCategoryFilter,
        brandFilter,
        setBrandFilter
    } = usePartsTable(parts);

    const {
        selectedRowKeys,
        rowSelection,
        handleBulkDeleteClick,
        confirmBulkDelete,
        handleBulkHide,
        isDeleteModalOpen,
        setIsDeleteModalOpen
    } = useBulkActions(messageApi, t);

    const handleEditPart = (record) => {
        navigate(`/admin/parts/edit/${record.id}`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
            {contextHolder}
            <PartHeader t={t} />
            <PartStats stats={stats} t={t} />
                <PartToolbar 
                    searchTerm={searchTerm}
                    onSearch={setSearchTerm}
                    categoryFilter={categoryFilter}
                    onCategoryFilter={setCategoryFilter}
                    brandFilter={brandFilter}
                    onBrandFilter={setBrandFilter}
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
                    parts={filteredParts} 
                    loading={isLoadingParts}
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
