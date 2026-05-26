import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { PageLoader } from '@/components/ui/page-loader';
import PageBreadcrumbs from '../../../components/PageBreadcrumbs';
import { getOrderColumns } from './constants/tableColumns';
import { useOrderListLogic } from './hooks/useOrderListLogic';
import FilterBar from './components/Toolbar/FilterBar';
import OrderTable from './components/Table/OrderTable';

const AdminOrdersPageContent = () => {
    const {
        t,
        filterStatus,
        handleStatusChange,
        filterPayment,
        handlePaymentChange,
        searchText,
        handleSearch,
        data,
        badges,
        pagination,
        handleTableChange,
        loading,
        filterDateRange,
        handleDateRangeChange
    } = useOrderListLogic();

    const columns = getOrderColumns(t);

    return (
        <div className="w-full flex justify-center pb-20 pt-4 md:pt-6 animate-in fade-in duration-500">
            <Helmet>
                <title>{t('title_orders', 'Quản Lý Đơn Hàng')} | TT AUTO</title>
            </Helmet>

            <div className="w-full max-w-[1400px] relative z-10 px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between w-full">
                    <div>
                        <PageBreadcrumbs items={[{ label: t('title_orders', 'Quản Lý Đơn Hàng') }]} />
                        <h1 className="text-3xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                            {t('title_orders', 'Quản Lý Đơn Hàng')}
                        </h1>
                    </div>
                </div>

                <FilterBar
                    searchText={searchText}
                    onSearch={handleSearch}
                    filterStatus={filterStatus}
                    setFilterStatus={handleStatusChange}
                    filterPayment={filterPayment}
                    setFilterPayment={handlePaymentChange}
                    filterDateRange={filterDateRange}
                    setFilterDateRange={handleDateRangeChange}
                    t={t}
                />

                <OrderTable
                    data={data}
                    columns={columns}
                    pagination={pagination}
                    onChange={handleTableChange}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export const AdminOrdersPage = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <AdminOrdersPageContent />
        </Suspense>
    );
};

export default AdminOrdersPage;
