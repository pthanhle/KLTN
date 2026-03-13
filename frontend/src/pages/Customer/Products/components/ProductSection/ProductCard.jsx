import { ArrowRight, Heart } from 'lucide-react';
import { Image } from 'antd';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => {
    return (
        <div className="flex flex-col bg-white dark:bg-[#141416] rounded-3xl p-4 shadow-sm border border-slate-100 dark:border-white/5 h-full space-y-4">
            <Skeleton className="w-full h-[220px] rounded-2xl" />
            <div className="flex flex-col flex-1 space-y-3">
                <div className="flex justify-between items-start">
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                </div>
                <Skeleton className="h-10 w-full" />
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ product }) => {
    // Format Price
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(product.price);

    return (
        <div className="group relative flex flex-col bg-white dark:bg-[#141416] rounded-3xl p-4 shadow-sm hover:shadow-xl dark:shadow-none hover:border-yellow-200 dark:hover:border-premium-gold/50 border border-slate-100 dark:border-white/5 transition-all duration-300 h-full cursor-pointer">
            
            {/* Image Container */}
            <div className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 mb-4 group-hover:opacity-95 transition-opacity">
                {product.images && product.images.length > 0 ? (
                    <Image 
                        src={product.images[0]} 
                        alt={product.product_name} 
                        wrapperClassName="w-full h-full"
                        className="!w-full !h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
                )}
                
                {/* Tag Overlay */}
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-[#0a0a0b]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black tracking-wider text-slate-800 dark:text-white uppercase">
                    {product.type}
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-yellow-600 dark:group-hover:text-premium-gold transition-colors">
                        {product.product_name}
                    </h3>
                    <button className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0">
                        <Heart size={20} strokeWidth={2} />
                    </button>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">
                    {product.description}
                </p>

                {/* Footer block (Price & Action) aligns bottom */}
                <div className="mt-auto flex items-end justify-between border-t border-slate-100 dark:border-white/5 pt-4">
                    <div>
                        <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                            {formattedPrice}
                        </span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-500 ml-1 uppercase">VND</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-[#0a0a0b] flex items-center justify-center group-hover:bg-yellow-500 dark:group-hover:bg-premium-gold group-hover:text-white dark:group-hover:text-[#0a0a0b] transition-colors">
                        <ArrowRight size={18} strokeWidth={2.5} />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ProductCard;
