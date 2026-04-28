import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import PriceTag from './PriceTag';
import StatusToggle from './StatusToggle';
import { formatCurrency } from '../../utils/formatters';

export const getColumns = (t) => [
    {
        title: t('adminServiceItems:col_sku', 'SKU'),
        dataIndex: 'sku',
        key: 'sku',
        width: 140,
        render: (text) => <span className="font-bold text-yellow-600 dark:text-yellow-500 tracking-wider text-[13px]">{text}</span>,
    },
    {
        title: t('adminServiceItems:col_name', 'Tên Dịch Vụ'),
        dataIndex: 'serviceName',
        key: 'serviceName',
        width: 300,
        render: (text) => <span className="font-medium text-slate-900 dark:text-white leading-snug">{text}</span>,
    },
    {
        title: t('adminServiceItems:col_category', 'Danh Mục'),
        dataIndex: 'category',
        key: 'category',
        render: (text) => (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 uppercase tracking-widest">
                {text}
            </span>
        ),
    },
    {
        title: t('adminServiceItems:col_price_type', 'Loại Giá'),
        dataIndex: 'priceType',
        key: 'priceType',
        render: (type) => <PriceTag type={type} />,
    },
    {
        title: t('adminServiceItems:col_base_price', 'Giá Cơ Bản'),
        dataIndex: 'basePrice',
        key: 'basePrice',
        align: 'right',
        width: 150,
        render: (val, record) => {
            if (record.priceType === 'CONTACT') {
                return <span className="font-medium text-slate-400 italic">N/A</span>;
            }
            return (
                <div className="text-right font-mono text-slate-900 dark:text-white font-medium">
                    {formatCurrency(val)}<br/>
                    <span className="text-[10px] text-slate-500">₫</span>
                </div>
            );
        },
    },
    {
        title: t('adminServiceItems:col_duration', 'Thời Gian'),
        dataIndex: 'estimatedDuration',
        key: 'estimatedDuration',
        align: 'center',
        width: 120,
        render: (val) => val ? <span className="text-[13px] text-slate-500 font-medium">{val} {t('adminServiceItems:minute', 'Phút')}</span> : <span className="text-slate-400">--</span>,
    },
    {
        title: t('adminServiceItems:col_status', 'Trạng Thái'),
        dataIndex: 'isActive',
        key: 'isActive',
        align: 'center',
        width: 120,
        render: (isActive) => <StatusToggle isActive={isActive} onChange={() => {}} />,
    },
    {
        title: t('adminServiceItems:col_action', 'Thao Tác'),
        key: 'action',
        align: 'right',
        fixed: 'right',
        width: 100,
        render: () => (
            <div className="flex items-center justify-end gap-1 transition-opacity">
                <button className="text-slate-400 hover:text-yellow-500 transition-colors p-1.5 cursor-pointer">
                    <Edit2 size={16} />
                </button>
                <button className="text-slate-400 hover:text-red-500 transition-colors p-1.5 cursor-pointer">
                    <Trash2 size={16} />
                </button>
            </div>
        ),
    }
];
