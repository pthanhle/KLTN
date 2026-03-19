import { Checkbox, Image, Button } from 'antd';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { Link } from 'react-router-dom';
import EmptyCart from './EmptyCart';

const CartStep = ({ hookState }) => {
    const { 
        t, cartItems, subtotal, hasCheckedItems, 
        toggleItemCheck, toggleAllChecks, updateQuantity, removeItem, moveToWishlist, proceedToPayment 
    } = hookState;

    const allChecked = cartItems.length > 0 && cartItems.every(item => item.checked);
    const checkedCount = cartItems.filter(item => item.checked).length;

    if (cartItems.length === 0) {
        return <EmptyCart t={t} />;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-start">
            <div className="lg:col-span-7 animate-in fade-in slide-in-from-left-4 duration-700">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-200 dark:border-white/10 gap-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">{t('cart_title')}</h1>
                        <span className="px-3 py-1.5 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-widest rounded-full mt-2">
                            {t('cart_items', { count: cartItems.length })}
                        </span>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <Checkbox 
                            checked={allChecked} 
                            onChange={(e) => toggleAllChecks(e.target.checked)}
                            className="[&_.ant-checkbox-inner]:border-slate-300 dark:[&_.ant-checkbox-inner]:border-white/20 [&_.ant-checkbox-checked_.ant-checkbox-inner]:bg-yellow-500 [&_.ant-checkbox-checked_.ant-checkbox-inner]:border-yellow-500"
                        />
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors uppercase tracking-widest pt-0.5">
                            {t('cart_select_all')} ({checkedCount})
                        </span>
                    </label>
                </div>
                
                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <CartItem 
                            key={item.id} 
                            item={item} 
                            updateQuantity={updateQuantity}
                            removeItem={removeItem}
                            moveToWishlist={moveToWishlist}
                            toggleItemCheck={toggleItemCheck}
                            t={t}
                        />
                    ))}
                </div>
            </div>

            <div className="lg:col-span-3">
                <CartSummary 
                    subtotal={subtotal} 
                    hasCheckedItems={hasCheckedItems}
                    checkedCount={checkedCount}
                    proceedToPayment={proceedToPayment}
                    t={t}
                />
            </div>
        </div>
    );
};

export default CartStep;
