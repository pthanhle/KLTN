import { Helmet } from 'react-helmet-async';
import { Download, RefreshCw, BarChart3, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useRevenueReportLogic } from './hooks/useRevenueReportLogic';
import { FilterBar } from './components/Filters/FilterBar';
import { SummaryCards } from './components/Cards/SummaryCards';
import { RevenueTrendChart } from './components/Charts/RevenueTrendChart';
import { OrderAnalysisChart } from './components/Charts/OrderAnalysisChart';
import { OrderStatusDonut } from './components/Charts/OrderStatusDonut';
import { TopProductsChart } from './components/Charts/TopProductsChart';
import { RevenueDataTable } from './components/Tables/RevenueDataTable';
import { RevenueReportSkeleton } from './components/Skeletons/RevenueReportSkeleton';
import PageBreadcrumbs from '../../../components/PageBreadcrumbs';

const AdminRevenueReport = () => {
    const { t } = useTranslation('adminRevenueReport');
    const {
        period, setPeriod,
        dateRange, setDateRange,
        selectedYear, setSelectedYear,
        data, isLoading, isFetching, isError, error,
        refetch, handleExport,
    } = useRevenueReportLogic();

    return (
        <div className="w-full flex justify-center pb-24 pt-4 md:pt-6 animate-in fade-in duration-500">
            <Helmet>
                <title>{t('Báo cáo doanh thu')} | TT AUTO</title>
            </Helmet>

            <div className="w-full max-w-[1400px] relative z-10 px-4 sm:px-6 lg:px-8 space-y-6">

                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between w-full">
                    <div>
                        <PageBreadcrumbs items={[{ label: t('Báo cáo doanh thu') }]} />
                        <h1 className="text-3xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                            {t('Báo cáo doanh thu')}
                        </h1>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0 w-full md:w-auto">
                        <button
                            onClick={() => refetch()}
                            disabled={isFetching}
                            className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-white dark:bg-[#141416] hover:bg-slate-50 dark:hover:bg-[#1e1e20] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-full font-black text-[11px] tracking-widest uppercase active:scale-95 transition-all outline-none cursor-pointer disabled:opacity-60"
                        >
                            <RefreshCw size={16} strokeWidth={2.5} className={isFetching ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} />
                            {t('Làm mới')}
                        </button>
                        <button
                            onClick={handleExport}
                            disabled={!data || isLoading}
                            className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-white dark:text-slate-900 rounded-full font-black text-[11px] tracking-widest uppercase shadow-xl shadow-slate-900/20 dark:shadow-yellow-500/20 active:scale-95 transition-all outline-none cursor-pointer disabled:opacity-60 disabled:bg-slate-400"
                        >
                            <Download size={16} strokeWidth={2.5} className="group-hover:-translate-y-1 transition-transform duration-300" />
                            {t('Xuất Excel')}
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#141416] p-4 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-sm">
                    <FilterBar
                        period={period}
                        onPeriodChange={setPeriod}
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                        selectedYear={selectedYear}
                        onYearChange={setSelectedYear}
                    />
                </div>

                {isLoading && (
                    <div className="py-6">
                        <RevenueReportSkeleton />
                    </div>
                )}

                {!isLoading && isError && (
                    <div className="flex flex-col items-center justify-center gap-4 py-24 bg-white dark:bg-[#141416] rounded-3xl border border-slate-200/60 dark:border-white/5">
                        <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-2xl">
                            <AlertCircle size={32} className="text-red-500" />
                        </div>
                        <div className="text-center">
                            <p className="text-base font-bold text-slate-800 dark:text-white mb-1">{t('Không thể tải dữ liệu')}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {error?.response?.data?.message || error?.message || t('Đã xảy ra lỗi khi kết nối với máy chủ')}
                            </p>
                        </div>
                        <button
                            onClick={() => refetch()}
                            className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-semibold transition-all"
                        >
                            <RefreshCw size={14} />
                            {t('Thử lại')}
                        </button>
                    </div>
                )}

                {!isLoading && !isError && data && (
                    <>
                        <SummaryCards summary={data.summary} />

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            <div className="xl:col-span-2">
                                <RevenueTrendChart timeSeries={data.timeSeries} period={period} />
                            </div>
                            <div className="xl:col-span-1">
                                <OrderStatusDonut distribution={data.orderStatusDistribution} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            <OrderAnalysisChart timeSeries={data.timeSeries} period={period} />
                            <TopProductsChart topProducts={data.topProducts} />
                        </div>

                        <RevenueDataTable timeSeries={data.timeSeries} />
                    </>
                )}

                {!isLoading && !isError && !data && (
                    <div className="flex flex-col items-center justify-center gap-3 py-24 bg-white dark:bg-[#141416] rounded-3xl border border-slate-200/60 dark:border-white/5">
                        <BarChart3 size={40} className="text-slate-300 dark:text-slate-600" />
                        <p className="text-sm font-medium text-slate-400 dark:text-slate-500">{t('Không có dữ liệu cho kỳ đã chọn')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminRevenueReport;
