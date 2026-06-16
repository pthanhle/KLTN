import React from 'react';
import { Table, Skeleton } from 'antd';
import { getVehicleUnitColumns } from './columns';
import { useTranslation } from 'react-i18next';

const VehicleUnitTable = ({ units, isLoading, onEdit, onViewTimeline }) => {
    const { t } = useTranslation('adminCars');

    if (isLoading) {
        return (
            <div className="p-6">
                <Skeleton active paragraph={{ rows: 5 }} />
            </div>
        );
    }

    const columns = getVehicleUnitColumns({ t, onEdit, onViewTimeline });

    return (
        <Table 
            columns={columns} 
            dataSource={units} 
            rowKey="id"
            pagination={{ 
                pageSize: 10, 
                showTotal: (total, range) => `${t('Hiển thị')} ${range[0]} - ${range[1]} ${t('của')} ${total}`,
                className: '!mt-0 !mb-0 !pt-4 !pb-4 !px-6 !text-xs !font-bold !uppercase !tracking-widest !text-slate-500 custom-pagination border-t border-slate-100 dark:border-white/5' 
            }}
            rowClassName={() => 'group hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer'}
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
            "
        />
    );
};

export default VehicleUnitTable;
