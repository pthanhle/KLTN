import { useState, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { useRevenueAnalytics } from '@/services/queries/adminDashboard.queries';

const buildXLSContent = (data, period) => {
    const { summary, timeSeries, topProducts } = data;
    const fmt = (n) => Math.round(n).toLocaleString('vi-VN');
    const periodLabel = { day: 'Ngày', week: 'Tuần', month: 'Tháng', year: 'Năm' }[period] || 'Kỳ';

    const timeRows = timeSeries
        .map((item) => {
            const label = item.weekStart ? `${item.label} (${item.weekStart})` : item.label;
            const avg = item.orderCount > 0 ? fmt(Math.round(item.revenue / item.orderCount)) : '0';
            return `<tr><td>${label}</td><td style="text-align:right">${fmt(item.revenue)}</td><td style="text-align:right">${item.orderCount}</td><td style="text-align:right">${avg}</td></tr>`;
        })
        .join('');

    const productRows = topProducts
        .map((p) => `<tr><td>${p.name}</td><td style="text-align:right">${p.totalSold}</td><td style="text-align:right">${fmt(p.totalRevenue)}</td></tr>`)
        .join('');

    return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"></head>
<body>
<h2 style="color:#4f46e5;font-family:Arial">BÁO CÁO DOANH THU - TT AUTO</h2>
<p style="font-family:Arial;color:#64748b">Xuất ngày: ${dayjs().format('DD/MM/YYYY HH:mm')} | Lọc theo: ${periodLabel}</p>
<br>
<h3 style="font-family:Arial;color:#1e293b">TỔNG QUAN</h3>
<table border="1" style="border-collapse:collapse;font-family:Arial;font-size:13px">
<tr style="background:#e0e7ff;font-weight:bold"><td style="padding:6px 12px">Chỉ số</td><td style="padding:6px 12px">Giá trị</td></tr>
<tr><td style="padding:5px 12px">Tổng doanh thu</td><td style="padding:5px 12px;text-align:right">${fmt(summary.totalRevenue)} VNĐ</td></tr>
<tr><td style="padding:5px 12px">Tổng đơn trong kỳ</td><td style="padding:5px 12px;text-align:right">${summary.totalOrders}</td></tr>
<tr><td style="padding:5px 12px">Đơn hoàn thành</td><td style="padding:5px 12px;text-align:right">${summary.completedOrders}</td></tr>
<tr><td style="padding:5px 12px">Đơn đã hủy</td><td style="padding:5px 12px;text-align:right">${summary.cancelledOrders}</td></tr>
<tr><td style="padding:5px 12px">Giá trị trung bình/đơn</td><td style="padding:5px 12px;text-align:right">${fmt(summary.avgOrderValue)} VNĐ</td></tr>
<tr><td style="padding:5px 12px">Tỉ lệ hoàn thành</td><td style="padding:5px 12px;text-align:right">${summary.completionRate}%</td></tr>
</table>
<br>
<h3 style="font-family:Arial;color:#1e293b">CHI TIẾT THEO ${periodLabel.toUpperCase()}</h3>
<table border="1" style="border-collapse:collapse;font-family:Arial;font-size:13px">
<tr style="background:#e0e7ff;font-weight:bold">
<td style="padding:6px 12px">${periodLabel}</td>
<td style="padding:6px 12px">Doanh thu (VNĐ)</td>
<td style="padding:6px 12px">Số đơn</td>
<td style="padding:6px 12px">Trung bình/đơn (VNĐ)</td>
</tr>
${timeRows}
</table>
<br>
<h3 style="font-family:Arial;color:#1e293b">TOP SẢN PHẨM BÁN CHẠY</h3>
<table border="1" style="border-collapse:collapse;font-family:Arial;font-size:13px">
<tr style="background:#e0e7ff;font-weight:bold">
<td style="padding:6px 12px">Sản phẩm</td>
<td style="padding:6px 12px">Số lượng bán</td>
<td style="padding:6px 12px">Doanh thu (VNĐ)</td>
</tr>
${productRows}
</table>
</body></html>`;
};

export const useRevenueReportLogic = () => {
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
        const html = buildXLSContent(data, period);
        const blob = new Blob(['﻿' + html], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bao-cao-doanh-thu-theo-${periodSlug}-${dayjs().format('YYYYMMDD')}.xls`;
        a.click();
        URL.revokeObjectURL(url);
    }, [data, period]);

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
