import { useState, useEffect } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import { DEFAULT_PAGE_LIMIT, ITEMS_PER_PAGE, DEBOUNCE_DELAY, FILTER_DELAY } from '../constants/products.constants';
import { useClientBrandsQuery } from '../../../../services/queries/brandQueries';

export const useProductsLogic = () => {
    const { data: allBrands = [], isLoading: isInitialLoading } = useClientBrandsQuery();

    const [isFiltering, setIsFiltering] = useState(false);

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

    const [activeLetter, setActiveLetter] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);

    const [filteredBrands, setFilteredBrands] = useState([]);
    const [paginatedBrands, setPaginatedBrands] = useState([]);

    useEffect(() => {
        setIsFiltering(true);

        const timer = setTimeout(() => {
            let result = allBrands;

            if (debouncedSearch) {
                result = result.filter(b => b.name.toLowerCase().includes(debouncedSearch.toLowerCase()));
            }

            if (activeLetter !== 'ALL') {
                result = result.filter(b => b.name.toUpperCase().startsWith(activeLetter));
            }

            setFilteredBrands(result);
            setCurrentPage(1);

            setIsFiltering(false);

        }, FILTER_DELAY);

        return () => clearTimeout(timer);
    }, [debouncedSearch, activeLetter, allBrands]);

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
