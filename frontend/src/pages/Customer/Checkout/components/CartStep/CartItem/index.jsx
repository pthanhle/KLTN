import CartItemImage from './components/CartItemImage';
import CartItemInfo from './components/CartItemInfo';
import CartItemStock from './components/CartItemStock';
import CartItemActions from './components/CartItemActions';
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
            
            <CartItemImage 
                item={item}
                isOutOfStock={isOutOfStock}
                toggleItemCheck={toggleItemCheck}
            />

            <div className="flex-grow flex flex-col justify-between py-1 w-full">
                <div>
                    <CartItemInfo 
                        item={item} 
                    />

                    <CartItemStock 
                        item={item}
                        t={t}
                        totalStock={totalStock}
                        isOutOfStock={isOutOfStock}
                        isLowStock={isLowStock}
                    />
                </div>

                <CartItemActions 
                    item={item}
                    totalStock={totalStock}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                    isWishlisted={isWishlisted}
                    handleToggleWishlist={handleToggleWishlist}
                />
            </div>
        </div>
    );
};

export default CartItem;
