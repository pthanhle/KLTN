import { CheckCircle2, AlertTriangle, Package } from 'lucide-react';

const CartItemStock = ({ item, t, isOutOfStock, isLowStock, totalStock }) => {
    return (
        <div className="mt-2 flex flex-wrap items-center gap-4">
            <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border border-slate-100 dark:border-white/5 px-2.5 py-1.5 rounded-lg bg-transparent">
                {t('cart_condition', 'Tình trạng:')} <strong className="text-slate-800 dark:text-slate-200 uppercase tracking-widest">{item.condition_name || t(`cart_condition_${item.condition}`, 'Mới 100%')}</strong>
            </div>

            {isOutOfStock ? (
                <span className="text-[11px] font-bold text-rose-500 flex items-center gap-1.5 bg-rose-50 dark:bg-rose-500/10 px-2.5 py-1.5 rounded-lg border border-rose-100 dark:border-rose-500/20">
                    <AlertTriangle size={14} /> {t('cart_out_of_stock', 'Tạm hết hàng')}
                </span>
            ) : (
                <div className="flex items-center gap-2 flex-wrap">
                    {isLowStock && (
                        <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1.5 bg-orange-50 dark:bg-orange-500/10 px-2.5 py-1.5 rounded-lg border border-orange-100 dark:border-orange-500/20 animate-pulse">
                            <AlertTriangle size={14} /> {t('cart_low_stock', { count: totalStock, defaultValue: `Sắp hết (còn ${totalStock})` })}
                        </span>
                    )}
                    {item.inventory && totalStock > 0 ? (
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50/80 dark:bg-emerald-500/10 border border-emerald-100/50 dark:border-emerald-500/20 w-max">
                                <Package size={12} className="text-emerald-500" strokeWidth={2.5} />
                                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                                    {t('cart_ready_delivery', 'Sẵn sàng giao')}
                                </span>
                            </div>
                        </div>
                    ) : (
                        !isLowStock && !isOutOfStock && (
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
                                <CheckCircle2 size={14} /> {t('cart_in_stock', 'Còn hàng')}
                            </span>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default CartItemStock;
