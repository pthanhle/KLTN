import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DUMMY_CARS, BRAND_LIST, BODY_STYLES } from '../data/cars.mock';

export const useCarsLogic = () => {
    const { brandName } = useParams(); // URL params for brand integration
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);

    // UI states
    const [cars, setCars] = useState([]);
    const [totalCars, setTotalCars] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    // Filters state
    const [filters, setFilters] = useState({
        keyword: '',
        brandIds: brandName ? [brandName.toLowerCase()] : [],
        minPrice: '',
        maxPrice: '',
        bodyStyle: 'Tất cả' // 'Tất cả', 'Sedan', 'SUV', 'Coupe', 'Cabriolet'
    });

    const [sort, setSort] = useState('newest'); // 'newest', 'priceAsc', 'priceDesc'

    const itemsPerPage = 9;

    // Reset filters and sync with URL when route changes
    useEffect(() => {
        if (brandName) {
            setFilters(prev => ({
                ...prev,
                brandIds: [brandName.toLowerCase()]
            }));
        } else {
            // Keep brandIds empty if on `/cars` root
            setFilters(prev => ({
                ...prev,
                brandIds: []
            }));
        }
    }, [brandName]);

    // Data Fetching logic (debounced implicitly by button click or setTimeout)
    useEffect(() => {
        let isMounted = true;

        setIsFiltering(true);
        if (cars.length === 0) setIsLoading(true);

        const timer = setTimeout(() => {
            let result = [...DUMMY_CARS];

            // 1. Keyword filter
            if (filters.keyword) {
                result = result.filter(c => c.name.toLowerCase().includes(filters.keyword.toLowerCase()));
            }

            // 2. Brand Filter
            if (filters.brandIds.length > 0) {
                result = result.filter(c => filters.brandIds.includes(c.brandId));
            }

            // 3. Price Filter
            if (filters.minPrice) {
                result = result.filter(c => c.price >= Number(filters.minPrice));
            }
            if (filters.maxPrice) {
                result = result.filter(c => c.price <= Number(filters.maxPrice));
            }

            // 4. Body Style filter
            if (filters.bodyStyle && filters.bodyStyle !== 'Tất cả') {
                result = result.filter(c => c.bodyStyle === filters.bodyStyle);
            }

            // 5. SORTING
            if (sort === 'priceAsc') {
                result.sort((a, b) => a.price - b.price);
            } else if (sort === 'priceDesc') {
                result.sort((a, b) => b.price - a.price);
            } else {
                result.sort((a, b) => b.id - a.id);
            }

            // 6. Pagination
            setTotalCars(result.length);
            const startIndex = (currentPage - 1) * itemsPerPage;
            result = result.slice(startIndex, startIndex + itemsPerPage);

            if (isMounted) {
                setCars(result);
                setIsFiltering(false);
                setIsLoading(false);
            }
        }, 500);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [filters, sort, currentPage, cars.length]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const handleBrandToggle = (brandId) => {
        setFilters(prev => {
            const isSelected = prev.brandIds.includes(brandId);
            let newBrandIds;
            if (isSelected) {
                newBrandIds = prev.brandIds.filter(id => id !== brandId);
            } else {
                newBrandIds = [...prev.brandIds, brandId];
            }

            // Optional: If you want URL to reflect the first brand selected, 
            // you can pushState here, but sticking to standard filter logic is easier.
            // When clicking a brand checkbox, we stay on current URL but update state.
            // If they deselect all brands and they were on /brand/:brandName, 
            // you might want to redirect them to /cars for clean semantic URL.
            if (brandName && newBrandIds.length === 0) {
                // Remove parameter from URL by navigating to /cars
                navigate('/cars', { replace: true });
                return { ...prev, brandIds: [] };
            }

            return { ...prev, brandIds: newBrandIds };
        });
        setCurrentPage(1);
    };

    const handleSelectAllBrands = () => {
        setFilters(prev => ({ ...prev, brandIds: [] }));
        if (brandName) navigate('/cars', { replace: true });
        setCurrentPage(1);
    };

    const handlePageChange = (page) => setCurrentPage(page);
    const handleSortChange = (value) => setSort(value);

    return {
        brandNameParam: brandName,
        isLoading,
        isFiltering,
        cars,
        totalCars,
        currentPage,
        totalPages: Math.ceil(totalCars / itemsPerPage),
        filters,
        sort,
        handleFilterChange,
        handleBrandToggle,
        handleSelectAllBrands,
        handlePageChange,
        handleSortChange,
        brandsData: BRAND_LIST,
        bodyStylesData: BODY_STYLES,
    };
};
