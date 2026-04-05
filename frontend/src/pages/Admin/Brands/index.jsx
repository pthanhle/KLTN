import React from 'react';
import { useTranslation } from 'react-i18next';
import { useBrandsLogic } from './hooks/useBrandsLogic';
import { BrandHeader } from './components/BrandHeader';
import { BrandToolbar } from './components/BrandToolbar';
import { BrandTable } from './components/BrandTable';
import { BrandStats } from './components/BrandStats';
import { BrandFormModal } from './components/BrandFormModal';
import { Skeleton } from 'antd';

const AdminBrandsIndex = () => {
    const { t } = useTranslation();
    const {
        brands,
        isLoading,
        stats,
        isModalOpen,
        editingBrand,
        searchTerm,
        contextHolder,
        handleSearch,
        handleAddBrand,
        handleEditBrand,
        handleDeleteBrand,
        handleSaveBrand,
        setIsModalOpen
    } = useBrandsLogic(t);

    return (
        <div className="w-full flex justify-center pb-20 pt-4 md:pt-6">
            {contextHolder}
            <div className="w-full max-w-[1400px]">

                <BrandHeader t={t} onAddBrand={handleAddBrand} />

                <BrandStats stats={stats} t={t} />

                <BrandToolbar 
                    searchTerm={searchTerm}
                    onSearch={handleSearch}
                    t={t}
                />

                {isLoading && brands.length === 0 ? (
                    <div className="bg-white dark:bg-[#141416] p-6 rounded-2xl w-full h-[400px] border border-slate-200 dark:border-white/5 shadow-sm">
                        <Skeleton active paragraph={{ rows: 6 }} />
                    </div>
                ) : (
                    <BrandTable
                        data={brands}
                        isLoading={isLoading}
                        onEdit={handleEditBrand}
                        onDelete={handleDeleteBrand}
                        t={t}
                    />
                )}

                <BrandFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveBrand}
                    editingData={editingBrand}
                    t={t}
                />

            </div>
        </div>
    );
};

export default AdminBrandsIndex;
