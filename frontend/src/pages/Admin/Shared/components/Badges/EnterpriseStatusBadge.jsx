import React from 'react';
import { Tag, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

export const EnterpriseStatusBadge = ({ status }) => {
    const { t } = useTranslation('adminVehicleContracts');

    const STATUS_MAP = {
        in_stock: { color: 'blue', text: t('Trong Kho', 'Trong Kho') },
        reserved: { color: 'orange', text: t('Đang Giữ Chỗ', 'Đang Giữ Chỗ') },
        contract_pending: { color: 'gold', text: t('Chờ duyệt', 'Chờ Duyệt HĐ') },
        sold: { color: 'green', text: t('Đã Bán', 'Đã Bán') },
        draft: { color: 'default', text: t('Nháp (Chờ duyệt)', 'Nháp (Chờ duyệt)') },
        issued: { color: 'cyan', text: t('Đã duyệt', 'Đã Duyệt') },
        signed: { color: 'blue', text: t('Đã ký', 'Đã Ký') },
        pending_approval: { color: 'gold', text: t('Chờ duyệt', 'Chờ Duyệt') },
        approved: { color: 'cyan', text: t('Đã duyệt', 'Đã Duyệt') },
        paid: { color: 'green', text: t('Đã thanh toán', 'Đã Thanh Toán') },
        delivered: { color: 'geekblue', text: t('Đã giao xe', 'Đã Giao Xe') },
        cancelled: { color: 'red', text: t('Đã hủy', 'Đã Hủy') },
    };

    const config = STATUS_MAP[status] || { color: 'default', text: status };
    
    return (
        <Tag color={config.color} className="font-medium px-3 py-1 rounded-md shadow-sm dark:bg-opacity-20 border-transparent dark:border-current">
            <Typography.Text className="text-inherit">{config.text}</Typography.Text>
        </Tag>
    );
};
