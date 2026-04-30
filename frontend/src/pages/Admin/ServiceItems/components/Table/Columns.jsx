import React from 'react';
import { Switch, Tag } from 'antd';
import { EditAction, DeleteAction, DeleteLockedAction } from '../../../../../components/TableActions';
import PriceTag from './PriceTag';

export const getColumns = (t, onEdit, onDelete, onToggleStatus) => [
    {
        title: t('adminServiceItems:col_sku', 'SKU'),
        dataIndex: 'sku',
        key: 'sku',
        width: 120,
        render: (text) => (
            <span className="font-mono text-xs bg-slate-100 dark:bg-white/5 px-2 py-1 rounded border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">
                {text}
            </span>
        )
    },
    {
        title: t('adminServiceItems:col_name', 'Tên Dịch Vụ'),
        dataIndex: 'serviceName',
        key: 'serviceName',
        width: 300,
        render: (text, record) => (
            <div>
                <div className="font-bold text-slate-900 dark:text-white mb-0.5 whitespace-normal break-words">{text}</div>
                {record.isPackage && (
                    <Tag color="purple" className="text-[10px] m-0 border-none bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">Combo</Tag>
                )}
            </div>
        )
    },
    {
        title: t('adminServiceItems:col_category', 'Danh Mục'),
        dataIndex: 'category',
        key: 'category',
        width: 150,
        render: (category) => (
            <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                {category?.name || '--'}
            </span>
        )
    },
    {
        title: t('adminServiceItems:col_price_type', 'Loại Giá'),
        dataIndex: 'priceType',
        key: 'priceType',
        width: 130,
        render: (type) => <PriceTag type={type} t={t} />
    },
    {
        title: t('adminServiceItems:col_base_price', 'Giá Cơ Bản'),
        dataIndex: 'basePrice',
        key: 'basePrice',
        align: 'right',
        width: 150,
        render: (price, record) => {
            if (record.priceType === 'CONTACT') return <span className="text-slate-400 italic">--</span>;
            return (
                <span className="font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    {price?.toLocaleString('vi-VN')} {t('adminServiceItems:currency', '₫')}
                </span>
            );
        }
    },
    {
        title: t('adminServiceItems:col_duration', 'Thời Gian'),
        dataIndex: 'estimatedDuration',
        key: 'estimatedDuration',
        align: 'right',
        width: 120,
        render: (val) => val ? <span className="text-[13px] text-slate-500 font-medium whitespace-nowrap">{val} {t('adminServiceItems:minute', 'Phút')}</span> : <span className="text-slate-400">--</span>
    },
    {
        title: t('adminServiceItems:col_status', 'Trạng Thái'),
        dataIndex: 'isActive',
        key: 'isActive',
        align: 'center',
        width: 120,
        render: (isActive, record) => (
            <Switch
                checked={isActive}
                onChange={() => onToggleStatus(record._id)}
                className="bg-slate-300 dark:bg-slate-600 [&.ant-switch-checked]:bg-green-500"
            />
        )
    },
    {
        title: t('adminServiceItems:col_action', 'Thao Tác'),
        key: 'actions',
        align: 'center',
        fixed: 'right',
        width: 120,
        render: (_, record) => {
            const isLocked = false;
            return (
                <div className="flex justify-center gap-3">
                    <EditAction
                        onEdit={() => onEdit(record)}
                        tooltipText={t('adminServiceItems:btnEdit', 'Chỉnh sửa')}
                    />

                    {isLocked ? (
                        <DeleteLockedAction
                            tooltipTitle={t('adminServiceItems:errDeleteLock', 'Không thể xóa do đang có đơn hàng liên kết.')}
                        />
                    ) : (
                        <DeleteAction
                            onDelete={() => onDelete(record._id)}
                            confirmTitle={t('adminServiceItems:confirmDelete', 'Xóa dịch vụ?')}
                            confirmDesc={t('adminServiceItems:confirmDeleteDesc', 'Bạn có chắc chắn muốn xóa dịch vụ này không?')}
                            okText={t('common:yes', 'Xóa')}
                            cancelText={t('common:no', 'Hủy')}
                            tooltipText={t('adminServiceItems:btnDelete', 'Xóa')}
                        />
                    )}
                </div>
            );
        }
    }
];