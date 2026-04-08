import React from 'react';
import { Link } from 'react-router-dom';
import { HeartCrack, Sparkles, ArrowRight } from 'lucide-react';

export const EmptyWishlist = ({ t }) => {
    return (
        <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-transparent animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-lg mx-auto">

            <div className="relative mb-10 group">
                <div className="absolute inset-0 bg-red-500/20 dark:bg-red-500/10 rounded-full blur-3xl animate-pulse group-hover:blur-2xl transition-all duration-700"></div>
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-[#1a1a1c] dark:to-[#0f0f11] shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-white/5 flex items-center justify-center relative overflow-hidden transform group-hover:scale-105 transition-transform duration-500 z-10">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-red-300 to-red-500 opacity-20 blur-2xl"></div>
                    <HeartCrack size={48} className="text-red-500 relative z-10 transform group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                    <Sparkles size={20} className="text-red-400 absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" strokeWidth={2} />
                </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 tracking-tight mb-5 leading-tight">
                {t('empty_title', 'Danh sách của bạn đang trống')}
            </h3>

            <p className="text-[16px] text-slate-500 dark:text-slate-400 mb-12 font-medium max-w-[360px] leading-relaxed">
                {t('empty_desc', 'Hãy lưu lại những sản phẩm ưng ý để quay lại mua sắm dễ dàng hơn.')}
            </p>

            <Link to="/parts" className="group relative inline-flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-full blur-lg opacity-20 dark:opacity-40 group-hover:opacity-60 dark:group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"></div>

                <div className="relative inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white hover:bg-yellow-500 hover:text-slate-900 dark:bg-yellow-500 dark:text-slate-900 dark:hover:bg-yellow-400 rounded-full font-black text-[15px] uppercase tracking-[0.15em] overflow-hidden transition-all duration-300 active:scale-95 shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(234,179,8,0.3)] border border-slate-800 hover:border-yellow-400 dark:border-none">

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/30 to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-1000"></div>

                    <span className="relative z-10">{t('continue_shopping', 'Khám phá ngay')}</span>
                    <ArrowRight size={18} className="relative z-10 transform group-hover:translate-x-1.5 transition-transform duration-300" strokeWidth={3} />
                </div>
            </Link>
        </div>
    );
};

export default EmptyWishlist;
