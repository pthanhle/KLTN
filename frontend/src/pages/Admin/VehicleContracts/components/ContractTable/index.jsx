import React from 'react';
import { Table, Button, Space, Tag, Typography, Skeleton } from 'antd';
import { EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { EnterpriseStatusBadge } from '../../../Shared/components/Badges/EnterpriseStatusBadge';
import dayjs from 'dayjs';

const { Text } = Typography;

const ContractTable = ({ data, isLoading, onViewDetails, onApprove }) => {
    const { t } = useTranslation('adminVehicleContracts');

    const columns = [
        {
            title: t('Số Hợp đồng'),
            dataIndex: 'contract_no',
            key: 'contract_no',
            render: (text) => <Text strong className="font-mono">{text}</Text>,
        },
        {
            title: t('Khách hàng'),
            dataIndex: 'customer_name',
            key: 'customer_name',
            render: (text, record) => (
                <div className="flex flex-col">
                    <Text strong>{text}</Text>
                    <Text type="secondary" className="text-xs">{record.customer_phone}</Text>
                </div>
            ),
        },
        {
            title: t('Số VIN'),
            dataIndex: 'vin',
            key: 'vin',
            render: (text) => <Tag color="blue" className="font-mono">{text}</Tag>,
        },
        {
            title: t('Giá bán'),
            dataIndex: 'final_price',
            key: 'final_price',
            render: (val) => (
                <Text className="text-blue-600 font-semibold">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val || 0)}
                </Text>
            ),
        },
        {
            title: t('Trạng thái'),
            dataIndex: 'status',
            key: 'status',
            render: (status) => <EnterpriseStatusBadge status={status} />,
        },
        {
            title: t('Ngày tạo'),
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => <Text type="secondary">{dayjs(date).format('DD/MM/YYYY HH:mm')}</Text>,
        },
        {
            title: '',
            key: 'actions',
            align: 'right',
            render: (_, record) => (
                <Space>
                    <Button 
                        type="default" 
                        icon={<EyeOutlined />} 
                        onClick={() => onViewDetails(record)}
                        className="flex items-center"
                    >
                        {t('Xem chi tiết')}
                    </Button>
                    {record.status === 'pending_approval' && (
                        <Button 
                            type="primary" 
                            icon={<CheckCircleOutlined />} 
                            onClick={() => onApprove(record)}
                            className="bg-green-600 hover:bg-green-700 flex items-center"
                        >
                            {t('Duyệt hợp đồng')}
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <Skeleton active paragraph={{ rows: 6 }} />
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#141416] rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden">
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={{ pageSize: 10, className: 'px-6 py-4 !mb-0 border-t border-slate-100 dark:border-white/5' }}
            className="w-full"
            rowClassName={() => 'hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer'}
            locale={{ emptyText: t('Không có hợp đồng nào.') }}
        />
        </div>
    );
};

export default ContractTable;
