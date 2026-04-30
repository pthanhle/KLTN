import React from 'react';
import { useTranslation } from 'react-i18next';
import { useServiceItemsLogic } from './hooks/useServiceItemsLogic';
import PageHeader from './components/PageHeader';
import Toolbar from './components/Toolbar';
import ServiceItemsTable from './components/Table';
import ServiceItemFormModal from './components/ServiceItemFormModal';
import { Skeleton } from 'antd';

const ServiceItemsAdmin = () => {
    const { t } = useTranslation(['adminServiceItems', 'common']);
    const {
        items,
        isLoading,
        currentPage,
        setCurrentPage,
        pageSize,
        totalItems,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedPriceType,
        setSelectedPriceType,
        categoryOptions,
        priceOptions,
        isModalOpen,
        editingItem,
        contextHolder,
        handleOpenModal,
        handleCloseModal,
        handleSaveItem,
        handleDeleteItem,
        handleToggleStatus
    } = useServiceItemsLogic(t);

    return (
        <div className="flex-1 w-full flex flex-col pt-4 md:pt-6 pb-20 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto min-h-screen">
            {contextHolder}
            <PageHeader t={t} onAddClick={() => handleOpenModal(null)} />

            <Toolbar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedPriceType={selectedPriceType}
                setSelectedPriceType={setSelectedPriceType}
                categoryOptions={categoryOptions}
                priceOptions={priceOptions}
                t={t}
            />

            {isLoading && items.length === 0 ? (
                <div className="bg-white dark:bg-[#141416] p-6 rounded-2xl w-full h-[400px] border border-slate-200 dark:border-white/5 shadow-sm mt-4">
                    <Skeleton active paragraph={{ rows: 6 }} />
                </div>
            ) : (
                <ServiceItemsTable 
                    items={items}
                    isLoading={isLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    onEdit={handleOpenModal}
                    onDelete={handleDeleteItem}
                    onToggleStatus={handleToggleStatus}
                    t={t}
                />
            )}

            <ServiceItemFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveItem}
                editingItem={editingItem}
                categoryOptions={categoryOptions}
                t={t}
            />
        </div>
    );
};

export default ServiceItemsAdmin;
