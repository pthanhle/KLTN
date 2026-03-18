import { CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import OrderDetails from './OrderDetails';
import CustomerDetails from './CustomerDetails';

const SuccessStep = ({ hookState }) => {
    const { t, orderSuccessData } = hookState;

    if (!orderSuccessData) return null; // An toàn nếu data rỗng

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-700 pb-20">
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-28 h-28 bg-emerald-100 dark:bg-emerald-500/20 rounded-full mb-8 relative">
                    <div className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-ping opacity-20"></div>
                    <CheckCircle2 size={56} className="text-emerald-500" strokeWidth={2.5} />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
                    {t('success_title')}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto font-medium">
                    {t('success_subtitle')}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 px-5 py-3 rounded-full font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse"></span>
                    {t('success_notice')}
                </div>
            </div>

            {/* Content Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <OrderDetails orderData={orderSuccessData} t={t} />
                <CustomerDetails orderData={orderSuccessData} t={t} />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/profile/orders" className="w-full sm:w-auto">
                    <Button 
                        type="primary" 
                        icon={<ArrowRight size={18} strokeWidth={2.5} />} 
                        iconPosition="end"
                        className="w-full sm:w-auto h-14 px-10 bg-yellow-500 hover:!bg-yellow-600 border-none text-slate-900 font-black uppercase tracking-widest rounded-full shadow-lg shadow-yellow-500/30 transition-all active:scale-95 text-[13px]"
                    >
                        {t('success_track')}
                    </Button>
                </Link>
                <Link to="/products" className="w-full sm:w-auto">
                    <Button 
                        type="default" 
                        icon={<ShoppingBag size={18} strokeWidth={2.5} />}
                        className="w-full sm:w-auto h-14 px-10 bg-slate-100 hover:!bg-slate-200 dark:bg-white/5 border-none dark:hover:!bg-white/10 text-slate-900 dark:!text-white font-bold uppercase tracking-widest rounded-full transition-all active:scale-95 text-[13px] shadow-none"
                    >
                        {t('cart_continue_shopping')}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SuccessStep;
