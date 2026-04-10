import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DUMMY_CARS, BODY_STYLES } from '../data/cars.mock';
import { useClientBrandsQuery } from '../../../../services/queries/brandQueries';
import { useCarsURLSync } from './useCarsURLSync';
import { applyCarsFilters, paginateCars } from '../utils/carsFilterUtils';

export const useCarsLogic = () => {
    // 1. Core API & State Data Initialization
    const [searchParams] = useSearchParams();
    const { data: apiBrandsData = [], isLoading: isBrandsLoading } = useClientBrandsQuery();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);
    const [cars, setCars] = useState([]);
    const [totalCars, setTotalCars] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const [filters, setFilters] = useState({
        keyword: searchParams.get('keyword') || '',
        brandSlugs: searchParams.getAll('brand'),
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        bodyStyle: searchParams.get('bodyStyle') || 'Tất cả'
    });
    
    const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

    // 2. URL Synchronization logic (Extracted Custom Hook)
    const { updateURL } = useCarsURLSync(setFilters, setSort);

    // 3. Processed Brands mapping (Memoized)
    const processedBrandsData = useMemo(() => {
        return apiBrandsData.map(brand => {
            const brandSlug = brand.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
            return {
                ...brand,
                slug: brandSlug,
                count: DUMMY_CARS.filter(c => c.brandId === brandSlug).length
            };
        });
    }, [apiBrandsData]);

    // 4. Data Filter / Sorting Simulation (Debounced internally)
    useEffect(() => {
        let isMounted = true;
        
        setIsFiltering(true);
        if (cars.length === 0) setIsLoading(true);

        const timer = setTimeout(() => {
            const filteredResult = applyCarsFilters(DUMMY_CARS, filters, sort);
            const paginatedResult = paginateCars(filteredResult, currentPage, itemsPerPage);

            if (isMounted) {
                setTotalCars(filteredResult.length);
                setCars(paginatedResult);
                setIsFiltering(false);
                setIsLoading(false);
            }
        }, 500);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [filters, sort, currentPage, cars.length]);

    // 5. Interaction Handlers
    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        updateURL(newFilters, sort);
        setCurrentPage(1);
    };

    const handleBrandToggle = (brandSlug) => {
        const isSelected = filters.brandSlugs.includes(brandSlug);
        const newBrandSlugs = isSelected 
            ? filters.brandSlugs.filter(slug => slug !== brandSlug)
            : [...filters.brandSlugs, brandSlug];

        const newFilters = { ...filters, brandSlugs: newBrandSlugs };
        setFilters(newFilters);
        updateURL(newFilters, sort);
        setCurrentPage(1);
    };

    const handleSelectAllBrands = () => {
        const newFilters = { ...filters, brandSlugs: [] };
        setFilters(newFilters);
        updateURL(newFilters, sort);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => setCurrentPage(page);

    const handleSortChange = (value) => {
        setSort(value);
        updateURL(filters, value);
    };

    // 6. Return standard context bundle
    return {
        brandNameParam: filters.brandSlugs.length === 1 ? filters.brandSlugs[0] : null,
        isLoading: isLoading || isBrandsLoading,
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
        brandsData: processedBrandsData,
        bodyStylesData: BODY_STYLES,
    };
};
