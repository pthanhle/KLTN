import { useState, useEffect } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import { BRANDS_MOCK_DATA } from '../data/products.mock';

export const useProductsLogic = () => {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500); // 500ms delay for typing

    const [activeLetter, setActiveLetter] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; 

    // Inject external mock data
    const brandsData = BRANDS_MOCK_DATA;

    const [filteredBrands, setFilteredBrands] = useState([]);
    const [paginatedBrands, setPaginatedBrands] = useState([]);

    // Data filtering and fetching effect
    useEffect(() => {
        setIsFiltering(true);
        
        const timer = setTimeout(() => {
            let result = brandsData;

            // Apply debounced search filter
            if (debouncedSearch) {
                result = result.filter(b => b.name.toLowerCase().includes(debouncedSearch.toLowerCase()));
            }

            // Apply alphabet filter
            if (activeLetter !== 'ALL') {
                result = result.filter(b => b.name.toUpperCase().startsWith(activeLetter));
            }

            setFilteredBrands(result);
            setCurrentPage(1); 
            
            setIsFiltering(false);
            if (isInitialLoading) setIsInitialLoading(false);

        }, 400); // Simulate network request delay

        return () => clearTimeout(timer);
    }, [debouncedSearch, activeLetter, brandsData]);

    // Pagination slice effect
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedBrands(filteredBrands.slice(startIndex, endIndex));
    }, [currentPage, filteredBrands]);

    const handleSearchChange = (val) => setSearch(val);
    const handleLetterChange = (letter) => setActiveLetter(letter);
    const handlePageChange = (page) => setCurrentPage(page);

    const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);

    return {
        isInitialLoading,
        isFiltering,
        search,
        paginatedBrands,
        filteredBrandsLength: filteredBrands.length,
        activeLetter,
        currentPage,
        totalPages,
        handleSearchChange,
        handleLetterChange,
        handlePageChange,
    };
};
