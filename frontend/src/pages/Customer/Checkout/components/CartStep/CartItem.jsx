import { Checkbox, Image, Button } from 'antd';
import { Heart, Plus, Minus, Trash2, CheckCircle2, AlertTriangle, Store, Package } from 'lucide-react';
import { formatVND } from '@/pages/Customer/Cars/utils/formatters';
import { useCartItemLogic } from './hooks/useCartItemLogic';

const CartItem = ({ item, updateQuantity, removeItem, toggleItemCheck, t }) => {
    const { 
        isWishlisted, 
        handleToggleWishlist, 
        totalStock, 
        isOutOfStock, 
        isLowStock 
    } = useCartItemLogic(item, t);

    return (
        <div className={`group flex flex-col md:flex-row items-start md:items-center gap-6 p-4 rounded-3xl bg-white dark:bg-[#141416] hover:shadow-xl dark:hover:shadow-[0_20px_60px_rgba(255,255,255,0.02)] transition-all duration-300 border ${item.checked ? 'border-yellow-500/50' : 'border-slate-100 dark:border-white/5'} hover:border-slate-200 dark:hover:border-white/20`}>
            <Checkbox
                checked={item.checked}
                onChange={() => toggleItemCheck(item.id)}
                className="[&_.ant-checkbox-inner]:border-slate-300 dark:[&_.ant-checkbox-inner]:border-white/20 [&_.ant-checkbox-checked_.ant-checkbox-inner]:bg-yellow-500 [&_.ant-checkbox-checked_.ant-checkbox-inner]:border-yellow-500"
            />

            <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 flex-shrink-0 flex items-center justify-center">
                <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-2xl"
                    rootClassName="w-full h-full flex items-center justify-center"
                    preview={true}
                />
            </div>

            <div className="flex-grow flex flex-col justify-between py-1 w-full">
                <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</h3>
                            <p className="text-xs text-slate-400 mt-1">SKU: {item.sku}</p>
                        </div>
                        <span className="text-xl font-black text-slate-900 dark:text-yellow-500 shrink-0">
                            {formatVND(item.price)}
                        </span>
                    </div>

                    {item.selected_options && Object.keys(item.selected_options).length > 0 && (
                        <div className="flex flex-wrap items-center gap-2.5 mb-3.5 mt-1">
                            {Object.entries(item.selected_options).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-md bg-slate-50/50 hover:bg-slate-50 dark:bg-[#1a1d24]/50 dark:hover:bg-[#1a1d24] border border-slate-200/50 dark:border-white/5 transition-colors">
                                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{key}</span>
                                    <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                    <span className="text-[13px] font-black tracking-tight text-slate-800 dark:text-slate-200">{value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-4">
                        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border border-slate-100 dark:border-white/5 px-2.5 py-1.5 rounded-lg bg-transparent">
                            {t('cart_condition', 'Tình trạng:')} <strong className="text-slate-800 dark:text-slate-200 uppercase tracking-widest">{item.condition_name || item.condition || t('cart_condition_new', 'Mới 100%')}</strong>
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
                                {item.inventory ? (
                                    <div className="flex flex-col gap-1.5">
                                        {item.inventory.showroom > 0 ? (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50/80 dark:bg-emerald-500/10 border border-emerald-100/50 dark:border-emerald-500/20 w-max">
                                                <Store size={12} className="text-emerald-500" strokeWidth={2.5} />
                                                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                                                    {t('cart_ready_garage', 'Sẵn sàng lắp ráp tại Garage')}
                                                </span>
                                            </div>
                                        ) : item.inventory.warehouse > 0 ? (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50/80 dark:bg-blue-500/10 border border-blue-100/50 dark:border-blue-500/20 w-max">
                                                <Package size={12} className="text-blue-500" strokeWidth={2.5} />
                                                <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400">
                                                    {t('cart_ship_warehouse', 'Giao từ Kho (1-2 ngày)')}
                                                </span>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : (
                                    !isLowStock && (
                                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
                                            <CheckCircle2 size={14} /> {t('cart_in_stock', 'Còn hàng')}
                                        </span>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4 border-t border-slate-100 dark:border-white/5 pt-4">
                    <div className="flex items-center bg-slate-50 dark:bg-[#0a0a0b] rounded-xl p-1 border border-slate-100 dark:border-white/5">
                        <button
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-white/10 rounded-lg transition-all text-slate-600 dark:text-slate-400 disabled:opacity-30"
                        >
                            -
                        </button>
                        <span className="w-10 text-center font-bold text-sm text-slate-900 dark:text-white">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, 1)}
                            disabled={item.quantity >= (item.inventory ? (item.inventory.showroom + item.inventory.warehouse) : (item.stock || 99))}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-white/10 rounded-lg transition-all text-slate-600 dark:text-slate-400 disabled:opacity-30"
                        >
                            +
                        </button>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button
                            type="text"
                            onClick={handleToggleWishlist}
                            icon={<Heart size={18} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={2.5} />}
                            className={`p-2 transition-colors shadow-none group/heart ${isWishlisted ? 'text-pink-500 hover:text-pink-600' : 'text-slate-400 hover:text-pink-500 hover:!bg-transparent'}`}
                        />
                        <Button
                            type="text"
                            onClick={() => removeItem(item.id)}
                            icon={<Trash2 size={18} strokeWidth={2.5} />}
                            className="p-2 text-slate-400 hover:!text-rose-500 dark:hover:!text-rose-400 hover:!bg-transparent transition-colors shadow-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
