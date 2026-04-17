import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BODY_STYLES } from '../data/cars.mock';
import { useClientBrandsQuery } from '../../../../services/queries/brandQueries';
import { useCarsURLSync } from './useCarsURLSync';
import { getClientProducts } from '../../../../services/api/clientProduct.api';

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
                count: 0 // Optional: fetch count from api if needed
            };
        });
    }, [apiBrandsData]);

    // 4. Data Filter / Sorting Simulation -> changed to real API call
    useEffect(() => {
        let isMounted = true;
        
        setIsFiltering(true);
        if (cars.length === 0) setIsLoading(true);

        const fetchCars = async () => {
            try {
                const params = {
                    current: currentPage,
                    pageSize: itemsPerPage,
                    keyword: filters.keyword,
                    brand: filters.brandSlugs.join(','),
                    minPrice: filters.minPrice,
                    maxPrice: filters.maxPrice,
                    bodyStyle: filters.bodyStyle,
                    sort: sort
                };
                const res = await getClientProducts(params);
                
                if (isMounted) {
                    setTotalCars(res.pagination.total);
                    setCars(res.products);
                    setIsFiltering(false);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Failed to fetch cars:", error);
                if (isMounted) {
                    setIsFiltering(false);
                    setIsLoading(false);
                }
            }
        };

        const timer = setTimeout(() => {
            fetchCars();
        }, 500);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [filters, sort, currentPage]);

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
