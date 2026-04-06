import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../../hooks/useDebounce';
import { message } from 'antd';

export const usePartsTable = (initialParts) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [brandFilter, setBrandFilter] = useState('all');
    const debouncedSearch = useDebounce(searchTerm, 300);

    const filteredParts = useMemo(() => {
        let result = initialParts || [];
        
        if (debouncedSearch.trim()) {
            const lowerSearch = debouncedSearch.toLowerCase();
            result = result.filter(p => 
                p.name.toLowerCase().includes(lowerSearch) ||
                p.sku.toLowerCase().includes(lowerSearch)
            );
        }

        if (categoryFilter !== 'all') {
            result = result.filter(p => p.category === categoryFilter);
        }

        if (brandFilter !== 'all') {
            result = result.filter(p => p.compatible_brands && p.compatible_brands.includes(brandFilter));
        }

        return result;
    }, [initialParts, debouncedSearch, categoryFilter, brandFilter]);

    const stats = useMemo(() => {
        const baseParts = initialParts || [];
        return {
            totalParts: baseParts.length,
            outOfStock: baseParts.filter(p => !p.stock || p.stock === 0).length,
            totalValue: baseParts.reduce((sum, p) => sum + ((parseFloat(p.price) || 0) * (parseFloat(p.stock) || 0)), 0),
            totalCategories: new Set(baseParts.filter(p => p.category).map(p => p.category)).size
        };
    }, [initialParts]);

    return {
        filteredParts,
        stats,
        searchTerm,
        setSearchTerm,
        categoryFilter,
        setCategoryFilter,
        brandFilter,
        setBrandFilter
    };
};
