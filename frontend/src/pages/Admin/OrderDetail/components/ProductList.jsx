import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../../Orders/utils/formatters';

export const ProductList = ({ items, t }) => {
    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-8 border border-slate-200 dark:border-white/5 mb-8">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-[11px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac] flex items-center gap-2">
                    <ShoppingCart size={16} /> {t('product_list_title')}
                </h2>
                <span className="text-sm font-medium text-slate-500 dark:text-[#d3c5ac]">
                    {t('item_count', { count: items?.length || 0, defaultValue: `${items?.length || 0} Items` })}
                </span>
            </div>

            <div className="flex flex-col gap-6">
                {items?.map((item, index) => (
                    <div key={item._id || index} className="flex items-center gap-6 bg-slate-50 dark:bg-[#1a1a1c] p-4 rounded-xl border border-slate-100 dark:border-white/5">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 truncate">
                                {item.name}
                            </h3>
                            {item.properties && (
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 truncate">
                                    {item.properties}
                                </p>
                            )}
                            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                                <span className="text-yellow-600 dark:text-yellow-500">{t('sku')} {item.sku}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                                {formatCurrency(item.unit_price)} × {item.quantity}
                            </p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">
                                {formatCurrency(item.total_price)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
