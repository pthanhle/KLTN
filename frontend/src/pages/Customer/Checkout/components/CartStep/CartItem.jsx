import { Checkbox, Image, Button } from 'antd';
import { Heart, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';

const CartItem = ({ item, updateQuantity, removeItem, toggleItemCheck, t }) => {
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
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2 sm:mb-0">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{item.name}</h3>
                            <p className="text-xs text-slate-400 mt-0.5">SKU: {item.sku}</p>
                        </div>
                        <span className="text-xl font-black text-slate-900 dark:text-yellow-500 shrink-0">
                            {new Intl.NumberFormat('vi-VN').format(item.price)} đ
                        </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-4">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 bg-slate-50 dark:bg-white/5 px-2 py-1 rounded-md">
                            {t('cart_condition', 'Tình trạng:')} <span className="text-slate-900 dark:text-white font-bold">{item.condition}</span>
                        </span>
                        {item.stock > 5 ? (
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 size={14} /> {t('cart_in_stock', 'Còn hàng')}
                            </span>
                        ) : item.stock > 0 ? (
                            <span className="text-xs font-bold text-orange-500 dark:text-orange-400 flex items-center gap-1">
                                <AlertTriangle size={14} /> {t('cart_low_stock', { count: item.stock, defaultValue: `Chỉ còn ${item.stock} SP` })}
                            </span>
                        ) : (
                            <span className="text-xs font-bold text-rose-500 flex items-center gap-1">
                                <AlertTriangle size={14} /> {t('cart_out_of_stock', 'Tạm hết')}
                            </span>
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
                            disabled={item.quantity >= item.stock}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white dark:hover:bg-white/10 rounded-lg transition-all text-slate-600 dark:text-slate-400 disabled:opacity-30"
                        >
                            +
                        </button>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Button 
                            type="text" 
                            icon={<Heart size={18} strokeWidth={2.5} />} 
                            className="p-2 text-slate-400 hover:!text-rose-500 hover:!bg-transparent transition-colors shadow-none"
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
