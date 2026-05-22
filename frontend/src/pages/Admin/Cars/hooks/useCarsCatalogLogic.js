import { useEffect, useCallback, useMemo } from 'react';
import { message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { useCarsFilter } from './useCarsFilter';
import { useCarsSelection } from './useCarsSelection';
import { useDynamicTaxonomies } from './useDynamicTaxonomies';
import { useAdminProductsQuery, useUpdateAdminProductMutation, adminProductKeys } from '../../../../services/queries/adminProduct.queries';
import { useCarSocket } from './useCarSocket';

export const useCarsCatalogLogic = () => {
    const filterState = useCarsFilter();
    const taxonomyState = useDynamicTaxonomies();
    
    const queryClient = useQueryClient();

    const queryParams = useMemo(() => ({
        current: 1,
        pageSize: 1000,
        search: filterState.searchTerm,
        brand: filterState.filterBrand,
        bodyStyle: filterState.filterBodyStyle,
        status: filterState.filterStatus
    }), [filterState.searchTerm, filterState.filterBrand, filterState.filterBodyStyle, filterState.filterStatus]);

    const { data: response, isLoading: isQueryLoading, isFetching } = useAdminProductsQuery(queryParams);
    const { mutateAsync: updateProduct } = useUpdateAdminProductMutation();

    const carsData = response?.products || [];
    const totalCars = response?.pagination?.total || 0;
    const globalStats = response?.stats || null;

    const selectionState = useCarsSelection(carsData);

    const handleSocketUpdate = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: adminProductKeys.all });
    }, [queryClient]);

    useCarSocket(handleSocketUpdate);

    useEffect(() => {
        const successMsg = sessionStorage.getItem('admin_car_success');
        if (successMsg) {
            message.success(successMsg);
            sessionStorage.removeItem('admin_car_success');
        }
    }, []);

    const handleToggleDemo = async (id) => {
        const car = carsData.find(c => c.id === id || c._id === id);
        if (!car) return;

        const newStatus = !car.isDemoAvailable;

        // Optimistic UI could be handled via React Query 'onMutate', but for simplicity, we let the refetch handle it
        try {
            await updateProduct({ id, data: { isDemoAvailable: newStatus } });
        } catch (error) {
            message.error("Failed to update demo status");
            console.error(error);
        }
    };

    const handleToggleFeatured = async (id) => {
        const car = carsData.find(c => c.id === id || c._id === id);
        if (!car) return;

        const newStatus = !car.isFeatured;

        try {
            await updateProduct({ id, data: { isFeatured: newStatus } });
        } catch (error) {
            message.error("Failed to update featured status");
            console.error(error);
        }
    };

    return {
        cars: carsData,
        totalCars,
        globalStats,
        isLoading: isQueryLoading || isFetching,
        ...filterState,
        ...selectionState,
        ...taxonomyState,
        handleToggleDemo,
        handleToggleFeatured
    };
};
