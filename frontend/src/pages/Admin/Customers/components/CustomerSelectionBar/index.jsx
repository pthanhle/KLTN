import { Button } from 'antd';
import { Mail, Lock, X, Star } from 'lucide-react';

export const CustomerSelectionBar = ({ selectedCount, onClear, onAction, t }) => {
    if (selectedCount === 0) return null;

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] flex items-center justify-center w-full max-w-2xl px-4 animate-fade-in-up">
            <div className="bg-slate-900 dark:bg-black text-white rounded-3xl p-4 shadow-2xl flex items-center gap-6 w-full border border-white/10 glass-card">
                <div className="flex items-center gap-4 pl-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 dark:bg-premium-gold text-slate-900 flex items-center justify-center font-black text-xs shadow-lg shadow-yellow-500/20">
                        {selectedCount}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline-block">{t('adminCustomers:selectionSelecting', 'Đang chọn')}</span>
                </div>
                
                <div className="h-8 w-px bg-white/10 hidden sm:block"></div>
                
                <div className="flex items-center gap-3 flex-1 justify-end">
                    <Button 
                        type="text" 
                        icon={<Mail size={14} />} 
                        className="bg-white/10 hover:bg-white/20 text-white rounded-2xl h-[40px] px-5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center border-none"
                        onClick={() => onAction('Voucher')}
                    >
                        {t('adminCustomers:selectionSendVoucher', 'Gửi Voucher')}
                    </Button>
                    <Button 
                        type="text" 
                        icon={<Lock size={14} />} 
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl h-[40px] px-5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center border-none shadow-none"
                        onClick={() => onAction('Lock')}
                    >
                        {t('adminCustomers:selectionLock', 'Khóa')}
                    </Button>
                    <Button 
                        type="text" 
                        icon={<X size={16} />} 
                        className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors border-none"
                        onClick={onClear}
                    />
                </div>
            </div>
        </div>
    );
};
