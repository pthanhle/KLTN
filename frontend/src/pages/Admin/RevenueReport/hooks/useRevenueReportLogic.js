import { useState, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { useRevenueAnalytics } from '@/services/queries/adminDashboard.queries';

const S = {
    base: 'font-family:Arial;font-size:12px;',
    border: 'border:1px solid #e2e8f0;',
    pad: 'padding:6px 12px;',
    padSm: 'padding:5px 12px;',
    right: 'text-align:right;',
    center: 'text-align:center;',
    bold: 'font-weight:bold;',
    muted: 'color:#6b7280;',
    accent: 'color:#1d4ed8;',
    rowEven: 'background:#f9fafb;',
    thBg: 'background:#374151;color:#ffffff;font-weight:bold;',
    totalBg: 'background:#f1f5f9;font-weight:bold;',
};

const td = (content, extra = '') =>
    `<td style="${S.base}${S.border}${S.pad}${extra}">${content}</td>`;

const th = (content, extra = '') =>
    `<td style="${S.base}${S.border}${S.pad}${S.thBg}${extra}">${content}</td>`;

const gap = (cols = 6) =>
    `<tr><td colspan="${cols}" style="border:none;height:14px;padding:0"> </td></tr>`;

const sectionTitle = (text, cols = 6) =>
    `<tr><td colspan="${cols}" style="${S.base}font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.8px;padding:12px 2px 4px 2px;color:#374151;border:none;border-bottom:2px solid #374151;">${text}</td></tr>`;

const STATUS_VI = {
    PENDING: 'Chờ duyệt',
    CONFIRMED: 'Đã xác nhận',
    PROCESSING: 'Đang xử lý',
    SHIPPED: 'Đang giao',
    DELIVERED: 'Đã giao',
    COMPLETED: 'Hoàn thành',
    CANCELLED: 'Đã hủy',
};

const buildXLSContent = (data, period) => {
    const { summary, timeSeries, topProducts, orderStatusDistribution } = data;
    const fmt = (n) => Math.round(n).toLocaleString('vi-VN');
    const pctOf = (n, total) => (total > 0 ? ((n / total) * 100).toFixed(1) + '%' : '—');
    const periodLabel = { day: 'Ngày', week: 'Tuần', month: 'Tháng', year: 'Năm' }[period] || 'Kỳ';
    const totalRev = summary.totalRevenue || 0;
    const now = dayjs().format('DD/MM/YYYY HH:mm');

    const timeRows = timeSeries.map((item, i) => {
        const label = item.weekEnd ? `${item.label} – ${item.weekEnd}` : item.label;
        const avg = item.orderCount > 0 ? fmt(Math.round(item.revenue / item.orderCount)) : '0';
        const share = pctOf(item.revenue, totalRev);
        const even = i % 2 === 1 ? S.rowEven : '';
        const revStyle = item.revenue > 0 ? S.accent + S.bold : S.muted;
        return `<tr>
            ${td(label, even)}
            ${td(fmt(item.revenue), S.right + even + revStyle)}
            ${td(item.orderCount, S.right + even)}
            ${td(avg, S.right + even)}
            ${td(share, S.right + even)}
        </tr>`;
    }).join('');

    const totalAvg = summary.completedOrders > 0 ? fmt(Math.round(totalRev / summary.completedOrders)) : '—';
    const totalsRow = `<tr style="${S.totalBg}">
        ${td('TỔNG CỘNG', S.bold)}
        ${td(fmt(totalRev), S.right + S.bold + S.accent)}
        ${td(summary.completedOrders, S.right + S.bold)}
        ${td(totalAvg, S.right + S.bold)}
        ${td('100%', S.right + S.bold)}
    </tr>`;

    const statusOrder = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'COMPLETED', 'CANCELLED'];
    const totalStatusCount = Object.values(orderStatusDistribution || {}).reduce((s, v) => s + v, 0);
    const statusRows = statusOrder
        .filter((k) => orderStatusDistribution?.[k] != null)
        .map((k, i) => {
            const count = orderStatusDistribution[k] || 0;
            const even = i % 2 === 1 ? S.rowEven : '';
            return `<tr>
                ${td(STATUS_VI[k] || k, even)}
                ${td(count, S.right + S.bold + even)}
                ${td(pctOf(count, totalStatusCount), S.right + even)}
                <td style="border:none"> </td>
            </tr>`;
        }).join('');

    const productRows = (topProducts || []).map((p, i) => {
        const even = i % 2 === 1 ? S.rowEven : '';
        return `<tr>
            ${td(i + 1, S.center + S.bold + even)}
            ${td(p.name || 'Không xác định', even)}
            ${td(p.totalSold, S.right + even)}
            ${td(fmt(p.totalRevenue), S.right + S.bold + S.accent + even)}
            ${td(pctOf(p.totalRevenue, totalRev), S.right + even)}
        </tr>`;
    }).join('') || `<tr>${td('Không có dữ liệu', S.muted + 'font-style:italic;')}${td('')}${td('')}${td('')}${td('')}</tr>`;

    return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"></head>
<body>
<table style="width:680px;border-collapse:collapse;">

<tr>
<td colspan="5" style="background:#1e293b;padding:14px 16px;font-family:Arial;font-size:16px;font-weight:bold;color:#ffffff;border:none;">
BÁO CÁO DOANH THU — TT AUTO
</td>
</tr>
<tr>
<td colspan="5" style="background:#334155;padding:6px 16px;font-family:Arial;font-size:11px;color:#94a3b8;border:none;">
Xuất ngày: ${now}&nbsp;&nbsp;|&nbsp;&nbsp;Kỳ báo cáo: ${periodLabel}
</td>
</tr>

${gap(5)}

${sectionTitle('I. Tổng quan', 5)}
<tr>
${th('Chỉ số', 'width:220px')}
${th('Giá trị', 'width:180px;' + S.right)}
<td colspan="3" style="border:none"> </td>
</tr>
<tr>${td('Tổng doanh thu')}${td(`${fmt(summary.totalRevenue)} VNĐ`, S.right + S.bold + S.accent)}<td colspan="3" style="border:none"> </td></tr>
<tr>${td('Tổng đơn hàng trong kỳ', S.rowEven)}${td(summary.totalOrders, S.right + S.rowEven)}<td colspan="3" style="border:none"> </td></tr>
<tr>${td('Đơn hoàn thành')}${td(`${summary.completedOrders} đơn (${summary.completionRate}%)`, S.right)}<td colspan="3" style="border:none"> </td></tr>
<tr>${td('Đơn đã hủy', S.rowEven)}${td(summary.cancelledOrders, S.right + S.rowEven)}<td colspan="3" style="border:none"> </td></tr>
<tr>${td('Giá trị trung bình/đơn')}${td(`${fmt(summary.avgOrderValue)} VNĐ`, S.right)}<td colspan="3" style="border:none"> </td></tr>

${gap(5)}

${sectionTitle(`II. Chi tiết theo ${periodLabel}`, 5)}
<tr>
${th(periodLabel, 'width:140px')}
${th('Doanh thu (VNĐ)', 'width:160px;' + S.right)}
${th('Số đơn HT', 'width:90px;' + S.right)}
${th('TB/đơn (VNĐ)', 'width:140px;' + S.right)}
${th('% Tổng DT', 'width:90px;' + S.right)}
</tr>
${timeRows}
${totalsRow}

${gap(5)}

${sectionTitle('III. Phân bố trạng thái đơn hàng', 5)}
<tr>
${th('Trạng thái', 'width:200px')}
${th('Số đơn', 'width:90px;' + S.right)}
${th('Tỉ lệ', 'width:90px;' + S.right)}
<td colspan="2" style="border:none"> </td>
</tr>
${statusRows}

${gap(5)}

${sectionTitle('IV. Top 5 sản phẩm bán chạy', 5)}
<tr>
${th('#', 'width:40px;' + S.center)}
${th('Tên sản phẩm', 'width:240px')}
${th('Số lượng bán', 'width:100px;' + S.right)}
${th('Doanh thu (VNĐ)', 'width:140px;' + S.right)}
${th('% Tổng DT', 'width:90px;' + S.right)}
</tr>
${productRows}

${gap(5)}
<tr>
<td colspan="5" style="font-family:Arial;font-size:10px;color:#9ca3af;padding:4px 2px;border:none;border-top:1px solid #e2e8f0;">
Tài liệu nội bộ — TT AUTO &nbsp;|&nbsp; Tạo tự động ${now}
</td>
</tr>

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
