import { useState, useEffect } from 'react';
import { getAdminProductById } from '../../../../services/api/adminProduct.api';

export const useCarFormInit = (id, form) => {
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setIsInitializing(true);

        const fetchCarData = async () => {
            try {
                if (id) {
                    const carDetail = await getAdminProductById(id);
                    if (isMounted && carDetail) {
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
