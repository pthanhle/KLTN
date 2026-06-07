import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { App } from 'antd';
import { formatCurrency } from '../../../utils/trackingDataUtils';
import trackingApi from '../../../../../../services/api/tracking.api';

const ApprovalRequestCard = ({ request, setProgressData }) => {
    const { t } = useTranslation('tracking');
    const { message } = App.useApp();
    const [loading, setLoading] = useState(null); // 'approve' | 'reject' | null

    if (!request) return null;

    const handleAction = async (action) => {
        if (!request.booking_code || !request.id) return;
        setLoading(action);
        try {
            let res;
            if (action === 'approve') {
                res = await trackingApi.approveSupplementRequest(request.booking_code, request.id);
            } else {
                res = await trackingApi.rejectSupplementRequest(request.booking_code, request.id);
            }
            message.success(action === 'approve' ? 'Đã phê duyệt phát sinh' : 'Đã từ chối phát sinh');
            if (setProgressData && res) {
                // Re-map the supplement_requests from the updated progress
                setProgressData((prev) => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        timeline_steps: prev.timeline_steps.map((step) => {
                            if (step.id !== `supplement_${request.id}`) return step;
                            return {
                                ...step,
                                status: action === 'approve' ? 'done' : 'pending',
                                approval_request: { ...step.approval_request, status: action === 'approve' ? 'approved' : 'rejected' },
                            };
                        }),
                    };
                });
            }
        } catch (err) {
            message.error(err?.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="bg-slate-50 dark:bg-[#1e1e20] rounded-xl p-6 mt-4 border border-red-500/20 dark:border-red-500/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <div className="flex items-start gap-4">
                <AlertTriangle className="text-red-500 shrink-0 mt-1" size={24} />
                <div className="flex-1">
                    <p className="text-slate-800 dark:text-white leading-relaxed font-semibold text-sm mb-1">
                        {request.issue_title}
                    </p>
                    <p className="text-slate-600 dark:text-[#a0a0a0] leading-relaxed text-[13px] mb-2">
                        {request.technician_note}
                    </p>
                    <p className="text-slate-800 dark:text-white leading-relaxed text-[13px] font-medium mb-3">
                        <span className="font-bold text-red-500">{t('prog_action_required', 'Đề xuất')}: </span>{request.action_required}
                    </p>

                    {/* Breakdown of parts + labors */}
                    {((request.parts?.length > 0) || (request.labors?.length > 0)) && (
                        <div className="mb-4 rounded-lg overflow-hidden border border-red-500/15 text-[12px]">
                            {request.parts?.map((p, i) => (
                                <div key={i} className="flex justify-between px-3 py-1.5 bg-slate-50 dark:bg-[#23293c] border-b border-slate-100 dark:border-white/5">
                                    <span className="text-slate-600 dark:text-slate-300">{p.name} × {p.quantity}</span>
                                    <span className="font-semibold text-slate-800 dark:text-white">{formatCurrency(p.unit_price * p.quantity)}</span>
                                </div>
                            ))}
                            {request.labors?.map((l, i) => (
                                <div key={i} className="flex justify-between px-3 py-1.5 bg-slate-50 dark:bg-[#23293c] border-b border-slate-100 dark:border-white/5">
                                    <span className="text-slate-600 dark:text-slate-300">{l.description} ({l.hours}h)</span>
                                    <span className="font-semibold text-slate-800 dark:text-white">{formatCurrency(l.hours * l.rate)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {request.status === 'pending' && (
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                disabled={!!loading}
                                onClick={() => handleAction('approve')}
                                className="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-[0_5px_15px_rgba(239,68,68,0.3)] hover:scale-105 active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 size={14} />
                                {loading === 'approve' ? 'Đang xử lý...' : `${t('prog_btn_approve_price', 'Phê duyệt')}: ${formatCurrency(request.total_price)}`}
                            </button>
                            <button
                                disabled={!!loading}
                                onClick={() => handleAction('reject')}
                                className="px-6 py-3 border border-red-500/40 text-red-600 dark:text-red-400 font-bold text-xs uppercase tracking-widest rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                <XCircle size={14} />
                                {loading === 'reject' ? 'Đang xử lý...' : t('prog_btn_reject', 'Từ chối')}
                            </button>
                        </div>
                    )}
                    {request.status === 'approved' && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-[#4edea3] rounded-full border border-emerald-500/20">
                            <span className="text-xs font-bold uppercase tracking-widest">{t('prog_status_approved', 'Đã phê duyệt')}</span>
                        </div>
                    )}
                    {request.status === 'rejected' && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-[#23293c] text-slate-500 dark:text-[#a0a0a0] rounded-full border border-slate-300 dark:border-white/5">
                            <span className="text-xs font-bold uppercase tracking-widest">{t('prog_status_rejected', 'Đã từ chối')}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApprovalRequestCard;
