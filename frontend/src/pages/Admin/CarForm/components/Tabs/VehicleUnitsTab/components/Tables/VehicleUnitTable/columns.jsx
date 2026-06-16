import React from 'react';
import { Tag, Tooltip } from 'antd';
import { Edit2, History } from 'lucide-react';
import { getStatusColor } from '../../../utils/vehicleUnit.utils';

export const getVehicleUnitColumns = ({ t, onEdit, onViewTimeline }) => [
    {
        title: t('Số Khung (VIN)'),
        dataIndex: 'vin',
        key: 'vin',
        render: (text) => <span className="font-mono font-medium text-slate-700 dark:text-slate-300">{text || '-'}</span>,
    },
    {
        title: t('Màu thực tế'),
        dataIndex: ['color', 'name'],
        key: 'color',
        render: (text, record) => (
            <div className="flex items-center gap-2">
                {record.color?.value && (
                    <div 
                        className="w-4 h-4 rounded-full border border-slate-200 shadow-sm" 
                        style={{ backgroundColor: record.color.value }}
                    />
                )}
                <span>{text || '-'}</span>
            </div>
        ),
    },
    {
        title: t('Vị trí hiện tại'),
        dataIndex: ['location', 'name'],
        key: 'location',
        render: (text, record) => {
            const locType = record.location?.type;
            const locNames = {
                warehouse: t('Kho Tổng'),
                showroom: t('Showroom Trưng Bày'),
                service: t('Xưởng Dịch Vụ'),
                customer: t('Nhà Khách Hàng'),
                in_transit: t('Đang Di Chuyển'),
                other: t('Khác')
            };
            return (
                <div className="flex flex-col">
                    <span className="font-medium">{text || locNames[locType]}</span>
                    {record.location?.code && <span className="text-xs text-slate-400">{record.location.code}</span>}
                </div>
            );
        }
    },
    {
        title: t('Tình trạng'),
        dataIndex: 'condition',
        key: 'condition',
        render: (cond) => {
            const isNew = cond === 'new';
            const condNames = {
                new: t('Mới (Brand New)'),
                demo: t('Xe Demo'),
                used: t('Xe Cũ / Lướt'),
                certified_pre_owned: t('CPO (Đã kiểm định)')
            };
            return (
                <Tag color={isNew ? "success" : "warning"} className="m-0 uppercase font-bold text-[9px] border-none px-2 py-0.5">
                    {condNames[cond] || cond}
                </Tag>
            );
        }
    },
    {
        title: t('Trạng thái'),
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            const statNames = {
                in_stock: t('Đang rảnh (In Stock)'),
                reserved: t('Đang giữ chỗ'),
                contract_pending: t('Chờ duyệt HĐ'),
                sold: t('Đã Bán'),
                delivered: t('Đã Bàn Giao'),
                service_hold: t('Đang bảo dưỡng'),
                in_transit: t('Đang vận chuyển'),
                archived: t('Lưu trữ')
            };
            return (
                <Tag color={getStatusColor(status)} className="uppercase font-bold m-0 border-none px-3 py-1 rounded-full text-[10px] shadow-sm">
                    {statNames[status] || status}
                </Tag>
            );
        }
    },
    {
        title: t('Thao tác'),
        key: 'action',
        align: 'right',
        width: 120,
        render: (_, record) => (
            <div className="flex items-center justify-end gap-1 pr-2">
                <Tooltip title={t('Lịch sử Giao dịch')}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewTimeline(record);
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-500/10 transition-colors opacity-70 hover:opacity-100 cursor-pointer outline-none"
                    >
                        <History size={16} strokeWidth={1.75} />
                    </button>
                </Tooltip>
                <Tooltip title={t('Cập nhật Xe')}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(record);
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:text-[#ffd165] dark:hover:bg-yellow-500/10 transition-colors opacity-70 hover:opacity-100 cursor-pointer outline-none"
                    >
                        <Edit2 size={16} strokeWidth={1.75} />
                    </button>
                </Tooltip>
            </div>
        )
    }
];
