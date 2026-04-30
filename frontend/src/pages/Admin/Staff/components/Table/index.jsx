import React from 'react';
import { Table } from 'antd';
import { getColumns } from './Columns';

export const StaffTable = ({ data, isLoading, t, navigate, paginationInfo, onChange }) => {
    const columns = getColumns(t, navigate);

    return (
        <div className="bg-white dark:bg-[#141416] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/20 dark:shadow-none">
            <div className="overflow-x-auto w-full">
                <Table 
                    columns={columns}
                    dataSource={data}
                    rowKey="_id"
                    loading={isLoading}
                    scroll={{ x: 'max-content' }}
                    onChange={onChange}
                    pagination={{
                        current: paginationInfo?.current || 1,
                        pageSize: paginationInfo?.pageSize || 10,
                        total: paginationInfo?.total || 0,
                        showSizeChanger: true,
                        showTotal: (total, range) => (
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                                {t('common:showing', 'Hiển thị')} <strong className="text-slate-800 dark:text-white mx-1">{range[0]}-{range[1]}</strong> / <strong className="text-slate-800 dark:text-white mx-1">{total}</strong>
                            </span>
                        )
                    }}
                    rowClassName={() => "group/row transition-colors cursor-pointer"}
                    className="
                        custom-dark-table w-full 
                        [&_.ant-table]:!bg-transparent 
                        
                        /* Header Base */
                        [&_.ant-table-thead>tr>th]:!bg-slate-50 
                        dark:[&_.ant-table-thead>tr>th]:!bg-[#141416]
                        [&_.ant-table-thead>tr>th]:!border-b 
                        [&_.ant-table-thead>tr>th]:!border-slate-200 
                        dark:[&_.ant-table-thead>tr>th]:!border-white/5 
                        
                        /* Header Hover & Sorter */
                        [&_.ant-table-thead>tr>th:hover]:!bg-slate-100 
                        dark:[&_.ant-table-thead>tr>th:hover]:!bg-white/[0.04]
                        [&_.ant-table-column-sort]:!bg-slate-100
                        dark:[&_.ant-table-column-sort]:!bg-white/[0.04]
                        dark:[&_.ant-table-column-sorter-inner]:text-slate-500
                        dark:[&_.ant-table-column-sorter-up.active]:text-yellow-500
                        dark:[&_.ant-table-column-sorter-down.active]:text-yellow-500

                        /* Body Rows */
                        [&_.ant-table-tbody>tr>td]:!border-b 
                        [&_.ant-table-tbody>tr>td]:!border-slate-100 
                        dark:[&_.ant-table-tbody>tr>td]:!border-white/5 
                        hover:[&_.ant-table-tbody>tr]:!bg-slate-50 
                        dark:hover:[&_.ant-table-tbody>tr]:!bg-white/[0.02]

                        /* Padding Adjustments */
                        [&_.ant-table-thead>tr>th:first-child]:!pl-8
                        [&_.ant-table-tbody>tr>td:first-child]:!pl-8
                        [&_.ant-table-thead>tr>th:last-child]:!pr-8
                        [&_.ant-table-tbody>tr>td:last-child]:!pr-8

                        /* Pagination */
                        [&_.ant-table-pagination]:!m-0
                        [&_.ant-table-pagination]:!px-8
                        [&_.ant-table-pagination]:!py-6
                        [&_.ant-table-pagination]:!border-t
                        [&_.ant-table-pagination]:!border-slate-200
                        dark:[&_.ant-table-pagination]:!border-white/5
                    "
                />
            </div>
        </div>
    );
};