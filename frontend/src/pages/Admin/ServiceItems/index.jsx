import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from './components/PageHeader';
import Toolbar from './components/Toolbar';
import ServiceItemsTable from './components/Table';
import { useServiceItemsLogic } from './hooks/useServiceItemsLogic';

const ServiceItemsAdmin = () => {

    const { t } = useTranslation('adminServiceItems');

    const {
        searchTerm, setSearchTerm,
        selectedCategory, setSelectedCategory,
        selectedPriceType, setSelectedPriceType,
        currentPage, setCurrentPage,
        pageSize,
        categoryOptions, priceOptions,
        items, totalItems, isLoading
    } = useServiceItemsLogic();

    return (
        <div className="w-full flex justify-center pb-20 pt-4 md:pt-6">
            <div className="w-full max-w-[1400px]">
                <PageHeader t={t} />

                <Toolbar
                    searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                    selectedPriceType={selectedPriceType} setSelectedPriceType={setSelectedPriceType}
                    categoryOptions={categoryOptions}
                    priceOptions={priceOptions}
                    t={t}
                />

                <ServiceItemsTable
                    items={items}
                    isLoading={isLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    t={t}
                />
            </div>
        </div>
    );
};

export default ServiceItemsAdmin;
