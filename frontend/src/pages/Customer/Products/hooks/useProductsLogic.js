import { useState, useEffect } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import { DEFAULT_PAGE_LIMIT, ITEMS_PER_PAGE, DEBOUNCE_DELAY, FILTER_DELAY } from '../constants/products.constants';
import { BRANDS_MOCK_DATA } from '../data/products.mock';

export const useProductsLogic = () => {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

    const [activeLetter, setActiveLetter] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);

    const [allBrands, setAllBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [paginatedBrands, setPaginatedBrands] = useState([]);

    // Fetch original data from backend (mocked during development for consistency)
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                // Simulate network latency (200ms)
                await new Promise(resolve => setTimeout(resolve, 200));
                
                // Trả về data faked (đồng bộ với mock schema của /parts và /cars)
                setAllBrands(BRANDS_MOCK_DATA);
            } catch (error) {
                console.error("Failed to fetch mock categories:", error);
            } finally {
                setIsInitialLoading(false);
            }
        };

        fetchBrands();
    }, []);

    // Data filtering effect
    useEffect(() => {
        setIsFiltering(true);
        
        const timer = setTimeout(() => {
            let result = allBrands;

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

        }, FILTER_DELAY); 

        return () => clearTimeout(timer);
    }, [debouncedSearch, activeLetter, allBrands]);

    // Pagination slice effect
    useEffect(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setPaginatedBrands(filteredBrands.slice(startIndex, endIndex));
    }, [currentPage, filteredBrands]);

    const handleSearchChange = (val) => setSearch(val);
    const handleLetterChange = (letter) => setActiveLetter(letter);
    const handlePageChange = (page) => setCurrentPage(page);

    const totalPages = Math.ceil(filteredBrands.length / ITEMS_PER_PAGE);

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
