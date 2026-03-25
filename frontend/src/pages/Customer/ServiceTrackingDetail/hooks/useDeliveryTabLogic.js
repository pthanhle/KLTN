import { useState, useEffect } from 'react';
import { getDeliveryData } from '../data/mockDeliveryData';
import { useParams } from 'react-router-dom';

export const useDeliveryTabLogic = () => {
    const { id } = useParams();
    const [deliveryData, setDeliveryData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDeliveryInfo = async () => {
            setIsLoading(true);
            try {
                // Giả lập network delay lấy dữ liệu Invoice & Delivery
                await new Promise(res => setTimeout(res, 800));
                const data = getDeliveryData(id || 'SRV-1234');
                setDeliveryData(data);
            } catch (error) {
                console.error("Failed to load delivery data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDeliveryInfo();
    }, [id]);

    return {
        deliveryData,
        setDeliveryData,
        isLoading
    };
};
