import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import GatePass from './GatePass';

const PaymentTerminal = ({ isPaid }) => {
    const { t } = useTranslation('tracking');

    if (isPaid) {
        return <GatePass data={{ code: null, is_cleared: false }} />;
    }

    return (
        <div className="bg-white dark:bg-[#1e1e20] rounded-xl p-8 shadow-lg border border-slate-200 dark:border-white/5 flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-yellow-600 dark:text-yellow-400" strokeWidth={1.5} />
            </div>
            <div>
                <p className="text-sm font-bold text-slate-800 dark:text-white mb-1">
                    {t('del_sign_to_pay_title', 'Hoàn tất biên bản bàn giao')}
                </p>
                <p className="text-xs text-slate-500 dark:text-[#a0a0a0] leading-relaxed">
                    {t('del_sign_to_pay_desc', 'Vui lòng tích đủ các mục và ký tên vào biên bản bên dưới để mở khóa thanh toán qua VNPay.')}
                </p>
            </div>
        </div>
    );
};

export default PaymentTerminal;
