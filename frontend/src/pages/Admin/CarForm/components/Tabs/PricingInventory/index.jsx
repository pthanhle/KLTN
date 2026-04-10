import React, { useState, useEffect } from 'react';
import PricingCard from './components/PricingCard';
import InventoryCard from './components/InventoryCard/index';

const PricingInventoryTab = ({ form }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full max-w-5xl mx-auto pb-32 pt-8">
            <div className="space-y-8">
                <PricingCard form={form} isLoading={isLoading} />
                <InventoryCard isLoading={isLoading} />
            </div>
        </div>
    );
};

export default PricingInventoryTab;
