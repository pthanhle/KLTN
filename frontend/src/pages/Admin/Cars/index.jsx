import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'antd';
import { Plus, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageBreadcrumbs from '../../../components/PageBreadcrumbs';
import { useCarsCatalogLogic } from './hooks/useCarsCatalogLogic';
import CarsStats from './components/Stats/CarsStats';
import FilterBar from './components/Toolbar/FilterBar';
import CarsTable from './components/Table/CarsTable';
import BulkActionBar from './components/Actions/BulkActionBar';
import CostEstimateSettingsModal from './components/CostEstimateSettingsModal';

const CarsCatalog = () => {
    const { t } = useTranslation('adminCars');
    const navigate = useNavigate();
    const [costEstimateModalOpen, setCostEstimateModalOpen] = useState(false);

    const {
        cars,
        globalStats,
        searchTerm, setSearchTerm,
        filterBrand, setFilterBrand,
        filterBodyStyle, setFilterBodyStyle,
        filterStatus, setFilterStatus,
        selectedKeys,
        toggleSelection,
        toggleAllSelections,
        handleToggleDemo,
        handleToggleFeatured,
        isLoading,
        brands,
        bodyStyles,
        isLoadingTaxonomies
    } = useCarsCatalogLogic();

    return (
        <div className="w-full flex justify-center pb-20 pt-4 md:pt-6">
            <div className="w-full max-w-[1400px] relative z-10">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between w-full">
                    <div>
                        <PageBreadcrumbs items={[{ label: t('inventoryTitle', 'Kho Xe') }]} />
                        {isLoadingTaxonomies ? (
                            <Skeleton active paragraph={{ rows: 1, width: '40%' }} title={{ width: 300 }} className="mt-4" />
                        ) : (
                            <h1 className="text-3xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                                {t('inventoryTitle', 'Quản Lý Kho Xe')}
                            </h1>
                        )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0 w-full md:w-auto">
                        <button
                            type="button"
                            onClick={() => setCostEstimateModalOpen(true)}
                            className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-[#141416] hover:bg-slate-50 dark:hover:bg-[#1e1e20] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-full font-black text-[11px] tracking-widest uppercase active:scale-95 transition-all outline-none cursor-pointer"
                        >
                            <Settings size={16} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
                            DỰ TOÁN CHI PHÍ
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/cars/create')}
                            className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-slate-900 rounded-full font-black text-[11px] tracking-widest uppercase shadow-xl shadow-slate-900/20 dark:shadow-yellow-500/20 active:scale-95 transition-all outline-none cursor-pointer"
                        >
                            <Plus size={16} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
                            {t('addNewBtn', 'THÊM XE MỚI')}
                        </button>
                    </div>
                </div>

                <CarsStats stats={globalStats} isLoading={isLoading} />

            {/* Filters Skeleton vs Real */}
            {isLoadingTaxonomies ? (
                <div className="bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/5 p-6 rounded-2xl mb-10 shadow-sm">
                    <Skeleton.Input active block className="h-12 rounded-3xl" />
                </div>
            ) : (
                <FilterBar
                    brands={brands} bodyStyles={bodyStyles}
                    searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                    filterBrand={filterBrand} setFilterBrand={setFilterBrand}
                    filterBodyStyle={filterBodyStyle} setFilterBodyStyle={setFilterBodyStyle}
                    filterStatus={filterStatus} setFilterStatus={setFilterStatus}
                />
            )}

            {/* Data Table */}
            <CarsTable
                loading={isLoading}
                cars={cars}
                selectedKeys={selectedKeys}
                toggleSelection={toggleSelection}
                toggleAllSelections={toggleAllSelections}
                handleToggleDemo={handleToggleDemo}
                handleToggleFeatured={handleToggleFeatured}
            />

            {/* Floating Action Bar */}
            <BulkActionBar
                selectedKeys={selectedKeys}
                toggleAllSelections={toggleAllSelections}
            />

            <CostEstimateSettingsModal
                open={costEstimateModalOpen}
                onClose={() => setCostEstimateModalOpen(false)}
            />
            </div>
        </div>
    );
};

export default CarsCatalog;