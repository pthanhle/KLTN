import { useState, useEffect } from 'react';
import { useCarsFilter } from './useCarsFilter';
import { useCarsSelection } from './useCarsSelection';
import { useDynamicTaxonomies } from './useDynamicTaxonomies';
import { getAdminProducts, updateAdminProduct } from '../../../../services/api/adminProduct.api';

export const useCarsCatalogLogic = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [carsData, setCarsData] = useState([]);
    const [totalCars, setTotalCars] = useState(0);

    // 1. Compose Micro-Hooks
    const filterState = useCarsFilter();
    const taxonomyState = useDynamicTaxonomies();
    
    // Compose Selection Hook with Dynamic Derived Data
    const selectionState = useCarsSelection(carsData);

    // 2. Fetch from API
    useEffect(() => {
        let isMounted = true;
        
        setIsLoading(true);
        const fetchCars = async () => {
            try {
                // Here we fetch all without pagination since admin table might handle it locally,
                // or pass pagination info up to the table. We simulate the original UX where mapping handled all.
                const params = {
                    current: 1,
                    pageSize: 1000, // fetch all for local table, or implement table pagination
                    search: filterState.searchTerm,
                    brand: filterState.filterBrand,
                    bodyStyle: filterState.filterBodyStyle,
                    status: filterState.filterStatus
                };
                
                const response = await getAdminProducts(params);
                if (isMounted) {
                    setCarsData(response.products);
                    setTotalCars(response.pagination.total);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Failed to load admin cars:", error);
                if (isMounted) setIsLoading(false);
            }
        };

        const timer = setTimeout(() => fetchCars(), 500);
        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [filterState.searchTerm, filterState.filterBrand, filterState.filterBodyStyle, filterState.filterStatus]);

    // 3. Actions
    const handleToggleDemo = async (id) => {
        // Optimistic update UX
        const car = carsData.find(c => c.id === id || c._id === id);
        if (!car) return;
        
        const newStatus = !car.isDemoAvailable;
        setCarsData(prev => prev.map(c => (c.id === id || c._id === id) ? { ...c, isDemoAvailable: newStatus } : c));
        
        try {
            await updateAdminProduct(id, { isDemoAvailable: newStatus });
        } catch (error) {
            console.error("Failed to update demo status:", error);
            // Revert optimistic update
            setCarsData(prev => prev.map(c => (c.id === id || c._id === id) ? { ...c, isDemoAvailable: !newStatus } : c));
        }
    };

    return {
        cars: carsData,
        totalCars,
        isLoading,
        ...filterState,
        ...selectionState,
        ...taxonomyState,
        handleToggleDemo
    };
};
