import { CheckCircle2, Copy } from 'lucide-react';

const HeroSection = ({ orderData, handleCopyOrderId, t }) => {
    return (
        <div className="text-center mb-16 animate-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-emerald-50 dark:bg-emerald-500/10 rounded-full mb-8 relative">
                <div className="absolute inset-0 border-[6px] border-emerald-500 rounded-full animate-ping opacity-20"></div>
                <CheckCircle2 size={64} className="text-emerald-500 dark:text-emerald-400" strokeWidth={2.5} />
            </div>

            <h1 className="text-4xl md:text-[44px] font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
                {t('success_title')}
            </h1>
            
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium mb-10 leading-relaxed">
                {t('success_subtitle')}
            </p>

            <div className="flex flex-col items-center gap-6 mb-8">
                <button 
                    onClick={() => handleCopyOrderId(orderData?.order_code)}
                    className="group flex items-center gap-3 bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 px-6 py-4 rounded-full shadow-sm hover:border-yellow-500 dark:hover:border-yellow-500/50 transition-colors active:scale-95"
                >
                    <span className="font-bold text-slate-900 dark:text-white text-base tracking-widest">
                        {t('success_order_id', { id: orderData?.order_code?.replace('HDTT-', '') })}
                    </span>
                    <Copy size={18} className="text-yellow-500 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                </button>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    {t('success_email_sent', { email: orderData?.delivery?.masked_email })}
                </p>
            </div>
        </div>
    );
};

export default HeroSection;
