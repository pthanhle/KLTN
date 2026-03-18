import { Star, ShieldCheck, PenTool } from 'lucide-react';
import { Button, InputNumber } from 'antd';

export const PartInfoActions = ({ part, selectedOptions, quantity, handleOptionSelect, handleQuantityChange, formatCurrency, handleAddToCart, handleBuyNow, t }) => {
    return (
        <div className="lg:col-span-5 space-y-8">
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
                
                <div className="flex flex-wrap items-center gap-y-2 gap-x-3 mb-6 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5 text-yellow-500">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="text-slate-900 dark:text-white font-bold">{part.rating}</span>
                    </div>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <span className="whitespace-nowrap">{part.reviews_count} {t('lbl_reviews', 'Đánh giá')}</span>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <span className="whitespace-nowrap">{part.sold_count} {t('lbl_sold', 'Đã bán')}</span>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">{t('lbl_sku', 'SKU')}: {part.sku}</span>
                </div>

                <div className="flex items-baseline gap-4">
                    <span className="text-3xl font-black text-yellow-500">{formatCurrency(part.current_price)}</span>
                    {part.original_price && (
                        <>
                            <span className="text-lg text-slate-400 line-through">{formatCurrency(part.original_price)}</span>
                            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold px-2 py-1 rounded">
                                -{part.discount_percent}%
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Options */}
            {part.options?.map((opt, idx) => (
                <div key={idx} className="space-y-4">
                    <label className="text-sm font-bold text-slate-900 dark:text-white">{opt.name}</label>
                    <div className="flex flex-wrap gap-3">
                        {opt.type === 'color' ? (
                            opt.choices.map((c) => (
                                <button 
                                    key={c.label} 
                                    onClick={() => handleOptionSelect(opt.name, c.label)}
                                    className={`flex items-center gap-2 p-2 rounded-2xl border-2 transition-all ${selectedOptions[opt.name] === c.label ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'}`}
                                >
                                    <span className="w-8 h-8 rounded-full shadow-inner border border-slate-100 dark:border-white/10" style={{ backgroundColor: c.colorCode }}></span>
                                    <span className="text-sm font-bold pr-2">{c.label}</span>
                                </button>
                            ))
                        ) : (
                            opt.choices.map((c) => (
                                <button 
                                    key={c}
                                    onClick={() => handleOptionSelect(opt.name, c)}
                                    className={`px-6 py-2 rounded-xl border-2 transition-all text-sm font-medium ${selectedOptions[opt.name] === c ? 'border-yellow-500 bg-yellow-500/5 text-yellow-600 dark:text-yellow-500 font-bold' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400'}`}
                                >
                                    {c}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            ))}

            {/* Buy Actions */}
            <div className="pt-6 space-y-4">
                <div className="flex gap-4">
                    <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-2xl p-1 bg-white dark:bg-slate-900 w-32 justify-between shrink-0">
                        <Button type="text" onClick={() => handleQuantityChange('decrement')} className="w-10 h-10 !flex !items-center !justify-center !text-lg !font-bold text-slate-900 dark:text-white">-</Button>
                        <span className="font-bold text-slate-900 dark:text-white">{quantity}</span>
                        <Button type="text" onClick={() => handleQuantityChange('increment')} className="w-10 h-10 !flex !items-center !justify-center !text-lg !font-bold text-slate-900 dark:text-white">+</Button>
                    </div>
                    
                    <Button 
                        type="primary"
                        onClick={handleBuyNow}
                        className="flex-1 !h-auto !bg-yellow-500 hover:!bg-yellow-600 !text-black !font-black !py-4 sm:!py-5 !rounded-2xl shadow-xl shadow-yellow-500/20 transition-all border-0 text-sm sm:text-base uppercase"
                    >
                        {t('btn_buy_now', 'MUA NHANH')}
                    </Button>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                    <ShieldCheck className="w-5 h-5 text-yellow-500" />
                    <span>{t('msg_warranty', 'Bảo hành chính hãng')}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                    <PenTool className="w-5 h-5 text-yellow-500" />
                    <span>{t('msg_free_install', 'Lắp đặt miễn phí')}</span>
                </div>
            </div>
        </div>
    );
};

export default PartInfoActions;
