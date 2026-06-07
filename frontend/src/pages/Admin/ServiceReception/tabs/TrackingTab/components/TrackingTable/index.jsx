import React from 'react';
import { Table } from 'antd';
import { getColumns } from './Columns';

const TrackingTable = ({ 
    t, 
    isLoading, 
    paginatedData, 
    currentPage, 
    setCurrentPage, 
    pageSize,
    setPageSize,
    totalResults,
    onCustomerClick
}) => {
    const columns = getColumns(t, onCustomerClick);

    const getRowClassName = (record) => {
        const isCritical = record.diagnostic_status === 'critical';
        const isWaiting = record.quotation_status === 'WAITING_FOR_APPROVAL';
        
        let highlightClass = 'group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer';
        if (isCritical || isWaiting) {
            highlightClass = 'bg-yellow-50/50 dark:bg-yellow-500/5 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-colors group cursor-pointer relative';
        }
        return highlightClass;
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#141416] rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden relative">
            <div className="overflow-x-auto overflow-y-auto w-full relative z-10 flex-1">
                <Table 
                    columns={columns}
                    dataSource={paginatedData}
                    rowKey="id"
                    loading={isLoading}
                    scroll={{ x: 'max-content' }}
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: totalResults,
                        onChange: (page, size) => {
                            setCurrentPage(page);
                            if (size !== pageSize) setPageSize(size);
                        },
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '50'],
                        showTotal: (total, range) => (
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                                {t('tracking_showing', 'Đang hiển thị')} <strong className="text-slate-800 dark:text-white mx-1">{range[0]}-{range[1]}</strong> {t('tracking_of', 'trên')} <strong className="text-slate-800 dark:text-white mx-1">{total}</strong> {t('tracking_results', 'kết quả')}
                            </span>
                        ),
                        className: '!px-6 py-4 !text-xs !font-bold !uppercase !tracking-widest !text-slate-500 custom-pagination border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#141416] m-0',
                    }}
                    rowClassName={getRowClassName}
                    onRow={(record) => ({
                        onClick: () => {
                            if (onCustomerClick) {
                                onCustomerClick(record.id);
                            }
                        }
                    })}
                    className="custom-admin-table h-full flex flex-col"
                />
            </div>
        </div>
    );
};

export default TrackingTable;
