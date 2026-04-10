export const applyAdminFilter = (cars, filters) => {
    return cars.filter(car => {
        const matchSearch = car.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) || 
                            car.sku.toLowerCase().includes(filters.searchTerm.toLowerCase());
        const matchBrand = filters.filterBrand === 'Tất cả' || car.brandName === filters.filterBrand;
        const matchBodyStyle = filters.filterBodyStyle === 'Tất cả' || car.bodyStyle === filters.filterBodyStyle;
        const matchStatus = filters.filterStatus === 'Tất cả' || car.status === filters.filterStatus;
        
        return matchSearch && matchBrand && matchBodyStyle && matchStatus;
    });
};
