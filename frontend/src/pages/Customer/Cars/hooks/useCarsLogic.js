import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Utility for formatting price
export const formatVND = (price) => {
    if (price >= 1000000000) {
        return (price / 1000000000).toFixed(3).replace(/\.000$/, '') + ' Tỷ';
    }
    return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
};

const DUMMY_CARS = [
    { id: 1, brandId: 'mercedes-benz', name: 'Mercedes-Benz S450 Luxury', brandName: 'Mercedes-Benz', year: 2023, odo: 5000, engine: '3.0L', fuel: 'Xăng', seats: 5, price: 5499000000, bodyStyle: 'Sedan', isNew: false, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600' },
    { id: 2, brandId: 'mercedes-benz', name: 'Mercedes-AMG G63', brandName: 'Mercedes-Benz', year: 2022, odo: 12000, engine: '4.0L V8', fuel: 'Xăng', seats: 5, price: 12800000000, bodyStyle: 'SUV', isNew: false, image: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=600' },
    { id: 3, brandId: 'mercedes-benz', name: 'Mercedes-Benz GLS 450', brandName: 'Mercedes-Benz', year: 2024, odo: 0, engine: '3.0L', fuel: 'Xăng', seats: 7, price: 5389000000, bodyStyle: 'SUV', isNew: true, image: 'https://images.unsplash.com/photo-1559415668-38520befaa32?auto=format&fit=crop&q=80&w=600' },
    { id: 4, brandId: 'mercedes-benz', name: 'Mercedes-Benz E300 AMG', brandName: 'Mercedes-Benz', year: 2023, odo: 1200, engine: '2.0L', fuel: 'Xăng', seats: 5, price: 2850000000, bodyStyle: 'Sedan', isNew: false, image: 'https://images.unsplash.com/photo-1620882813840-77a8bcfdb9e7?auto=format&fit=crop&q=80&w=600' }, // Random img
    { id: 5, brandId: 'mercedes-benz', name: 'Mercedes-Maybach S680', brandName: 'Mercedes-Benz', year: 2024, odo: 0, engine: '6.0L V12', fuel: 'Xăng', seats: 4, price: 18990000000, bodyStyle: 'Sedan', isNew: true, image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600' },
    { id: 6, brandId: 'mercedes-benz', name: 'Mercedes-Benz C300 AMG', brandName: 'Mercedes-Benz', year: 2023, odo: 8500, engine: '2.0L', fuel: 'Xăng', seats: 5, price: 1950000000, bodyStyle: 'Sedan', isNew: false, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600' },
    { id: 7, brandId: 'bmw', name: 'BMW 740i Pure Excellence', brandName: 'BMW', year: 2024, odo: 0, engine: '3.0L', fuel: 'Xăng', seats: 5, price: 6200000000, bodyStyle: 'Sedan', isNew: true, image: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=600' },
    { id: 8, brandId: 'audi', name: 'Audi Q8 S-line', brandName: 'Audi', year: 2022, odo: 15000, engine: '3.0L', fuel: 'Xăng', seats: 5, price: 4500000000, bodyStyle: 'SUV', isNew: false, image: 'https://images.unsplash.com/photo-1603584173870-7f80db7d69d8?auto=format&fit=crop&q=80&w=600' },
    { id: 9, brandId: 'porsche', name: 'Porsche 911 Carrera S', brandName: 'Porsche', year: 2021, odo: 21000, engine: '3.0L', fuel: 'Xăng', seats: 4, price: 8200000000, bodyStyle: 'Coupe', isNew: false, image: 'https://images.unsplash.com/photo-1503376710349-41b8bc22839b?auto=format&fit=crop&q=80&w=600' },
    { id: 10, brandId: 'lexus', name: 'Lexus LX600 VIP', brandName: 'Lexus', year: 2024, odo: 0, engine: '3.5L V6', fuel: 'Xăng', seats: 4, price: 9250000000, bodyStyle: 'SUV', isNew: true, image: 'https://images.unsplash.com/photo-1629897034444-2f22b826fdb1?auto=format&fit=crop&q=80&w=600' },
];

// Generate fake brands list (Simulating a long list)
const BRAND_LIST = [
    { id: 'mercedes-benz', name: 'Mercedes-Benz', count: 48 },
    { id: 'bmw', name: 'BMW', count: 32 },
    { id: 'audi', name: 'Audi', count: 15 },
    { id: 'porsche', name: 'Porsche', count: 12 },
    { id: 'bentley', name: 'Bentley', count: 11 },
    { id: 'land-rover', name: 'Land Rover', count: 9 },
    { id: 'lexus', name: 'Lexus', count: 21 },
    { id: 'lamborghini', name: 'Lamborghini', count: 5 },
    { id: 'ferrari', name: 'Ferrari', count: 3 },
    { id: 'rolls-royce', name: 'Rolls-Royce', count: 8 },
    { id: 'kia', name: 'Kia', count: 1 },
    { id: 'hyundai', name: 'Hyundai', count: 0 },
    { id: 'honda', name: 'Honda', count: 2 },
    { id: 'toyota', name: 'Toyota', count: 12 },
    { id: 'mazda', name: 'Mazda', count: 8 },
    { id: 'volvo', name: 'Volvo', count: 10 },
    { id: 'mini', name: 'Mini', count: 4 },
];

const BODY_STYLES = [
    { label: 'Tất cả', value: 'Tất cả' },
    { label: 'Sedan', value: 'Sedan' },
    { label: 'SUV', value: 'SUV' },
    { label: 'Coupe', value: 'Coupe' },
    { label: 'Cabriolet', value: 'Cabriolet' },
];

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
                result.sort((a, b) => b.id - a.id); // Default newest
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
