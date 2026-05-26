import { Input, Button } from 'antd';
import { useState } from 'react';
import { WalletCards } from 'lucide-react';
import VoucherWalletModal from './VoucherWalletModal';

const PromoCodeInput = ({ applyPromoCode, isLoading = false, t, className = '', subtotal = 0 }) => {
    const [promoCode, setPromoCode] = useState('');
    const [isWalletOpen, setIsWalletOpen] = useState(false);

    const handleApply = () => {
        const code = promoCode.trim();
        if (code) {
            applyPromoCode(code);
            setPromoCode('');
        }
    };

    const handleSelectFromWallet = (code) => {
        applyPromoCode(code);
    };

    return (
        <div className={className}>
            <form onSubmit={(e) => { e.preventDefault(); handleApply(); }} className="flex gap-2">
                <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={t('summary_promo_placeholder', 'Nhập mã giảm giá...')}
                    className="!h-[44px] !rounded-xl !bg-slate-50 dark:!bg-[#0a0a0b] !border-slate-200 dark:!border-white/10 hover:!border-yellow-500/50 focus:!border-yellow-500 !text-[13px] sm:!text-[14px] !text-slate-900 dark:!text-white font-medium placeholder:!text-slate-400 transition-all flex-1"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    loading={isLoading}
                    disabled={!promoCode.trim() || isLoading}
                    className="h-[44px] px-5 sm:px-6 bg-slate-900 border-none dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl text-sm hover:!bg-slate-800 dark:hover:!bg-slate-200 transition-all shadow-none shrink-0 disabled:!bg-slate-200 dark:disabled:!bg-white/10 disabled:!text-slate-400"
                >
                    {t('summary_apply', 'Áp dụng')}
                </Button>
            </form>
            
            <button 
                type="button"
                onClick={() => setIsWalletOpen(true)}
                className="mt-3 flex items-center gap-1.5 text-xs font-bold text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors"
            >
                <WalletCards size={14} />
                Chọn mã giảm giá từ Ví Voucher
            </button>

            <VoucherWalletModal 
                isOpen={isWalletOpen} 
                onClose={() => setIsWalletOpen(false)} 
                onSelect={handleSelectFromWallet} 
                currentSubtotal={subtotal}
            />
        </div>
    );
};

export default PromoCodeInput;
