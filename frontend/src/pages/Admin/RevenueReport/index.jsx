import { Helmet } from 'react-helmet-async';
import { Download, RefreshCw, BarChart3, AlertCircle, Loader2 } from 'lucide-react';
import { useRevenueReportLogic } from './hooks/useRevenueReportLogic';
import { FilterBar } from './components/FilterBar';
import { SummaryCards } from './components/SummaryCards';
import { RevenueTrendChart } from './components/RevenueTrendChart';
import { OrderAnalysisChart } from './components/OrderAnalysisChart';
import { OrderStatusDonut } from './components/OrderStatusDonut';
import { TopProductsChart } from './components/TopProductsChart';
import { RevenueDataTable } from './components/RevenueDataTable';

const AdminRevenueReport = () => {
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
                <title>Báo Cáo Doanh Thu | TT AUTO</title>
            </Helmet>

            <div className="w-full max-w-[1400px] relative z-10 px-4 sm:px-6 lg:px-8 space-y-6">

                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl">
                            <BarChart3 size={24} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                                Báo cáo doanh thu
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                Phân tích chi tiết doanh thu và hiệu suất kinh doanh
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => refetch()}
                            disabled={isFetching}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm disabled:opacity-60"
                        >
                            <RefreshCw size={15} className={isFetching ? 'animate-spin' : ''} />
                            Làm mới
                        </button>
                        <button
                            onClick={handleExport}
                            disabled={!data || isLoading}
                            className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-2xl text-sm font-semibold transition-all shadow-sm"
                        >
                            <Download size={15} />
                            Xuất Excel
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
                    <div className="flex flex-col items-center justify-center gap-4 py-32">
                        <Loader2 size={40} className="animate-spin text-indigo-500" />
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Đang tải dữ liệu...</p>
                    </div>
                )}

                {!isLoading && isError && (
                    <div className="flex flex-col items-center justify-center gap-4 py-24 bg-white dark:bg-[#141416] rounded-3xl border border-slate-200/60 dark:border-white/5">
                        <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-2xl">
                            <AlertCircle size={32} className="text-red-500" />
                        </div>
                        <div className="text-center">
                            <p className="text-base font-bold text-slate-800 dark:text-white mb-1">Không thể tải dữ liệu</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {error?.response?.data?.message || error?.message || 'Đã xảy ra lỗi khi kết nối với máy chủ'}
                            </p>
                        </div>
                        <button
                            onClick={() => refetch()}
                            className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-semibold transition-all"
                        >
                            <RefreshCw size={14} />
                            Thử lại
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
                        <p className="text-sm font-medium text-slate-400 dark:text-slate-500">Không có dữ liệu cho kỳ đã chọn</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminRevenueReport;
