import React from 'react';
import DiagnosticBadge from '../Badges/DiagnosticBadge';
import QuotationBadge from '../Badges/QuotationBadge';
import StageBadge from '../Badges/StageBadge';
import { getLiveStatusText } from '../../utils/trackingUtils';

export const getColumns = (t, onCustomerClick) => [
    {
        title: t('tracking_col_ro', 'Mã RO & Giờ vào'),
        dataIndex: 'booking_code',
        key: 'booking_code',
        align: 'left',
        render: (text, record) => (
            <div className="whitespace-nowrap">
                <div className="font-bold text-slate-800 dark:text-white">{record.booking_code}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{record.time_in}</div>
            </div>
        ),
    },
    {
        title: t('tracking_col_customer', 'Khách hàng & Xe'),
        dataIndex: 'customer_name',
        key: 'customer_name',
        align: 'left',
        render: (text, record) => (
            <div className="whitespace-nowrap">
                <button className="font-bold text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors cursor-pointer text-left focus:outline-none" onClick={(e) => { e.stopPropagation(); if (onCustomerClick) onCustomerClick(record.booking_code); }}>
                    {record.customer_name}
                </button>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{record.license_plate} • {record.vehicle_model}</div>
            </div>
        ),
    },
    {
        title: t('tracking_col_diagnostic', 'Chẩn đoán'),
        dataIndex: 'diagnostic_status',
        key: 'diagnostic_status',
        align: 'center',
        render: (status) => <DiagnosticBadge status={status} t={t} />,
    },
    {
        title: t('tracking_col_quotation', 'Báo giá'),
        dataIndex: 'quotation_status',
        key: 'quotation_status',
        align: 'center',
        render: (status) => <QuotationBadge status={status} t={t} />,
    },
    {
        title: t('tracking_col_progress', 'Tình trạng chi tiết'),
        key: 'status_detail',
        align: 'left',
        render: (_, record) => {
            const statusText = getLiveStatusText(record.raw_status, record.quotation_status, record.selected_services, t);
            return (
                <div className="whitespace-nowrap flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{statusText}</span>
                </div>
            );
        },
    },
    {
        title: t('tracking_col_stage', 'Giai đoạn'),
        dataIndex: 'current_stage',
        key: 'current_stage',
        align: 'center',
        render: (stage) => (
            <div className="whitespace-nowrap flex justify-center">
                <StageBadge stage={stage} t={t} />
            </div>
        ),
    }
];
