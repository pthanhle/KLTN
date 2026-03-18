import { Checkbox, Image, Button } from 'antd';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { Link } from 'react-router-dom';

const CartStep = ({ hookState }) => {
    const { 
        t, cartItems, subtotal, hasCheckedItems, 
        toggleItemCheck, toggleAllChecks, updateQuantity, removeItem, applyPromoCode, proceedToPayment 
    } = hookState;

    const allChecked = cartItems.length > 0 && cartItems.every(item => item.checked);
    const checkedCount = cartItems.filter(item => item.checked).length;

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in-95 duration-500 max-w-md mx-auto">
                <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Image src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png" alt="Empty Cart" className="w-20 opacity-50 grayscale dark:invert" preview={false} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                    {t('cart_empty')}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
                    {t('cart_empty_desc')}
                </p>
                <Link to="/products">
                    <Button type="primary" className="bg-slate-900 border-none h-12 hover:!bg-slate-800 dark:bg-white dark:hover:!bg-slate-200 dark:!text-slate-900 text-white font-bold px-8 py-4 rounded-full transition-all active:scale-95 text-sm uppercase tracking-widest shadow-xl">
                        {t('cart_continue_shopping')}
                    </Button>
                </Link>
            </div>
        );
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
                    proceedToPayment={proceedToPayment}
                    applyPromoCode={applyPromoCode}
                    t={t}
                />
            </div>
        </div>
    );
};

export default CartStep;
