import React from 'react';
import { Table } from 'antd';
import { getPartColumns } from '../../constants/partColumns';

const PartTable = ({ parts, loading, paginationInfo, onChange, onEdit, onDelete, t, rowSelection }) => {
    const columns = getPartColumns(t, onEdit, onDelete);

    return (
        <div className="bg-white dark:bg-[#191f31] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/20 dark:shadow-none">
            <div className="overflow-x-auto">
                <Table 
                    columns={columns} 
                    dataSource={parts} 
                    rowKey="id"
                    loading={loading}
                    onChange={onChange}
                    pagination={{
                        current: paginationInfo?.current || 1,
                        pageSize: paginationInfo?.pageSize || 10,
                        total: paginationInfo?.total || 0,
                        showSizeChanger: true,
                        showTotal: (total, range) => (
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                                {t('adminParts:showing')} <strong className="text-slate-800 dark:text-white mx-1">{range[0]}-{range[1]}</strong> {t('adminParts:of')} <strong className="text-slate-800 dark:text-white mx-1">{total}</strong> {t('adminParts:items')}
                            </span>
                        )
                    }}
                    rowSelection={rowSelection}
                    className="
                        custom-dark-table w-full 
                        [&_.ant-table]:!bg-transparent 
                        [&_.ant-table-thead>tr>th]:!bg-slate-50 
                        dark:[&_.ant-table-thead>tr>th]:!bg-[#151b2d]/50 
                        [&_.ant-table-thead>tr>th]:!border-b 
                        [&_.ant-table-thead>tr>th]:!border-slate-200 
                        dark:[&_.ant-table-thead>tr>th]:!border-white/5 
                        [&_.ant-table-tbody>tr>td]:!border-b 
                        [&_.ant-table-tbody>tr>td]:!border-slate-100 
                        dark:[&_.ant-table-tbody>tr>td]:!border-white/5 
                        hover:[&_.ant-table-tbody>tr]:!bg-slate-50 
                        dark:hover:[&_.ant-table-tbody>tr]:!bg-white/[0.02]

                        [&_.ant-table-thead>tr>th:first-child]:!pl-8
                        [&_.ant-table-tbody>tr>td:first-child]:!pl-8
                        [&_.ant-table-thead>tr>th:last-child]:!pr-8
                        [&_.ant-table-tbody>tr>td:last-child]:!pr-8

                        [&_.ant-table-pagination]:!m-0
                        [&_.ant-table-pagination]:!px-8
                        [&_.ant-table-pagination]:!py-6
                        [&_.ant-table-pagination]:!border-t
                        [&_.ant-table-pagination]:!border-slate-200
                        dark:[&_.ant-table-pagination]:!border-white/5
                    "
                    rowClassName="group transition-colors duration-300"
                />
            </div>
        </div>
    );
};

export default PartTable;
