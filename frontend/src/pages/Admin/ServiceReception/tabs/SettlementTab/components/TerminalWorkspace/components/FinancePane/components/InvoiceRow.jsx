import React from 'react';
import { formatCurrency } from '../../../../../utils/settlementUtils';

export const InvoiceRow = ({ item }) => {
    return (
        <div className="flex justify-between text-sm items-center py-1">
            <span className="flex-1 font-medium text-slate-800 dark:text-slate-200 truncate pr-4">
                {item.name}
            </span>
            <span className="w-16 text-right text-slate-500 dark:text-slate-400 font-medium">
                {item.quantity}
            </span>
            <span className="w-28 text-right font-mono text-slate-700 dark:text-slate-300">
                {formatCurrency(item.unit_price)}
            </span>
            <span className="w-32 text-right font-mono font-medium text-slate-900 dark:text-white">
                {formatCurrency(item.total_price)}
            </span>
        </div>
    );
};
