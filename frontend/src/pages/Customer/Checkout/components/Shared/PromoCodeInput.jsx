import { Input, Button, Form } from 'antd';
import { useState } from 'react';

const PromoCodeInput = ({ applyPromoCode, t, className = '' }) => {
    const [promoCode, setPromoCode] = useState('');

    const handleApply = () => {
        const code = promoCode.trim();
        if (code) {
            applyPromoCode(code);
            setPromoCode('');
        }
    };

    return (
        <Form onFinish={handleApply} className={`flex gap-2 ${className}`}>
            <Input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder={t('summary_promo_placeholder', 'Nhập mã giảm giá...')}
                className="!h-[44px] !rounded-xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-[13px] sm:!text-[14px] !text-slate-900 dark:!text-white font-medium placeholder:!text-slate-400 transition-all flex-1"
            />
            <Button
                htmlType="submit"
                type="primary"
                disabled={!promoCode.trim()}
                className="h-[44px] px-5 sm:px-6 bg-slate-900 border-none dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl text-sm hover:!bg-slate-800 dark:hover:!bg-slate-200 transition-all shadow-none shrink-0 disabled:!bg-slate-200 dark:disabled:!bg-white/10 disabled:!text-slate-400"
            >
                {t('summary_apply', 'Áp dụng')}
            </Button>
        </Form>
    );
};

export default PromoCodeInput;
