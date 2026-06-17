import React from 'react';
import { Space, Tag, Typography, Tooltip, Button } from 'antd';
import { EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { EnterpriseStatusBadge } from '../../Shared/components/Badges/EnterpriseStatusBadge';

const { Text } = Typography;

export const CONTRACT_STATUS_OPTIONS = [
    { value: 'all', labelKey: 'Tất cả' },
    { value: 'draft', labelKey: 'Chờ duyệt' },
    { value: 'issued', labelKey: 'Đã duyệt' },
    { value: 'signed', labelKey: 'Đã ký' },
    { value: 'paid', labelKey: 'Đã thanh toán' },
    { value: 'delivered', labelKey: 'Đã giao xe' },
    { value: 'cancelled', labelKey: 'Đã hủy' }
];

export const getContractColumns = (t, onViewDetails, onApprove) => [
    {
        title: t('Số Hợp đồng'),
        key: 'contract_number',
        width: 180,
        render: (_, record) => <Text strong className="font-mono">{record.contract_number || record.contract_no}</Text>,
    },
    {
        title: t('Khách hàng'),
        key: 'customer',
        width: 220,
        ellipsis: true,
        render: (_, record) => (
            <div className="flex flex-col">
                <Text strong>{record.customer_snapshot?.full_name || record.customer_id?.full_name}</Text>
                <Text type="secondary" className="text-xs">{record.customer_snapshot?.phone || record.customer_id?.phone}</Text>
            </div>
        ),
    },
    {
        title: t('Nhân viên KD'),
        key: 'sales_staff',
        width: 200,
        ellipsis: true,
        render: (_, record) => (
            <div className="flex flex-col">
                <Text strong>{record.sales_id?.full_name || t('Không có')}</Text>
                <Text type="secondary" className="text-xs">{record.sales_id?.phone || ''}</Text>
            </div>
        ),
    },
    {
        title: t('Số VIN'),
        key: 'vin',
        width: 150,
        render: (_, record) => <Tag color="blue" className="font-mono">{record.vehicle_snapshot?.vin || record.vehicle_unit_id?.vin}</Tag>,
    },
    {
        title: t('Giá bán'),
        key: 'final_price',
        width: 180,
        render: (_, record) => (
            <Text className="text-blue-600 font-semibold">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.pricing_snapshot?.grand_total || 0)}
            </Text>
        ),
    },
    {
        title: t('Trạng thái'),
        dataIndex: 'status',
        key: 'status',
        width: 140,
        render: (status) => <EnterpriseStatusBadge status={status} />,
    },
    {
        title: t('Ngày tạo'),
        key: 'createdAt',
        width: 150,
        render: (_, record) => <Text type="secondary">{dayjs(record.createdAt || record.created_at).format('DD/MM/YYYY HH:mm')}</Text>,
    },
];
