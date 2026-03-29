import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'antd';
import { CheckCircle2, Nfc, QrCode } from 'lucide-react';
import GatePass from './GatePass';

const PaymentTerminal = ({ data }) => {
    const { t } = useTranslation('tracking');
    const [method, setMethod] = useState('VIETQR');
    const isPaid = data.invoice_ledger?.payment_status === 'PAID';

    if (isPaid) {
        return <GatePass data={data.post_service_actions?.gate_pass} />;
    }

    return (
        <div className="bg-white dark:bg-[#1e1e20] rounded-xl p-8 shadow-lg border border-slate-200 dark:border-white/5 h-full">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-[#a0a0a0] mb-6">
                {t('del_payment_terminal', 'Cổng Thanh Toán Số')}
            </h3>

            {/* Toggle Switch */}
            <div className="flex p-1 bg-slate-100 dark:bg-[#141416] rounded-full mb-8">
                <button 
                    onClick={() => setMethod('VIETQR')}
                    className={`flex-1 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${method === 'VIETQR' ? 'bg-slate-800 text-white dark:bg-[#2e3447]' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-white/5'}`}
                >
                    <QrCode size={12} strokeWidth={2.5} />
                    VietQR
                </button>
                <button 
                    onClick={() => setMethod('APPLE_PAY')}
                    className={`flex-1 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 ${method === 'APPLE_PAY' ? 'bg-slate-800 text-white dark:bg-[#2e3447]' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-white/5'}`}
                >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                    Apple Pay
                </button>
            </div>

            <div className="bg-white p-4 rounded-lg mb-8 aspect-square flex items-center justify-center relative group border border-slate-200 mx-auto max-w-[280px]">
                {method === 'VIETQR' ? (
                    <Image 
                        src={data.payment_terminal?.qr_image_url}
                        alt="Payment QR" 
                        preview={false}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="text-center flex flex-col items-center">
                        <Nfc className="text-slate-600 dark:text-[#a0a0a0] mb-4" size={48} strokeWidth={1} />
                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                            {t('del_tap_card', 'Chạm thẻ chạm NFC hoặc chèn chuẩn EMV')}
                        </p>
                    </div>
                )}
            </div>

            <button className="w-full py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-bold text-xs tracking-widest uppercase shadow-[0_5px_15px_rgba(124,58,237,0.3)] hover:scale-105 active:scale-95 transition-all">
                {t('del_confirm_transfer', 'Xác nhận đã chuyển khoản')}
            </button>
            
            <p className="text-center mt-4 text-[10px] font-semibold text-slate-500 dark:text-[#a0a0a0] uppercase tracking-widest">
                {t('del_secure', 'Thanh toán Bảo mật qua Napas247')}
            </p>
        </div>
    );
};

export default PaymentTerminal;
