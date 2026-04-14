import { useState, useEffect } from 'react';
import { ADMIN_MOCK_CARS } from '../../Cars/data/carsCatalog.mock';

export const useCarFormInit = (id, form) => {
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setIsInitializing(true);

        // Simulate an API call latency to prepare for true backend integration
        const fetchCarData = async () => {
            try {
                if (id) {
                    await new Promise(resolve => setTimeout(resolve, 300)); // Simulating network
                    if (!isMounted) return;

                    const carDetail = ADMIN_MOCK_CARS.find(c => String(c.id) === String(id));
                    if (carDetail) {
                        form.setFieldsValue(carDetail);
                    }
                } else {
                    form.resetFields();
                }
            } catch (error) {
                console.error("Failed to fetch car data:", error);
            } finally {
                if (isMounted) {
                    setIsInitializing(false);
                }
            }
        };

        fetchCarData();

        return () => {
            isMounted = false;
        };
    }, [id, form]);

    return { isInitializing };
};
