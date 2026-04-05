import React from 'react';
import { Table } from 'antd';
import { getBrandColumns } from '../../constants/brandColumns';

export const BrandTable = ({ data, isLoading, onEdit, onDelete, t }) => {
    const columns = getBrandColumns(t, onEdit, onDelete);

    return (
        <div className="bg-white dark:bg-[#141416] rounded-2xl border border-slate-200 dark:border-white/5 relative overflow-hidden shadow-sm">
            <div className="relative z-10 w-full overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    loading={isLoading}
                    pagination={{
                        pageSize: 5,
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} brands`,
                        className: '!px-6 py-4 !text-xs !font-bold !uppercase !tracking-widest !text-slate-500 custom-pagination border-t border-slate-100 dark:border-white/5'
                    }}
                    rowClassName={() => "group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"}
                    className="custom-dark-table w-full [&_.ant-table-thead_th]:!bg-slate-50 dark:[&_.ant-table-thead_th]:!bg-[#191f31] [&_.ant-table-thead_th]:!text-slate-500 [&_.ant-table-thead_th]:!font-bold [&_.ant-table-thead_th]:!uppercase [&_.ant-table-thead_th]:!text-xs [&_.ant-table-thead_th]:!px-6"
                />
            </div>
        </div>
    );
};
