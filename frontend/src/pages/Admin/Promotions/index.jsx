import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageLoader } from '@/components/ui/page-loader';
import PageBreadcrumbs from '../../../components/PageBreadcrumbs';
import { usePromotionsLogic } from './hooks/usePromotionsLogic';
import PromotionsStats from './components/Stats/PromotionsStats';
import FilterBar from './components/Toolbar/FilterBar';
import PromotionsTable from './components/Table/PromotionsTable';

const AdminPromotionsContent = () => {
    const navigate = useNavigate();
    const {
        t,
        stats,
        data,
        loading,
        searchText,
        handleSearch,
        filterStatus,
        handleStatusChange,
        filterType,
        handleTypeChange,
        filterLoyalty,
        handleLoyaltyChange,
        handleToggleStatus,
        handleDelete,
        pagination,
        handleTableChange
    } = usePromotionsLogic();

    return (
        <div className="w-full flex justify-center pb-20 pt-4 md:pt-6 animate-in fade-in duration-500">
            <Helmet>
                <title>{t('title_promotions')} | TT AUTO</title>
            </Helmet>

            <div className="w-full max-w-[1400px] relative z-10 px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
                    <div>
                        <PageBreadcrumbs items={[{ label: t('breadcrumb_promotions') }]} />
                        <h1 className="text-3xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                            {t('title_promotions')}
                        </h1>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0 w-full md:w-auto">
                        <button 
                            type="button"
                            onClick={() => navigate('/admin/promotions/create')}
                            className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-slate-900 rounded-full font-bold text-sm tracking-wide shadow-xl shadow-slate-900/20 dark:shadow-yellow-500/20 active:scale-95 transition-all outline-none cursor-pointer"
                        >
                            <Plus size={16} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
                            {t('btn_add_promotion')}
                        </button>
                    </div>
                </div>

                <PromotionsStats stats={stats} t={t} />

                <FilterBar 
                    searchText={searchText}
                    handleSearch={handleSearch}
                    filterStatus={filterStatus}
                    handleStatusChange={handleStatusChange}
                    filterType={filterType}
                    handleTypeChange={handleTypeChange}
                    filterLoyalty={filterLoyalty}
                    handleLoyaltyChange={handleLoyaltyChange}
                    t={t}
                />

                <PromotionsTable 
                    data={data}
                    loading={loading}
                    handleToggleStatus={handleToggleStatus}
                    handleDelete={handleDelete}
                    handleEdit={(id) => navigate(`/admin/promotions/edit/${id}`)}
                    pagination={pagination}
                    onChange={handleTableChange}
                    t={t}
                />
            </div>
        </div>
    );
};

export const AdminPromotionsPage = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <AdminPromotionsContent />
        </Suspense>
    );
};

export default AdminPromotionsPage;
