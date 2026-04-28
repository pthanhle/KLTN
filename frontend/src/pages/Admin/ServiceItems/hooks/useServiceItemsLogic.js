import { useState, useMemo } from 'react';
import { MOCK_SERVICE_ITEMS } from '../data/serviceItems.mock';
import { PRICE_TYPE_OPTIONS } from '../constants/serviceItems.constants';

export const useServiceItemsLogic = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceType, setSelectedPriceType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Simulate React Query fetch (Mock)
    const isLoading = false;
    const items = MOCK_SERVICE_ITEMS;

    // Dynamically generate Category options from the data itself (No hardcoding)
    const categoryOptions = useMemo(() => {
        const uniqueCategories = [...new Set(items.map(item => item.category))];
        return uniqueCategories.map(cat => ({
            value: cat,
            label: cat
        }));
    }, [items]);

    // Filtering logic
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesSearch = item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.sku.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
            const matchesPriceType = selectedPriceType ? item.priceType === selectedPriceType : true;

            return matchesSearch && matchesCategory && matchesPriceType;
        });
    }, [items, searchTerm, selectedCategory, selectedPriceType]);

    // Pagination logic
    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredItems.slice(start, start + pageSize);
    }, [filteredItems, currentPage]);

    return {
        // State
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedPriceType,
        setSelectedPriceType,
        currentPage,
        setCurrentPage,
        pageSize,
        categoryOptions,
        priceOptions: PRICE_TYPE_OPTIONS,
        items: paginatedItems,
        totalItems: filteredItems.length,
        isLoading,
    };
};
