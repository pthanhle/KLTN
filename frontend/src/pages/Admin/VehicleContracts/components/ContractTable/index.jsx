import React from 'react';
import { Table, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { getContractColumns } from '../../constants/contract.constants.jsx';

const { Text } = Typography;

const ContractTable = ({ data, isLoading, total, currentPage, pageSize, onPageChange, onViewDetails, onApprove }) => {
    const { t } = useTranslation('adminVehicleContracts');

    const columns = getContractColumns(t, onViewDetails, onApprove);

    return (
        <div className="bg-white dark:bg-[#141416] rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden">
        <Table
            columns={columns}
            dataSource={data}
            loading={isLoading}
            rowKey="id"
            scroll={{ x: 'max-content' }}
            onRow={(record) => ({
                onClick: () => onViewDetails(record),
            })}
            pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: total || 0,
                onChange: onPageChange,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50', '100'],
                showTotal: (total, range) => `${t('show')} ${range[0]} - ${range[1]} ${t('of')} ${total} ${t('contracts')}`,
                className: '!mt-2 !mb-0 !pt-4 !pb-4 !px-6 !text-xs !font-bold !uppercase !tracking-widest !text-slate-500 custom-pagination border-t border-slate-100 dark:border-white/5'
            }}
            className="w-full"
            rowClassName={() => 'hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer'}
            locale={{ emptyText: t('Không có hợp đồng nào.') }}
        />
        </div>
    );
};

export default ContractTable;
