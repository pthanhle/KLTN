import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard, { ProductCardSkeleton } from './ProductCard';

const ProductGrid = ({ isLoading, products }) => {
    return (
        <div className="flex-1 w-full flex flex-col h-full">
            
            {/* Grid display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {isLoading ? (
                    Array.from({ length: 9 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))
                ) : products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-white/5 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
                        <p className="text-lg text-slate-500 dark:text-slate-400 font-bold mb-2">No vehicles found</p>
                        <p className="text-sm text-slate-400 dark:text-slate-500">Try adjusting your filters or search query.</p>
                    </div>
                )}
            </div>

            {/* Pagination Mock (matching screenshot UI) */}
            {!isLoading && products.length > 0 && (
                <div className="flex justify-center items-center space-x-2 pt-12 pb-6 mt-auto">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 shadow-sm text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-all">
                        <ChevronLeft size={18} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 dark:bg-premium-gold text-white dark:text-[#0a0a0b] font-bold shadow-md shadow-yellow-500/20 dark:shadow-premium-gold/20">
                        1
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 shadow-sm text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
                        2
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 shadow-sm text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
                        3
                    </button>
                    <span className="px-2 text-slate-400 font-bold">...</span>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 shadow-sm text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
                        12
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/10 shadow-sm text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-all">
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;
