import { Button } from 'antd';
import { Heart, Trash2 } from 'lucide-react';

const CartItemActions = ({
    item,
    totalStock,
    updateQuantity,
    removeItem,
    isWishlisted,
    handleToggleWishlist
}) => {
    return (
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
                    disabled={item.quantity >= totalStock}
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
    );
};

export default CartItemActions;