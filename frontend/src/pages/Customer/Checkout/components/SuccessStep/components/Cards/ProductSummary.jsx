import { Image } from 'antd';
import { formatVND } from '@/pages/Customer/Cars/utils/formatters';

const ProductSummary = ({ items, total, t }) => {
    return (
        <div className="bg-white dark:bg-[#141416] p-8 md:p-10 rounded-[32px] shadow-xl dark:shadow-[0_20px_60px_rgba(255,255,255,0.02)] border border-slate-100 dark:border-white/5 h-full flex flex-col">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter pb-6 mb-6 border-b border-slate-100 dark:border-white/5">
                {t('success_product_summary')}
            </h3>

            <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
                {items.map((item, idx) => (
                    <div key={idx} className="flex gap-5 group cursor-default">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 dark:bg-white/5 shrink-0 flex items-center justify-center p-2 relative">
                            <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 rounded-2xl"></div>
                            <Image 
                                src={item.image} 
                                alt={item.name} 
                                preview={true} 
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                                rootClassName="w-full h-full" 
                            />
                        </div>
                        <div className="flex flex-col justify-center flex-1 min-w-0">
                            <h4 className="text-sm md:text-base font-bold text-slate-900 dark:text-white truncate mb-1" title={item.name}>
                                {item.name}
                            </h4>
                            {item.selected_options && Object.keys(item.selected_options).length > 0 && (
                                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 mb-2">
                                    {Object.entries(item.selected_options).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                                </p>
                            )}
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/10 px-2 py-1 rounded w-fit mb-3">
                                {t('success_qty', { count: String(item.quantity).padStart(2, '0') })}
                            </span>
                        </div>
                        <div className="flex flex-col items-end justify-center">
                            <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white shrink-0">
                                {formatVND(item.total_price || (item.unit_price * item.quantity))}
                            </span>
                            {item.quantity > 1 && (
                                <span className="text-[11px] text-slate-400 mt-1">
                                    {formatVND(item.unit_price)} {t('success_per_item', '/ sp')}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="h-px bg-slate-100 dark:bg-white/10 my-8"></div>

            <div className="mt-auto">
                <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-2 gap-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">{t('success_final_total', 'Tổng cộng thanh toán')}</span>
                    <span className="text-3xl sm:text-4xl font-black text-yellow-500 tracking-tighter whitespace-nowrap text-right">
                        {formatVND(total || 0)}
                    </span>
                </div>
                <div className="text-right text-[10px] italic text-slate-400 font-medium">
                    {t('success_tax_included')}
                </div>
            </div>
        </div>
    );
};

export default ProductSummary;
