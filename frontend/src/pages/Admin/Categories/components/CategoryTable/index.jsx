import React from 'react';
import { Table, Skeleton, Empty } from 'antd';
import { getCategoryColumns } from '../../constants/categoryColumns';

export const CategoryTable = ({ categories, isLoading, handleEdit, handleDelete, t }) => {
    const columns = getCategoryColumns(t, handleEdit, handleDelete);

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-[#141416] rounded-2xl border border-slate-200 dark:border-white/5 relative overflow-hidden shadow-sm p-8">
                <Skeleton active paragraph={{ rows: 6 }} />
            </div>
        );
    }

    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl border border-slate-200 dark:border-white/5 relative overflow-hidden shadow-sm">
            <div className="relative z-10 w-full overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={categories}
                    rowKey={(record) => record._id || record.id}
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total, range) => (
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                                {t('showing', 'Hiển thị')} <strong className="text-slate-800 dark:text-white mx-1">{range[0]}-{range[1]}</strong> / <strong className="text-slate-800 dark:text-white mx-1">{total}</strong>
                            </span>
                        ),
                        className: '!px-6 py-4 !text-xs !font-bold !uppercase !tracking-widest !text-slate-500 custom-pagination border-t border-slate-100 dark:border-white/5'
                    }}
                    rowClassName={() => "group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"}
                    className="
                    custom-dark-table w-full 
                    [&_.ant-table]:!bg-transparent 

                    /* Header Base */
                    [&_.ant-table-thead_th]:!bg-slate-50 
                    dark:[&_.ant-table-thead_th]:!bg-[#141416] 
                    [&_.ant-table-thead_th]:!text-slate-500 
                    [&_.ant-table-thead_th]:!font-bold 
                    [&_.ant-table-thead_th]:!uppercase 
                    [&_.ant-table-thead_th]:!text-xs 
                    [&_.ant-table-thead_th]:!px-6
                    
                    /* Header Hover & Sorter */
                    [&_.ant-table-thead>tr>th:hover]:!bg-slate-100 
                    dark:[&_.ant-table-thead>tr>th:hover]:!bg-white/[0.04]
                    [&_.ant-table-column-sort]:!bg-slate-100
                    dark:[&_.ant-table-column-sort]:!bg-white/[0.04]
                    dark:[&_.ant-table-column-sorter-inner]:text-slate-500
                    dark:[&_.ant-table-column-sorter-up.active]:text-yellow-500
                    dark:[&_.ant-table-column-sorter-down.active]:text-yellow-500
                "
                    locale={{
                        emptyText: <Empty description={false} className="py-20" />
                    }}
                />
            </div>
        </section>
    );
};
