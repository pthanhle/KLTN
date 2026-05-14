import React from 'react';
import { useTranslation } from 'react-i18next';
import { WarningOutlined } from '@ant-design/icons';
import { Landmark, Banknote, CreditCard } from 'lucide-react';
import { PAYMENT_METHODS } from '../../../../constants/settlementConstants';
import { useActionControls } from './hooks/useActionControls';

export const ActionControls = ({
    isPaid,
    canPrint,
    canCloseRO,
    isProcessingPayment,
    isClosingRO,
    onConfirmPayment,
    onPrintInvoice,
    onCloseRO,
    className
}) => {
    const { t } = useTranslation('adminServiceReception');
    const { selectedPayment, handleSelectPayment, handleConfirm } = useActionControls(isPaid, onConfirmPayment);

    return (
        <aside className={`flex flex-col gap-6 w-full ${className || ''}`}>
            {/* Payment Controls */}
            <div className="bg-slate-50 dark:bg-[#1d1d20] rounded-xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-200 dark:border-white/5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-5">
                    {t('settlement_payment_methods', 'Phương thức thanh toán')}
                </h3>

                <div className="space-y-3 mb-6">
                    <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${selectedPayment === PAYMENT_METHODS.TRANSFER
                        ? 'bg-white dark:bg-[#141416] border-slate-900 dark:border-yellow-500 shadow-sm'
                        : 'bg-white/50 dark:bg-[#0a0a0b] border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30'
                        }`}>
                        <input
                            type="radio"
                            name="payment"
                            checked={selectedPayment === PAYMENT_METHODS.TRANSFER}
                            onChange={() => handleSelectPayment(PAYMENT_METHODS.TRANSFER)}
                            disabled={isPaid}
                            className="form-radio text-slate-900 focus:ring-slate-900 dark:text-yellow-500 dark:focus:ring-yellow-500 border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0a0a0b]"
                        />
                        <Landmark className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                            {t('settlement_pay_transfer', 'Chuyển khoản')}
                        </span>
                    </label>

                    <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${selectedPayment === PAYMENT_METHODS.CASH
                        ? 'bg-white dark:bg-[#141416] border-slate-900 dark:border-yellow-500 shadow-sm'
                        : 'bg-white/50 dark:bg-[#0a0a0b] border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30'
                        }`}>
                        <input
                            type="radio"
                            name="payment"
                            checked={selectedPayment === PAYMENT_METHODS.CASH}
                            onChange={() => handleSelectPayment(PAYMENT_METHODS.CASH)}
                            disabled={isPaid}
                            className="form-radio text-slate-900 focus:ring-slate-900 dark:text-yellow-500 dark:focus:ring-yellow-500 border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0a0a0b]"
                        />
                        <Banknote className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                            {t('settlement_pay_cash', 'Tiền mặt')}
                        </span>
                    </label>

                    <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${selectedPayment === PAYMENT_METHODS.CARD
                        ? 'bg-white dark:bg-[#141416] border-slate-900 dark:border-yellow-500 shadow-sm'
                        : 'bg-white/50 dark:bg-[#0a0a0b] border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30'
                        }`}>
                        <input
                            type="radio"
                            name="payment"
                            checked={selectedPayment === PAYMENT_METHODS.CARD}
                            onChange={() => handleSelectPayment(PAYMENT_METHODS.CARD)}
                            disabled={isPaid}
                            className="form-radio text-slate-900 focus:ring-slate-900 dark:text-yellow-500 dark:focus:ring-yellow-500 border-slate-300 dark:border-slate-600 bg-white dark:bg-[#0a0a0b]"
                        />
                        <CreditCard className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                            {t('settlement_pay_card', 'Thẻ tín dụng')}
                        </span>
                    </label>
                </div>

                <button
                    onClick={handleConfirm}
                    disabled={isPaid || isProcessingPayment}
                    className={`w-full py-3.5 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100 ${
                        isPaid 
                            ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-emerald-600/20 opacity-100' 
                            : 'bg-slate-900 hover:bg-slate-800 dark:bg-gradient-to-br dark:from-yellow-400 dark:to-yellow-500 text-white dark:text-yellow-950 shadow-slate-900/20 dark:shadow-yellow-500/20 disabled:opacity-50'
                    }`}
                >
                    {isProcessingPayment
                        ? t('settlement_processing', 'Đang xử lý...')
                        : isPaid
                            ? t('settlement_paid', 'ĐÃ THANH TOÁN')
                            : t('settlement_btn_confirm_pay', 'Xác nhận thu tiền')}
                </button>
            </div>

            <div className="flex flex-col gap-4 mt-auto">
                {!isPaid && (
                    <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-xl p-4 flex items-start gap-3">
                        <WarningOutlined className="text-yellow-600 dark:text-yellow-500 mt-0.5" />
                        <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200/80 leading-relaxed">
                            {t('settlement_warn_unpaid', 'Vui lòng hoàn tất thanh toán để đủ điều kiện bàn giao xe.')}
                        </span>
                    </div>
                )}

                <button
                    onClick={onPrintInvoice}
                    disabled={!canPrint}
                    className="w-full bg-white dark:bg-transparent border-2 border-slate-200 dark:border-white/20 text-slate-700 dark:text-slate-300 py-3.5 rounded-full font-bold uppercase tracking-widest text-sm transition-all hover:border-slate-900 dark:hover:border-white/50 hover:text-slate-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 disabled:active:scale-100 shadow-sm"
                >
                    {isPaid 
                        ? t('settlement_btn_print', 'In Hóa Đơn')
                        : t('settlement_btn_print_proforma', 'In Phiếu Tạm Tính')
                    }
                </button>

                <button 
                    onClick={onCloseRO}
                    disabled={!canCloseRO || isClosingRO}
                    className={`w-full py-4 rounded-full font-bold uppercase tracking-wider text-xs transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${
                        canCloseRO 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 dark:bg-blue-500 dark:hover:bg-blue-400' 
                            : 'bg-slate-100 dark:bg-[#1d1d20] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 shadow-inner hover:bg-slate-200 dark:hover:bg-[#27272a]'
                    }`}
                >
                    {isClosingRO ? t('settlement_processing', 'Đang xử lý...') : t('settlement_btn_close_ro', 'Bàn Giao & Đóng Lệnh')}
                </button>
            </div>
        </aside>
    );
};
