import { useState, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useRevenueAnalytics } from '@/services/queries/adminDashboard.queries';
import { buildXLSContent } from '../utils/exportExcel';

export const useRevenueReportLogic = () => {
    const { t } = useTranslation('adminRevenueReport');
    const [period, setPeriod] = useState('month');
    const [dateRange, setDateRange] = useState(null);
    const [selectedYear, setSelectedYear] = useState(dayjs().year());

    const params = useMemo(() => {
        const p = { period };
        if (period === 'month') {
            p.year = selectedYear;
        } else if ((period === 'day' || period === 'week') && dateRange) {
            p.startDate = dateRange[0].format('YYYY-MM-DD');
            p.endDate = dateRange[1].format('YYYY-MM-DD');
        }
        return p;
    }, [period, selectedYear, dateRange]);

    const { data, isLoading, isFetching, isError, error, refetch } = useRevenueAnalytics(params);

    const handlePeriodChange = useCallback((newPeriod) => {
        setPeriod(newPeriod);
        setDateRange(null);
    }, []);

    const handleExport = useCallback(() => {
        if (!data) return;
        const periodSlug = { day: 'ngay', week: 'tuan', month: 'thang', year: 'nam' }[period] || period;
        const html = buildXLSContent(data, period, t);
        const blob = new Blob(['\uFEFF' + html], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bao-cao-doanh-thu-theo-${periodSlug}-${dayjs().format('YYYYMMDD')}.xls`;
        a.click();
        URL.revokeObjectURL(url);
    }, [data, period, t]);

    return {
        period,
        setPeriod: handlePeriodChange,
        dateRange,
        setDateRange,
        selectedYear,
        setSelectedYear,
        data,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
        handleExport,
    };
};
