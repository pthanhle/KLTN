import { useState, useEffect, useMemo, useCallback } from 'react';
import { MOCK_PARTS, MOCK_BRANDS } from '../data/parts.mock';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

const SORT_OPTIONS = ['newest', 'price_asc', 'price_desc', 'popular'];
const ITEMS_PER_PAGE = 9;
const PRICE_MAX = 35000000;

export const usePartsLogic = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);

    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [includeUniversal, setIncludeUniversal] = useState(true);
    const [priceRange, setPriceRange] = useState([0, PRICE_MAX]);
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [brandSearch, setBrandSearch] = useState('');

    const debouncedSearch = useDebounce(search, 400);

    const filteredParts = useMemo(() => {
        let result = MOCK_PARTS;

        if (activeCategory !== 'all') {
            result = result.filter(p => p.category === activeCategory);
        }

        if (debouncedSearch) {
            const q = debouncedSearch.toLowerCase();
            result = result.filter(p =>
                p.product_name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q)
            );
        }

        if (selectedBrands.length > 0) {
            result = result.filter(p => {
                const isUniversal = p.compatible_brands.length === 0;
                const matchesBrand = p.compatible_brands.some(b => selectedBrands.includes(b));
                return matchesBrand || (includeUniversal && isUniversal);
            });
        }

        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        if (sortBy === 'price_asc') result = [...result].sort((a, b) => a.price - b.price);
        else if (sortBy === 'price_desc') result = [...result].sort((a, b) => b.price - a.price);
        else if (sortBy === 'popular') result = [...result].sort((a, b) => b.stock_quantity - a.stock_quantity);

        return result;
    }, [debouncedSearch, activeCategory, selectedBrands, includeUniversal, priceRange, sortBy]);

    const paginatedParts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredParts.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredParts, currentPage]);

    const totalPages = Math.ceil(filteredParts.length / ITEMS_PER_PAGE);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isLoading) return;
        setIsFiltering(true);
        const timer = setTimeout(() => {
            setCurrentPage(1);
            setIsFiltering(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [debouncedSearch, activeCategory, selectedBrands, includeUniversal, priceRange, sortBy]);

    const handleBrandToggle = useCallback((brandId) => {
        if (brandId === null) {
            setSelectedBrands([]);
            return;
        }
        setSelectedBrands(prev =>
            prev.includes(brandId) ? prev.filter(b => b !== brandId) : [...prev, brandId]
        );
    }, []);

    const handleClearFilters = useCallback(() => {
        setSearch('');
        setActiveCategory('all');
        setSelectedBrands([]);
        setIncludeUniversal(true);
        setPriceRange([0, PRICE_MAX]);
        setSortBy('newest');
        setCurrentPage(1);
    }, []);

    const filteredBrandsOption = useMemo(
        () => MOCK_BRANDS.filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase())),
        [brandSearch]
    );

    const hasActiveFilters = selectedBrands.length > 0 || activeCategory !== 'all' || !!debouncedSearch;

    return {
        isLoading,
        isFiltering,
        search,
        activeCategory,
        selectedBrands,
        includeUniversal,
        priceRange,
        sortBy,
        currentPage,
        totalPages,
        paginatedParts,
        totalCount: filteredParts.length,
        brandSearch,
        brandsOption: filteredBrandsOption,
        hasActiveFilters,
        allBrands: MOCK_BRANDS,
        sortOptions: SORT_OPTIONS,
        priceMax: PRICE_MAX,
        setSearch,
        setActiveCategory,
        handleBrandToggle,
        setIncludeUniversal,
        setPriceRange,
        setSortBy,
        setCurrentPage,
        setBrandSearch,
        handleClearFilters,
    };
};
