import { usePartCardLogic } from './hooks/usePartCardLogic';
import PartImage from './components/PartImage';
import PartInfo from './components/PartInfo';
import PartActions from './components/PartActions';
import PartCardSkeleton from './components/PartCardSkeleton';
import { formatVND } from '@/pages/Customer/Cars/utils/formatters';

const PartCard = ({ part }) => {
    const {
        t,
        isOutOfStock,
        isWishlisted,
        isAddingToCart,
        handleCardClick,
        handleToggleWishlist,
        handleAddToCart,
        handlePreorder
    } = usePartCardLogic(part);

    const formattedPrice = formatVND(part.price);
    const subInfo = `${t('sku', 'Mã SP:')} ${part.sku} • ${part.compatible_brands?.length > 0 ? part.compatible_brands.join(', ') : t('universal_badge', 'Phổ thông')}`;

    return (
        <div className="group flex flex-col bg-white dark:bg-[#141416] rounded-[24px] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-50 dark:border-white/5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 h-full relative">
            <PartImage 
                part={part} 
                t={t} 
                isWishlisted={isWishlisted} 
                onToggleWishlist={handleToggleWishlist} 
            />

            <div
                className="flex flex-col flex-1 pl-1 pr-1 cursor-pointer"
                onClick={handleCardClick}
            >
                <PartInfo 
                    part={part} 
                    subInfo={subInfo} 
                />

                <PartActions 
                    t={t}
                    formattedPrice={formattedPrice}
                    isOutOfStock={isOutOfStock}
                    isAddingToCart={isAddingToCart}
                    onAddToCart={handleAddToCart}
                    onPreorder={handlePreorder}
                />
            </div>
        </div>
    );
};

export { PartCardSkeleton };
export default PartCard;
