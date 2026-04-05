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
                rowKey="id"
                pagination={{
                    pageSize: 8,
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
                    className: '!px-6 py-4 !text-xs !font-bold !uppercase !tracking-widest !text-slate-500 custom-pagination border-t border-slate-100 dark:border-white/5'
                }}
                rowClassName={() => "group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"}
                className="custom-dark-table w-full [&_.ant-table-thead_th]:!bg-slate-50 dark:[&_.ant-table-thead_th]:!bg-[#191f31] [&_.ant-table-thead_th]:!text-slate-500 [&_.ant-table-thead_th]:!font-bold [&_.ant-table-thead_th]:!uppercase [&_.ant-table-thead_th]:!text-xs [&_.ant-table-thead_th]:!px-6"
                locale={{
                    emptyText: <Empty description={false} className="py-20" />
                }}
            />
            </div>
        </section>
    );
};
