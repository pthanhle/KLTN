import { useState, useEffect, useMemo } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export const useProductsLogic = () => {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500); // 500ms delay for typing

    const [activeLetter, setActiveLetter] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; 

    const brandsData = useMemo(() => [
        { id: '1', name: 'Mercedes-Benz', count: 48, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=400' },
        { id: '2', name: 'BMW', count: 32, image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=400' },
        { id: '3', name: 'Audi', count: 15, image: 'https://images.unsplash.com/photo-1603584173870-7f80db7d69d8?auto=format&fit=crop&q=80&w=400' },
        { id: '4', name: 'Porsche', count: 12, image: 'https://images.unsplash.com/photo-1503376710349-41b8bc22839b?auto=format&fit=crop&q=80&w=400' },
        { id: '5', name: 'Lamborghini', count: 5, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=400' },
        { id: '6', name: 'Ferrari', count: 3, image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=400' },
        { id: '7', name: 'Rolls-Royce', count: 8, image: 'https://images.unsplash.com/photo-1631558556855-32fb3ced73ad?auto=format&fit=crop&q=80&w=400' },
        { id: '8', name: 'Bentley', count: 11, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=400' },
        { id: '9', name: 'Range Rover', count: 15, image: 'https://images.unsplash.com/photo-1606016159991-dfe4f27464ce?auto=format&fit=crop&q=80&w=400' },
        { id: '10', name: 'Lexus', count: 11, image: 'https://images.unsplash.com/photo-1629897034444-2f22b826fdb1?auto=format&fit=crop&q=80&w=400' },
        { id: '11', name: 'Aston Martin', count: 2, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=400' },
        { id: '12', name: 'Maserati', count: 4, image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=400' },
        { id: '13', name: 'McLaren', count: 6, image: 'https://images.unsplash.com/photo-1620882813840-77a8bcfdb9e7?auto=format&fit=crop&q=80&w=400' },
        { id: '14', name: 'Maybach', count: 4, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=400' },
        { id: '15', name: 'Pagani', count: 1, image: 'https://images.unsplash.com/photo-1610492983758-a9223add10cb?auto=format&fit=crop&q=80&w=400' },
        { id: '16', name: 'Bugatti', count: 2, image: 'https://images.unsplash.com/photo-1600705600109-7756784d50d0?auto=format&fit=crop&q=80&w=400' },
    ], []);

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
