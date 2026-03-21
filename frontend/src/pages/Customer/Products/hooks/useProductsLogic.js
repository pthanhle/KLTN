import { useState, useEffect } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import { CategoryAPI } from '../../../../services/api/category';

export const useProductsLogic = () => {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500); // 500ms delay for typing

    const [activeLetter, setActiveLetter] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; 

    const [allBrands, setAllBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [paginatedBrands, setPaginatedBrands] = useState([]);

    // Fetch original data from backend
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                // Lấy số lượng lớn để support filter theo chữ cái ở frontend
                const res = await CategoryAPI.getCategoryList({ page: 1, limit: 100 });
                if (res && res.categories) {
                    const mappedBrands = res.categories.map(c => ({
                        id: c._id,
                        name: c.category_name,
                        image: c.image || 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=400', // fallback ảnh
                        count: c.count || 0 // Số lượng xe từ backend
                    }));
                    setAllBrands(mappedBrands);
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
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

        }, 300); // Wait a bit for smooth UI transition

        return () => clearTimeout(timer);
    }, [debouncedSearch, activeLetter, allBrands]);

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
