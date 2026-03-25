import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'antd';
import { Lock, ScanLine } from 'lucide-react';
import { formatCurrency } from '../../../utils/trackingDataUtils';

const DepositPaymentView = ({ paymentTerms, isProcessing, onConfirm, onCancel }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="relative group animate-in zoom-in-95 duration-500">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-yellow-500/20 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative backdrop-blur-xl bg-[#141416]/90 border border-emerald-500/20 rounded-xl p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col">

                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                        <Lock className="text-emerald-500" size={20} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                        {t('quo_deposit_title', 'Hoàn Tất Tạm Ứng Dịch Vụ')}
                    </h2>
                </div>

                <p className="text-slate-400 dark:text-[#a0a0a0] leading-relaxed mb-8 text-sm">
                    {t('quo_deposit_desc', 'Chữ ký của quý khách đã được ghi nhận bảo mật...')}
                </p>

                {/* Highlight Box */}
                <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-lg p-6 mb-8 relative overflow-hidden">
                    <span className="block text-xs font-bold uppercase tracking-widest text-yellow-500 mb-2">
                        {t('quo_deposit_amount', 'Số Tiền Cọc Yêu Cầu:')}
                    </span>
                    <div className="text-4xl md:text-5xl font-black tracking-tighter text-yellow-500">
                        {formatCurrency(paymentTerms.required_deposit)} <span className="text-xl font-medium opacity-70">VNĐ</span>
                    </div>
                </div>

                {/* QR Code Zone using AntD Image */}
                <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg mb-10 shadow-inner group-hover/qr:shadow-md transition-all">
                    <div className="w-48 h-48 bg-slate-50 flex items-center justify-center relative border-[10px] border-white overflow-hidden">
                        <Image
                            src={paymentTerms.deposit_qr_url}
                            alt="VietQR"
                            preview={false}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="mt-4 text-slate-900 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                        <ScanLine size={16} />
                        {t('quo_deposit_scan', 'Web/App Ngân Hàng để Scan')}
                    </div>
                </div>

                <button
                    onClick={onConfirm}
                    disabled={isProcessing}
                    className="mt-auto w-full py-5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:hover:scale-100"
                >
                    {isProcessing ? t('btn_processing', 'Đang xử lý...') : t('quo_deposit_confirm', 'Xác nhận đã chuyển khoản cọc')}
                </button>

                <button
                    onClick={onCancel}
                    className="mt-4 text-[10px] text-slate-500 hover:text-white uppercase tracking-widest font-bold underline underline-offset-4 transition-colors text-center w-full"
                >
                    {t('quo_deposit_cancel', 'Hủy Bỏ (Hóa Đơn Sẽ Chờ Thanh Toán)')}
                </button>
            </div>
        </div>
    );
};

export default DepositPaymentView;
