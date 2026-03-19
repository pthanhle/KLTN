import React from 'react';
import { useWishlistLogic } from './hooks/useWishlistLogic';
import { Skeleton } from '@/components/ui/skeleton';

import WishlistHeader from './components/Header/WishlistHeader';
import WishlistCard from './components/Cards/WishlistCard';
import EmptyWishlist from './components/EmptyState/EmptyWishlist';

const WishlistPage = () => {
    const {
        t,
        isLoading,
        items,
        isRemoving,
        isAddingToCart,
        isBuyingNow,
        formatCurrency,
        handleRemoveItem,
        handleClearAll,
        handleAddToCart,
        handleBuyNow
    } = useWishlistLogic();

    return (
        <div className="bg-[#fcfcfc] dark:bg-[#0a0a0b] min-h-screen transition-colors duration-300">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                
                {/* Header Section */}
                <WishlistHeader 
                    itemCount={items.length} 
                    onClearAll={handleClearAll} 
                    t={t} 
                />

                {/* Main List Section */}
                <section className="flex flex-col gap-6" id="wishlist-list">
                    {isLoading ? (
                        [1, 2, 3].map(idx => (
                            <Skeleton key={idx} className="w-full h-[300px] md:h-[260px] rounded-3xl" />
                        ))
                    ) : items.length > 0 ? (
                        items.map((item) => (
                            <WishlistCard 
                                key={item.id}
                                item={item}
                                isRemoving={isRemoving === item.id}
                                isAddingToCart={isAddingToCart === item.id}
                                isBuyingNow={isBuyingNow === item.id}
                                onRemove={handleRemoveItem}
                                onAddToCart={handleAddToCart}
                                onBuyNow={handleBuyNow}
                                formatCurrency={formatCurrency}
                                t={t}
                            />
                        ))
                    ) : (
                        <EmptyWishlist t={t} />
                    )}
                </section>

            </main>
        </div>
    );
};

export default WishlistPage;
