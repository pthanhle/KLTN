import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useCarsFilter } from './useCarsFilter';
import { useCarsSelection } from './useCarsSelection';
import { useDynamicTaxonomies } from './useDynamicTaxonomies';
import { getAdminProducts, updateAdminProduct } from '../../../../services/api/adminProduct.api';
import { socket } from '../../../../services/socket';

export const useCarsCatalogLogic = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [carsData, setCarsData] = useState([]);
    const [totalCars, setTotalCars] = useState(0);
    const [globalStats, setGlobalStats] = useState(null);

    const filterState = useCarsFilter();
    const taxonomyState = useDynamicTaxonomies();
    const selectionState = useCarsSelection(carsData);

    const fetchCars = async (silent = false) => {
        if (!silent) setIsLoading(true);
        try {
            const params = {
                current: 1,
                pageSize: 1000,
                search: filterState.searchTerm,
                brand: filterState.filterBrand,
                bodyStyle: filterState.filterBodyStyle,
                status: filterState.filterStatus
            };

            const response = await getAdminProducts(params);
            setCarsData(response.products);
            setTotalCars(response.pagination?.total || 0);
            setGlobalStats(response.stats || null);
        } catch (error) {
            console.error(error);
        } finally {
            if (!silent) setIsLoading(false);
        }
    };

    useEffect(() => {
        const successMsg = sessionStorage.getItem('admin_car_success');
        if (successMsg) {
            message.success(successMsg);
            sessionStorage.removeItem('admin_car_success');
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => fetchCars(), 500);
        return () => clearTimeout(timer);
    }, [filterState.searchTerm, filterState.filterBrand, filterState.filterBodyStyle, filterState.filterStatus]);

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        const handleUpdate = () => {
            fetchCars(true);
        };

        socket.on('product_data_updated', handleUpdate);
        socket.on('product_image_updated', handleUpdate);

        return () => {
            socket.off('product_data_updated', handleUpdate);
            socket.off('product_image_updated', handleUpdate);
        };
    }, [filterState.searchTerm, filterState.filterBrand, filterState.filterBodyStyle, filterState.filterStatus]);

    const handleToggleDemo = async (id) => {
        const car = carsData.find(c => c.id === id || c._id === id);
        if (!car) return;

        const newStatus = !car.isDemoAvailable;
        setCarsData(prev => prev.map(c => (c.id === id || c._id === id) ? { ...c, isDemoAvailable: newStatus } : c));

        try {
            await updateAdminProduct(id, { isDemoAvailable: newStatus });
            fetchCars(true);
        } catch (error) {
            console.error(error);
            setCarsData(prev => prev.map(c => (c.id === id || c._id === id) ? { ...c, isDemoAvailable: !newStatus } : c));
        }
    };

    return {
        cars: carsData,
        totalCars,
        globalStats,
        isLoading,
        ...filterState,
        ...selectionState,
        ...taxonomyState,
        handleToggleDemo
    };
};
