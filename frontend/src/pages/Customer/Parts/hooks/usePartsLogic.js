import { useState, useMemo, useCallback, useEffect } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import { useClientPartsData } from '../../../../services/queries/clientPart.queries';
import { SORT_OPTIONS, ITEMS_PER_PAGE, PRICE_MAX } from '../constants/parts.constants';

export const usePartsLogic = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [includeUniversal, setIncludeUniversal] = useState(true);
    const [priceRange, setPriceRange] = useState([0, PRICE_MAX]);
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [brandSearch, setBrandSearch] = useState('');

    const debouncedSearch = useDebounce(search, 400);
    const debouncedPrice = useDebounce(priceRange, 400);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, activeCategory, selectedBrands, includeUniversal, debouncedPrice, sortBy]);

    const apiParams = useMemo(() => ({
        current: currentPage,
        pageSize: ITEMS_PER_PAGE,
        search: debouncedSearch,
        category: activeCategory,
        brand: selectedBrands.length > 0 ? selectedBrands.join(',') : '',
        includeUniversal: selectedBrands.length > 0 ? includeUniversal : true,
        minPrice: debouncedPrice ? debouncedPrice[0] : 0,
        maxPrice: debouncedPrice ? debouncedPrice[1] : PRICE_MAX,
        sortBy
    }), [currentPage, debouncedSearch, activeCategory, selectedBrands, includeUniversal, debouncedPrice, sortBy]);

    const { parts, pagination, isLoadingParts, isFetchingParts, categories, brands, isLoadingFilters } = useClientPartsData(apiParams);

    const handleBrandToggle = useCallback((brandName) => {
        if (brandName === null) {
            setSelectedBrands([]);
            return;
        }
        setSelectedBrands(prev =>
            prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
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
        () => brands.filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase())),
        [brands, brandSearch]
    );

    const hasActiveFilters = selectedBrands.length > 0 || activeCategory !== 'all' || !!debouncedSearch;

    return {
        isLoading: isLoadingParts || isLoadingFilters,
        isFiltering: isFetchingParts,
        search,
        activeCategory,
        selectedBrands,
        includeUniversal,
        priceRange,
        sortBy,
        currentPage,
        totalPages: pagination?.totalPages || 1,
        paginatedParts: parts,
        totalCount: pagination?.total || 0,
        brandSearch,
        brandsOption: filteredBrandsOption,
        hasActiveFilters,
        allBrands: brands,
        allCategories: categories,
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
