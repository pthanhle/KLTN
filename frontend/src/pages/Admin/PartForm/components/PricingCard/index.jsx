import React from 'react';
import { useTranslation } from 'react-i18next';
import { CircleDollarSign } from 'lucide-react';
import PriceInputBox from './components/PriceInputBox';
import DiscountBadge from './components/DiscountBadge';
import { calculateDiscountPercent } from '@/utils/pricingUtils';

const PricingCard = ({ watch, t }) => {
    const originalPrice = watch('original_price') || 0;
    const price = watch('price') || 0;

    const discountPercent = calculateDiscountPercent(originalPrice, price);

    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-3 mb-8">
                <CircleDollarSign className="text-emerald-500" size={24} />
                <h3 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                    {t('adminPartForm:pricing')}
                </h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <PriceInputBox 
                    name="original_price"
                    label={t('adminPartForm:origPrice')}
                    isHighlight={false}
                />
                
                <PriceInputBox 
                    name="price"
                    label={t('adminPartForm:salePrice')}
                    isHighlight={true}
                />

                <div className="bg-emerald-50/50 dark:bg-emerald-900/20 border-2 border-emerald-500/20 p-6 sm:p-8 rounded-[2rem] flex flex-col justify-center items-center lg:items-start transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <label className="block text-[11px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-4 font-bold relative z-10">
                        {t('adminPartForm:discount')}
                    </label>
                    <div className="flex items-end gap-2 relative z-10 transition-all">
                        {discountPercent > 0 ? (
                            <>
                                <span className="text-5xl font-black text-emerald-500 tracking-tighter tabular-nums drop-shadow-sm">{discountPercent}%</span>
                                <span className="text-[12px] text-emerald-600/70 dark:text-emerald-400/80 pb-2 font-bold uppercase tracking-widest">{t('adminPartForm:save')}</span>
                            </>
                        ) : (
                            <span className="text-3xl font-black text-slate-300 dark:text-slate-600 tracking-tighter">0%</span>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingCard;
