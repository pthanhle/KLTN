import React from 'react';
import { Table } from 'antd';
import { getColumns } from './Columns';

const ServiceItemsTable = ({ items, isLoading, currentPage, setCurrentPage, pageSize, totalItems, t }) => {
    const columns = getColumns(t);

    return (
        <div className="bg-white dark:bg-[#141416] rounded-2xl border border-slate-200 dark:border-white/5 relative overflow-hidden shadow-sm">
            <div className="overflow-x-auto w-full relative z-10">
                <Table 
                columns={columns}
                dataSource={items}
                rowKey="_id"
                loading={isLoading}
                scroll={{ x: 'max-content' }}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: totalItems,
                    onChange: (page) => setCurrentPage(page),
                    showSizeChanger: false,
                    className: '!px-6 py-4 !text-xs !font-bold !uppercase !tracking-widest !text-slate-500 custom-pagination border-t border-slate-100 dark:border-white/5',
                }}
                rowClassName={() => "group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"}
                className="custom-admin-table"
            />
            </div>
        </div>
    );
};

export default ServiceItemsTable;
