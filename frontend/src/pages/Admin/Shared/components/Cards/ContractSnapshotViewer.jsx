import React from 'react';
import { Card, Descriptions, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { EnterpriseStatusBadge } from '../Badges/EnterpriseStatusBadge';

const { Text } = Typography;

export const ContractSnapshotViewer = ({ snapshot, status }) => {
    const { t } = useTranslation('adminVehicleContracts');
    if (!snapshot) return null;

    return (
        <Card 
            title={
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <LockOutlined className="text-orange-500" />
                    <Text>{t('Dữ liệu Hợp đồng Bất biến (Snapshot)')}</Text>
                </div>
            }
            extra={<EnterpriseStatusBadge status={status} />}
            className="shadow-sm border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            size="small"
        >
            <Descriptions bordered size="small" column={1} className="bg-white dark:bg-gray-900">
                <Descriptions.Item label={t('Khách hàng')}>
                    <Text strong>{snapshot.customer_name}</Text>
                    <br />
                    <Text type="secondary">{snapshot.customer_phone}</Text>
                </Descriptions.Item>
                <Descriptions.Item label={t('Mẫu xe')}>
                    <Text strong>{snapshot.car_name}</Text>
                </Descriptions.Item>
                <Descriptions.Item label={t('Số VIN')}>
                    <Text className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {snapshot.vin}
                    </Text>
                </Descriptions.Item>
                <Descriptions.Item label={t('Màu sắc thực tế')}>
                    <Text>{snapshot.actual_color}</Text>
                </Descriptions.Item>
                <Descriptions.Item label={t('Giá chốt (VNĐ)')}>
                    <Text strong className="text-blue-600 dark:text-blue-400">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(snapshot.final_price || 0)}
                    </Text>
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};
