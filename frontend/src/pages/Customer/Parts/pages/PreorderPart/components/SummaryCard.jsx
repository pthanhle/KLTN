import { Image } from 'antd';
import { formatVND } from '@/pages/Customer/Cars/utils/formatters';

const SummaryCard = ({ part, selectedOptions, handleOptionSelect, errors, t }) => {
    return (
        <div className="bg-white dark:bg-[#141416] border border-slate-100 dark:border-white/5 rounded-[32px] p-6 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative group">
            <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 text-[10px] font-black tracking-widest uppercase rounded-full border border-red-200 dark:border-red-500/20 shadow-sm">
                {t('preorder_out_of_stock', 'Hết hàng')}
            </span>
            <div className="w-full aspect-square bg-[#f8fafc] dark:bg-[#0a0a0b] rounded-2xl flex items-center justify-center p-6 border border-slate-50 dark:border-white/5 mb-6 group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
                <Image
                    src={part?.images?.[0] || part?.image}
                    alt={part?.name}
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                    preview={true}
                />
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
                {part?.brand && (
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-md border border-slate-200 dark:border-white/10">
                        {part.brand}
                    </span>
                )}
                {part?.category && (
                    <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-[10px] font-bold uppercase tracking-widest rounded-md border border-yellow-500/20">
                        {t(`cat_${part.category}`, part.category)}
                    </span>
                )}
            </div>

            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{t('lbl_sku', 'SKU')}: {part?.sku}</p>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight">{part?.name}</h3>



            {part?.short_description && (
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 line-clamp-3">
                    {part.short_description}
                </p>
            )}

            {/* Options Selection directly within the Card */}
            {part?.options && part.options.length > 0 && (
                <div className="mb-6 space-y-6 border-t border-slate-100 dark:border-white/5 pt-6">
                    {part.options.map((opt, idx) => (
                        <div key={idx} className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    {opt.name}
                                </label>
                                {errors?.selectedOptions?.[opt.name] && (
                                    <span className="text-red-500 text-[10px] font-bold truncate ml-2">
                                        {errors.selectedOptions[opt.name].message}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {opt.type === 'color' ? (
                                    opt.choices.map((c) => {
                                        const isSelected = selectedOptions?.[opt.name] === c.label;
                                        return (
                                            <button
                                                key={c.label}
                                                type="button"
                                                onClick={() => handleOptionSelect?.(opt.name, c.label)}
                                                className={`flex items-center gap-2 p-1.5 rounded-full border-2 transition-all outline-none ${isSelected ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'}`}
                                            >
                                                <span className="w-6 h-6 rounded-full shadow-inner border border-slate-200 dark:border-white/10" style={{ backgroundColor: c.colorCode }}></span>
                                                <span className={`text-[11px] font-bold pr-2 ${isSelected ? 'text-yellow-700 dark:text-yellow-500' : 'text-slate-600 dark:text-slate-400'}`}>{c.label}</span>
                                            </button>
                                        );
                                    })
                                ) : (
                                    opt.choices.map((c) => {
                                        const choiceLabel = typeof c === 'object' ? c.label : c;
                                        const isSelected = selectedOptions?.[opt.name] === choiceLabel;
                                        return (
                                            <button
                                                key={choiceLabel}
                                                type="button"
                                                onClick={() => handleOptionSelect?.(opt.name, choiceLabel)}
                                                className={`px-4 py-2 rounded-xl border transition-all text-xs font-bold outline-none ${isSelected ? 'border-yellow-500 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500' : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-400 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-white'}`}
                                            >
                                                {choiceLabel}
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="pt-6 border-t border-slate-100 dark:border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-bold uppercase">{t('preorder_temp_total', 'Tạm tính')}</p>
                    <p className="text-2xl font-black text-yellow-500 tracking-tighter">{formatVND(part?.price || 0)}</p>
                </div>
                {part?.original_price > part?.price && (
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 line-through">
                        <span>{t('preorder_orig_price', 'Giá công bố')}</span>
                        <span>{formatVND(part.original_price)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SummaryCard;
