import React from 'react';
import { formatCurrency } from '../utils/formatters';

export const getLedgerColumns = (t) => [
    {
        title: t('col_type', 'Type'),
        dataIndex: 'type',
        key: 'type',
        width: '15%',
        render: (type) => {
            const isLabor = type === 'labor';
            const typeCode = isLabor ? 'LBR' : 'PRT';
            return (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block w-max
                    ${isLabor ? 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-500/10' : 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-500/10'}
                `}>
                    {t(`type_${typeCode}`, typeCode)}
                </span>
            );
        }
    },
    {
        title: t('col_desc', 'Description'),
        dataIndex: 'name',
        key: 'name',
        width: '50%',
        render: (name) => (
            <span className="text-sm font-medium text-slate-800 dark:text-[#dce1fb] truncate group-hover:text-amber-500 transition-colors">
                {name}
            </span>
        )
    },
    {
        title: t('col_qty', 'Qty/Hrs'),
        dataIndex: 'quantity',
        key: 'quantity',
        width: '15%',
        align: 'right',
        render: (quantity) => (
            <span className="text-sm text-slate-500 dark:text-[#d3c5ac] font-mono">{quantity}</span>
        )
    },
    {
        title: t('col_ext_total', 'Ext. Total'),
        dataIndex: 'total_price',
        key: 'total_price',
        width: '20%',
        align: 'right',
        render: (price) => (
            <span className="text-sm font-semibold text-slate-700 dark:text-[#dce1fb] font-mono">
                {formatCurrency(price)}
            </span>
        )
    }
];
