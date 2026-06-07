import React from 'react';
import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { getLedgerColumns } from '../../constants/ledgerColumns';
import { formatCurrency } from '../../utils/formatters';

const LedgerTable = ({ items, summary }) => {
    const { t } = useTranslation('adminRODetail');
    const columns = getLedgerColumns(t);

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
                <Table 
                    columns={columns} 
                    dataSource={items} 
                    rowKey={(record) => record.id || record.name}
                    pagination={false}
                    size="small"
                    className="
                        custom-dark-table w-full 
                        [&_.ant-table]:!bg-transparent 

                        /* Header Base */
                        [&_.ant-table-thead>tr>th]:!bg-slate-50 
                        dark:[&_.ant-table-thead>tr>th]:!bg-[#1a1a1c]
                        [&_.ant-table-thead>tr>th]:!border-b 
                        [&_.ant-table-thead>tr>th]:!border-slate-200 
                        dark:[&_.ant-table-thead>tr>th]:!border-white/10 
                        [&_.ant-table-thead>tr>th]:!text-[10px]
                        [&_.ant-table-thead>tr>th]:!uppercase
                        [&_.ant-table-thead>tr>th]:!tracking-widest
                        [&_.ant-table-thead>tr>th]:!text-slate-500
                        dark:[&_.ant-table-thead>tr>th]:!text-[#d3c5ac]

                        /* Body Rows */
                        [&_.ant-table-tbody>tr>td]:!border-b 
                        [&_.ant-table-tbody>tr>td]:!border-slate-100 
                        dark:[&_.ant-table-tbody>tr>td]:!border-white/5 
                        hover:[&_.ant-table-tbody>tr]:!bg-slate-50 
                        dark:hover:[&_.ant-table-tbody>tr]:!bg-white/[0.02]

                        [&_.ant-table-thead>tr>th:first-child]:!pl-4
                        [&_.ant-table-tbody>tr>td:first-child]:!pl-4
                        [&_.ant-table-thead>tr>th:last-child]:!pr-4
                        [&_.ant-table-tbody>tr>td:last-child]:!pr-4
                    "
                    rowClassName="group transition-colors duration-300"
                />
            </div>
            
            {/* Totals Area */}
            <div className="p-4 md:p-5 bg-slate-50 dark:bg-[#1a1a1c] border-t border-slate-200 dark:border-white/10 flex flex-wrap justify-end gap-6 md:gap-10 items-end">
                <div className="text-right">
                    <span className="text-[10px] text-slate-500 dark:text-[#d3c5ac] uppercase tracking-widest block mb-1 font-semibold">{t('ledger_tax', 'Thuế VAT (10%)')}</span>
                    <span className="text-sm text-slate-700 dark:text-[#dce1fb] font-mono">
                        {formatCurrency(summary?.vat_amount)}
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] text-amber-500 uppercase tracking-widest block mb-1 font-semibold">{t('ledger_grand_total', 'Tổng cộng')}</span>
                    <span className="text-2xl md:text-3xl font-bold text-amber-500 font-mono leading-none">
                        {formatCurrency(summary?.grand_total)}
                    </span>
                </div>
                {summary?.deposit_amount > 0 && (
                    <div className="w-full border-t border-slate-200 dark:border-white/10 pt-3 mt-1 flex flex-wrap justify-end gap-6 md:gap-10">
                        <div className="text-right">
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-1 font-semibold">{t('ledger_deposit_paid', 'Đã đặt cọc')}</span>
                            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                                {formatCurrency(summary?.deposit_amount)}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] text-rose-500 uppercase tracking-widest block mb-1 font-semibold">{t('ledger_remaining', 'Còn lại')}</span>
                            <span className="text-xl font-bold text-rose-500 font-mono">
                                {formatCurrency(summary?.remaining_amount)}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LedgerTable;
