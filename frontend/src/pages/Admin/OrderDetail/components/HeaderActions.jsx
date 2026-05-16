import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'antd';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { ORDER_STATUSES } from '../../Orders/constants/statusConfig';

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
        <header className="sticky top-0 z-50 bg-white/60 dark:bg-[#141416]/60 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-8 py-4 flex items-center justify-between shadow-sm h-20">
            <div className="flex items-center gap-4">
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
                    {order.order_status === 'PENDING' && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                    {order.order_status}
                </span>
            </div>

            <div className="flex items-center gap-4">
                {order.order_status === 'PENDING' && (
                    <>
                        <button
                            onClick={() => onAction('CANCEL')}
                            className="px-6 py-2.5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-500 font-bold text-[11px] uppercase tracking-widest hover:bg-red-200 dark:hover:bg-red-500/30 transition-colors flex items-center gap-2"
                        >
                            <XCircle size={16} /> {t('cancel_order')}
                        </button>
                        <button
                            onClick={() => onAction('APPROVE')}
                            className="px-6 py-2.5 rounded-full bg-yellow-500 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-yellow-600 transition-colors flex items-center gap-2"
                        >
                            <CheckCircle2 size={16} /> {t('approve_order')}
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};
