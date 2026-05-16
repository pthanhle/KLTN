import React from 'react';
import { ORDER_STATUSES, PAYMENT_STATUSES } from './statusConfig';
import { formatCurrency, formatRelativeTime } from '../utils/formatters';

export const getOrderColumns = (t) => [
    {
        title: t('col_order_code', 'Mã Đơn'),
        dataIndex: 'order_code',
        key: 'order_code',
        width: 250,
        render: (text, record) => {
            return (
                <div>
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        {text}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {formatRelativeTime(record.order_date)}
                    </div>
                </div>
            );
        }
    },
    {
        title: t('col_customer', 'Khách Hàng'),
        key: 'customer',
        width: 250,
        render: (_, record) => (
            <div>
                <div className="text-slate-900 dark:text-white font-medium">
                    {record.delivery?.receiver_name || t('guest_customer', 'Khách vãng lai')}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {record.delivery?.phone || ''}
                </div>
            </div>
        )
    },
    {
        title: t('col_items', 'Sản Phẩm'),
        key: 'items',
        width: 320,
        render: (_, record) => {
            if (!record.items || record.items.length === 0) {
                return <span className="text-slate-400">{t('not_available', 'Trống')}</span>;
            }
            return (
                <div className="flex flex-col gap-2.5">
                    {record.items.map((item, index) => (
                        <div key={item._id || index} className="flex-1 min-w-0">
                            <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                <span className="text-slate-500 dark:text-slate-400 font-semibold mr-1.5">{item.quantity}x</span>
                                {item.name}
                            </div>
                            {item.properties && (
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate pl-5">
                                    {item.properties}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            );
        }
    },
    {
        title: t('col_total', 'Tổng Tiền'),
        dataIndex: ['financials', 'grand_total'],
        key: 'total',
        width: 200,
        render: (value) => (
            <div className="font-bold text-slate-900 dark:text-white">
                {formatCurrency(value || 0)}
            </div>
        )
    },
    {
        title: t('col_payment', 'Thanh Toán'),
        key: 'payment',
        width: 200,
        render: (_, record) => {
            const statusConfig = PAYMENT_STATUSES[record.payment?.status] || PAYMENT_STATUSES.UNPAID;
            return (
                <div>
                    <div className="text-sm text-slate-900 dark:text-slate-300">
                        {record.payment?.method_name || record.payment?.method || t('not_available', 'Trống')}
                    </div>
                    <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border}`}>
                        {t(`badge_${record.payment?.status?.toLowerCase()}`, record.payment?.status)}
                    </div>
                </div>
            );
        }
    },
    {
        title: t('col_status', 'Trạng Thái'),
        dataIndex: 'order_status',
        key: 'status',
        width: 180,
        render: (status) => {
            const statusConfig = ORDER_STATUSES[status] || ORDER_STATUSES.PENDING;
            return (
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border}`}>
                    {t(`tab_${status.toLowerCase()}`, status)}
                </div>
            );
        }
    }
];
