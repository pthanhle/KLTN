import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'antd';
import { ArrowLeft, CheckCircle2, XCircle, UserCog } from 'lucide-react';
import { ORDER_STATUSES } from '../../../Orders/constants/statusConfig';

export const HeaderActions = ({ order, loading, t, onAction }) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="sticky top-0 z-50 bg-white/60 dark:bg-[#141416]/60 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-8 py-4 flex items-center justify-between shadow-sm h-20">
                <Skeleton.Input active size="large" />
                <Skeleton.Button active size="large" />
            </div>
        );
    }

    const statusConfig = ORDER_STATUSES[order.order_status] || ORDER_STATUSES.PENDING;

    return (
        <header className="sticky top-0 z-50 bg-white/60 dark:bg-[#141416]/60 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-4 md:px-8 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm min-h-[5rem]">
            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                <button
                    onClick={() => navigate('/admin/orders')}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-[#202022] hover:bg-slate-200 dark:hover:bg-[#2a2a2c] transition-colors border border-slate-200 dark:border-white/5"
                >
                    <ArrowLeft className="text-slate-600 dark:text-[#d3c5ac]" size={20} />
                </button>
                <div>
                    <h1 className="text-sm uppercase tracking-widest text-slate-500 dark:text-yellow-600 font-bold">{t('title')}</h1>
                    <p className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">{order.order_code}</p>
                </div>
                <span className={`ml-4 px-3 py-1 rounded-full border text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border}`}>
                    {order.order_status === ORDER_STATUSES.PENDING.value && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                    {t(`status_${order.order_status?.toLowerCase()}`, order.order_status)}
                </span>
            </div>

            <div className="flex items-center gap-2 md:gap-4 flex-wrap w-full md:w-auto">
                {order.order_status === ORDER_STATUSES.PENDING.value && (
                    <>
                        <button
                            onClick={() => onAction('cancel_order')}
                            className="px-6 py-2.5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500 font-bold text-[11px] uppercase tracking-widest hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors flex items-center gap-2"
                        >
                            <XCircle size={16} /> {t('cancel_order')}
                        </button>
                        <button
                            onClick={() => onAction('approve_order')}
                            className="px-6 py-2.5 rounded-full bg-yellow-500 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-yellow-600 transition-colors flex items-center gap-2"
                        >
                            <CheckCircle2 size={16} /> {t('approve_order')}
                        </button>
                    </>
                )}

                {(order.order_status === ORDER_STATUSES.CONFIRMED.value || order.order_status === ORDER_STATUSES.PACKED.value) && (
                    <button
                        onClick={() => onAction('reassign_staff')}
                        className="px-6 py-2.5 rounded-full bg-indigo-500 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-indigo-600 transition-colors flex items-center gap-2"
                    >
                        <UserCog size={16} /> {t('assign_staff', 'Phân công nhân viên')}
                    </button>
                )}

                {order.order_status === ORDER_STATUSES.SHIPPING.value && (
                    <button
                        onClick={() => onAction('complete_order')}
                        className="px-6 py-2.5 rounded-full bg-emerald-500 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-emerald-600 transition-colors flex items-center gap-2"
                    >
                        <CheckCircle2 size={16} /> {t('complete_order')}
                    </button>
                )}

                {order.order_status === ORDER_STATUSES.CANCELLED.value && order.cancel_reason && (
                    <div className="px-4 py-2 bg-red-50 dark:bg-red-500/10 rounded-lg border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium">
                        {t('cancel_reason')} {order.cancel_reason}
                    </div>
                )}
            </div>
        </header>
    );
};