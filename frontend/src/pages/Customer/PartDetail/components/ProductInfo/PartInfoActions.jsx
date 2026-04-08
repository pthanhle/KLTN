import React from 'react';
import ProductMeta from './components/ProductMeta';
import ProductOptions from './components/ProductOptions';
import ProductActions from './components/ProductActions';
import TrustBadges from './components/TrustBadges';

export const PartInfoActions = ({ part, selectedOptions, quantity, handleOptionSelect, handleQuantityChange, formatCurrency, handleAddToCart, handleBuyNow, t, isSubmittingAction }) => {
    return (
        <div className="lg:col-span-5 space-y-8">
            <ProductMeta part={part} t={t} formatCurrency={formatCurrency} />
            
            <ProductOptions 
                part={part} 
                selectedOptions={selectedOptions} 
                handleOptionSelect={handleOptionSelect} 
            />
            
            <ProductActions 
                part={part} 
                selectedOptions={selectedOptions} 
                quantity={quantity} 
                handleQuantityChange={handleQuantityChange} 
                handleAddToCart={handleAddToCart}
                handleBuyNow={handleBuyNow} 
                t={t} 
                isSubmittingAction={isSubmittingAction} 
            />
            
            <TrustBadges t={t} />
        </div>
    );
};

export default PartInfoActions;
