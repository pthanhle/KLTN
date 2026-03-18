import React from 'react';
import { useWishlistLogic } from './hooks/useWishlistLogic';

import WishlistHeader from './components/Header/WishlistHeader';
import WishlistCard from './components/Cards/WishlistCard';
import EmptyWishlist from './components/EmptyState/EmptyWishlist';

const WishlistPage = () => {
    const {
        t,
        items,
        isRemoving,
        isAddingToCart,
        formatCurrency,
        handleRemoveItem,
        handleClearAll,
        handleAddToCart
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
                    {items.length > 0 ? (
                        items.map((item) => (
                            <WishlistCard 
                                key={item.id}
                                item={item}
                                isRemoving={isRemoving === item.id}
                                isAddingToCart={isAddingToCart === item.id}
                                onRemove={handleRemoveItem}
                                onAddToCart={handleAddToCart}
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
