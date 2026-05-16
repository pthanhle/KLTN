import React from 'react';
import { Table, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { checkOverdueSLA } from '../../utils/formatters';

export const OrderTable = ({ data, columns, pagination, onChange, loading }) => {
    const navigate = useNavigate();

    const handleRowClick = (record) => {
        return {
            onClick: () => {
                navigate(`/admin/orders/${record.order_code}`);
            },
            className: 'cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors',
        };
    };

    const rowClassName = (record) => {
        let classes = 'group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer';
        if (checkOverdueSLA(record.order_date, record.order_status)) {
            classes += ' bg-red-50/50 dark:bg-red-500/10 hover:!bg-red-100 dark:hover:!bg-red-500/20';
        }
        return classes;
    };

    if (loading && data.length === 0) {
        return (
            <div className="bg-white dark:bg-[#141416] rounded-2xl border border-slate-200 dark:border-white/5 relative overflow-hidden shadow-sm p-8">
                <Skeleton active paragraph={{ rows: 6 }} className="mt-4" />
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
            <Table
                loading={loading}
                columns={columns}
                dataSource={data}
                rowKey="order_code"
                scroll={{ x: 1360 }}
                pagination={{
                    ...pagination,
                    pageSizeOptions: ['10', '20', '50', '100'],
                    className: '!mt-2 !mb-0 !pt-4 !pb-4 !px-6 !text-xs !font-bold !uppercase !tracking-widest !text-slate-500 custom-pagination border-t border-slate-100 dark:border-white/5'
                }}
                onChange={onChange}
                onRow={handleRowClick}
                rowClassName={rowClassName}
                className="
                    custom-dark-table w-full whitespace-nowrap 
                    [&_.ant-table]:!bg-transparent 

                    /* Header Base */
                    [&_.ant-table-thead_th]:!bg-[#f8fafc] 
                    dark:[&_.ant-table-thead_th]:!bg-[#141416] 
                    [&_.ant-table-thead_th]:!text-slate-500 
                    [&_.ant-table-thead_th]:!font-bold 
                    [&_.ant-table-thead_th]:!uppercase 
                    [&_.ant-table-thead_th]:!text-[10px] 
                    [&_.ant-table-thead_th]:!tracking-wider 
                    [&_.ant-table-thead_th]:!px-4
                    
                    /* Header Hover & Sorter */
                    [&_.ant-table-thead>tr>th:hover]:!bg-slate-100 
                    dark:[&_.ant-table-thead>tr>th:hover]:!bg-white/[0.04]
                    [&_.ant-table-column-sort]:!bg-slate-100
                    dark:[&_.ant-table-column-sort]:!bg-white/[0.04]
                    dark:[&_.ant-table-column-sorter-inner]:text-slate-500
                    dark:[&_.ant-table-column-sorter-up.active]:text-yellow-500
                    dark:[&_.ant-table-column-sorter-down.active]:text-yellow-500
                "
            />
        </div>
    );
};

export default OrderTable;
