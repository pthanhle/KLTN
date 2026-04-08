import React from 'react';
import { Star, CheckCircle, Barcode, Package } from 'lucide-react';

export const ProductMeta = ({ part, t, formatCurrency, setActiveTab }) => {
    return (
        <div data-purpose="product-meta">
            {part.is_best_seller && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-500 text-black mb-4 mr-3">
                    BEST SELLER
                </span>
            )}
            {part.brand && (
                <span className="inline-block uppercase tracking-widest text-xs font-black text-slate-500 dark:text-slate-400 mb-4">
                    {part.brand}
                </span>
            )}

            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-4 text-slate-900 dark:text-white">
                {part.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-y-3 gap-x-3 mb-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-500 rounded-full cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition-colors"
                     onClick={() => setActiveTab('reviews')}>
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{part.reviews_summary?.average || part.rating || 0}</span>
                    <span className="text-yellow-600/60 dark:text-yellow-500/60 ml-1">
                        ({part.reviews_summary?.total || part.reviews_count || part.reviews?.length || 0} {t('lbl_reviews', 'đánh giá')})
                    </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{t('lbl_sold', 'Đã bán')} {part.sold_count || 0}</span>
                </div>
                
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-full">
                    <Barcode className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span className="font-black uppercase tracking-widest text-[11px]">{t('lbl_sku', 'SKU')}: {part.sku}</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full shadow-sm">
                    <Package className="w-4 h-4" />
                    <span className="font-black uppercase tracking-widest text-[11px]">{part.condition_name || part.condition || t('cart_condition_new', 'Mới 100%')}</span>
                </div>
            </div>

            <div className="flex items-baseline gap-4">
                <span className="text-3xl font-black text-yellow-500">{formatCurrency(part.price)}</span>
                {part.original_price && part.original_price > part.price && (
                    <>
                        <span className="text-lg text-slate-400 line-through">{formatCurrency(part.original_price)}</span>
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold px-2 py-1 rounded">
                            -{part.discount_percent || Math.round(((part.original_price - part.price) / part.original_price) * 100)}%
                        </span>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductMeta;
