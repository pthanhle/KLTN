import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useClientBrandsQuery } from '../../../../services/queries/brandQueries';
import { useClientCategoriesQuery } from '../../../../services/queries/categoryQueries';
import { useClientProductsQuery } from '../../../../services/queries/clientProduct.queries';
import { useCarsURLSync } from './useCarsURLSync';

export const useCarsLogic = () => {
    const [searchParams] = useSearchParams();
    const { data: apiBrandsData = [], isLoading: isBrandsLoading } = useClientBrandsQuery();
    const { data: apiCategoriesData = [], isLoading: isCategoriesLoading } = useClientCategoriesQuery();

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

    const { updateURL } = useCarsURLSync(setFilters, setSort);

    const processedBrandsData = useMemo(() => {
        return apiBrandsData.map(brand => {
            const brandSlug = brand.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
            return {
                ...brand,
                slug: brandSlug
            };
        });
    }, [apiBrandsData]);

    const processedCategoriesData = useMemo(() => {
        const list = apiCategoriesData.map(cat => ({
            label: cat.category_name,
            value: cat.category_name
        }));
        return [{ label: 'Tất cả', value: 'Tất cả' }, ...list];
    }, [apiCategoriesData]);

    const queryParams = useMemo(() => {
        const selectedBrandIds = filters.brandSlugs
            .map(slug => processedBrandsData.find(b => b.slug === slug)?.id)
            .filter(Boolean);

        return {
            current: currentPage,
            pageSize: itemsPerPage,
            keyword: filters.keyword,
            brand: selectedBrandIds.join(','),
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            bodyStyle: filters.bodyStyle,
            sort: sort
        };
    }, [currentPage, itemsPerPage, filters, sort, processedBrandsData]);

    const { data: productsData, isLoading: isProductsLoading, isFetching } = useClientProductsQuery(queryParams);

    const cars = productsData?.products || [];
    const totalCars = productsData?.pagination?.total || 0;

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

    return {
        brandNameParam: filters.brandSlugs.length === 1 ? filters.brandSlugs[0] : null,
        isLoading: isProductsLoading || isBrandsLoading || isCategoriesLoading,
        isFiltering: isFetching && !isProductsLoading,
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
        bodyStylesData: processedCategoriesData,
    };
};
