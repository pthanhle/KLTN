import { useState, useMemo, useEffect } from 'react';
import { ADMIN_MOCK_CARS } from '../data/carsCatalog.mock';
import { applyAdminFilter } from '../utils/carsCatalogUtils';
import { useCarsFilter } from './useCarsFilter';
import { useCarsSelection } from './useCarsSelection';
import { useDynamicTaxonomies } from './useDynamicTaxonomies';

export const useCarsCatalogLogic = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [carsData, setCarsData] = useState([]);

    // 1. Compose Micro-Hooks
    const filterState = useCarsFilter();
    const taxonomyState = useDynamicTaxonomies();
    
    // Derived Pure Data based on Filters
    const filteredCars = useMemo(() => {
        return applyAdminFilter(carsData, {
            searchTerm: filterState.searchTerm,
            filterBrand: filterState.filterBrand,
            filterBodyStyle: filterState.filterBodyStyle,
            filterStatus: filterState.filterStatus
        });
    }, [carsData, filterState.searchTerm, filterState.filterBrand, filterState.filterBodyStyle, filterState.filterStatus]);

    // Compose Selection Hook with Dynamic Derived Data
    const selectionState = useCarsSelection(filteredCars);

    // 2. Simulate API Request UX
    useEffect(() => {
        const timer = setTimeout(() => {
            setCarsData(ADMIN_MOCK_CARS);
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // 3. Actions
    const handleToggleDemo = (id) => {
        console.log('Toggle Demo API trigger for:', id);
        // Optimistic update UX
        setCarsData(prev => prev.map(c => c.id === id ? { ...c, isDemoAvailable: !c.isDemoAvailable } : c));
    };

    return {
        cars: filteredCars,
        totalCars: carsData.length,
        isLoading,
        ...filterState,
        ...selectionState,
        ...taxonomyState,
        handleToggleDemo
    };
};
