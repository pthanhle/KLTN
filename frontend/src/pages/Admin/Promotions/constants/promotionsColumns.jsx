import React from 'react';
import { Switch, Tag } from 'antd';
import dayjs from 'dayjs';
import { EditAction, DeleteAction, DeleteLockedAction } from '../../../../components/TableActions';
import { formatVND } from '../../../Customer/Cars/utils/formatters';
import { DISCOUNT_TYPES, PROMOTION_STATUS } from './promotions.constants';

export const getPromotionsColumns = (t, handleEdit, handleDelete, handleToggleStatus) => [
    {
        title: t('adminPromotions:col_title'),
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => (
            <div>
                <div className="font-bold text-slate-900 dark:text-white">{text}</div>
                <div className="text-xs text-slate-500 mt-1">{record.description}</div>
            </div>
        )
    },
    {
        title: t('adminPromotions:col_discount'),
        dataIndex: 'discount_value',
        key: 'discount_value',
        render: (val, record) => {
            let displayVal = '';
            let color = 'blue';
            if (record.discount_type === DISCOUNT_TYPES.PERCENT) {
                displayVal = t('adminPromotions:value_percent_off', { val });
                color = 'geekblue';
            } else if (record.discount_type === DISCOUNT_TYPES.FIXED) {
                displayVal = formatVND(val);
                color = 'green';
            } else {
                displayVal = t('adminPromotions:value_free_shipping');
                color = 'cyan';
            }
            return <Tag color={color} className="font-bold rounded-md px-2 py-1">{displayVal}</Tag>;
        }
    },
    {
        title: t('adminPromotions:col_type'),
        dataIndex: 'is_loyalty',
        key: 'is_loyalty',
        render: (isLoyalty) => (
            <span className={`text-sm font-semibold ${isLoyalty ? 'text-yellow-600 dark:text-yellow-500' : 'text-blue-600 dark:text-blue-400'}`}>
                {isLoyalty ? t('adminPromotions:tag_loyalty') : t('adminPromotions:tag_global')}
            </span>
        )
    },
    {
        title: t('adminPromotions:col_points'),
        dataIndex: 'points_required',
        key: 'points_required',
        render: (val, record) => record.is_loyalty ? <span className="font-bold text-yellow-500">{t('adminPromotions:value_pts', { val })}</span> : '-'
    },
    {
        title: t('adminPromotions:col_valid_until'),
        dataIndex: 'end_date',
        key: 'end_date',
        render: (val) => <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{dayjs(val).format('DD/MM/YYYY')}</span>
    },
    {
        title: t('adminPromotions:col_status'),
        dataIndex: 'status',
        key: 'status',
        render: (status, record) => (
            <Switch 
                checked={status === PROMOTION_STATUS.ACTIVE} 
                onChange={() => handleToggleStatus(record._id, status)}
                className="bg-slate-200 dark:bg-white/10 [&.ant-switch-checked]:bg-yellow-500"
            />
        )
    },
    {
        title: t('adminPromotions:col_actions'),
        key: 'actions',
        align: 'right',
        render: (_, record) => {
            const claimedCount = record.claimed_count || 0;
            const isLocked = claimedCount > 0;

            return (
                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <EditAction
                        onEdit={() => handleEdit(record._id)}
                        tooltipText={t('adminPromotions:btn_edit')}
                    />

                    {isLocked ? (
                        <DeleteLockedAction
                            tooltipTitle={t('adminPromotions:err_delete_lock')}
                        />
                    ) : (
                        <DeleteAction
                            onDelete={() => handleDelete(record._id)}
                            confirmTitle={t('adminPromotions:msg_delete_confirm')}
                            confirmDesc={t('adminPromotions:msg_delete_desc')}
                            okText={t('common:yes', 'Xóa')}
                            cancelText={t('common:no', 'Hủy')}
                            tooltipText={t('adminPromotions:btn_delete')}
                        />
                    )}
                </div>
            );
        }
    }
];
