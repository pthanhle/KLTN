import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, Verified } from 'lucide-react';

const DepositSuccessView = ({ transactionId, transactionTime, onClose }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="relative group animate-in zoom-in-95 duration-500 w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 to-emerald-400/30 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative backdrop-blur-xl bg-white/90 dark:bg-[#141416]/90 border border-emerald-500/20 rounded-xl p-8 md:p-10 shadow-xl dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
                
                <div className="mb-10 mt-6 relative">
                    <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse"></div>
                    <div className="w-32 h-32 rounded-full bg-emerald-500/10 flex items-center justify-center border-4 border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                        <CheckCircle2 className="text-emerald-500 w-16 h-16" strokeWidth={1.5} />
                    </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800 dark:text-white mb-6 uppercase">
                    {t('quo_deposit_success', 'Xác Nhận Đã Nhận Chuyển Khoản Cọc')}
                </h2>
                
                <p className="text-slate-600 dark:text-[#a0a0a0] leading-relaxed text-sm mb-12 max-w-sm mx-auto">
                    {t('quo_deposit_success_desc', 'Phiếu yêu cầu Sửa Chữa (Repair Order) đã được kích hoạt.')}
                </p>

                <div className="w-full space-y-4 mt-auto relative z-10">
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-50 dark:bg-[#1c2436] p-4 rounded-lg border border-slate-200 dark:border-white/5 shadow-inner">
                            <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">{t('quo_deposit_txn', 'Mã Giao Dịch')}</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">{transactionId}</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-[#1c2436] p-4 rounded-lg border border-slate-200 dark:border-white/5 shadow-inner">
                            <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">{t('quo_deposit_time', 'Thời Gian')}</span>
                            <span className="text-slate-800 dark:text-white font-mono text-sm">{transactionTime}</span>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-full py-5 rounded-full border-2 border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold uppercase tracking-widest text-xs hover:bg-slate-100 dark:hover:bg-white/5 hover:border-slate-300 dark:hover:border-white transition-all shadow-sm"
                    >
                        {t('quo_deposit_close', 'Đóng & Chuyển sang Tab Tiến Độ')}
                    </button>
                </div>
                
                <div className="absolute bottom-10 left-10 opacity-5 pointer-events-none">
                    <Verified size={120} />
                </div>
            </div>
        </div>
    );
};

export default DepositSuccessView;
