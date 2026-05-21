export const applyCarsFilters = (cars, filters, sort) => {
    let result = [...cars];

    if (filters.keyword) {
        result = result.filter(c => c.name.toLowerCase().includes(filters.keyword.toLowerCase()));
    }

    if (filters.brandSlugs.length > 0) {
        result = result.filter(c => filters.brandSlugs.includes(c.brandId));
    }

    if (filters.minPrice) {
        result = result.filter(c => c.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
        result = result.filter(c => c.price <= Number(filters.maxPrice));
    }

    if (filters.bodyStyle && filters.bodyStyle !== 'Tất cả') {
        result = result.filter(c => c.bodyStyle === filters.bodyStyle);
    }

    if (sort === 'price_asc') {
        result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
    } else {
        result.sort((a, b) => b.id - a.id);
    }

    return result;
};

export const paginateCars = (cars, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return cars.slice(startIndex, startIndex + itemsPerPage);
};
