import { useState, useEffect } from 'react';
import { getAdminProductById } from '../../../../services/api/adminProduct.api';

export const useCarFormInit = (id, form) => {
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        let isMounted = true;
        setIsInitializing(true);

        const formatToPreview = (url) => {
            if (!url || typeof url !== 'string') return url;
            return [{
                uid: `-1-${Math.random()}`,
                name: 'image.png',
                status: 'done',
                url: url,
                thumbUrl: url
            }];
        };

        const fetchCarData = async () => {
            try {
                if (id) {
                    const carDetail = await getAdminProductById(id);
                    if (isMounted && carDetail) {
                        const sanitizedData = { ...carDetail };

                        if (sanitizedData.colors && Array.isArray(sanitizedData.colors)) {
                            sanitizedData.colors = sanitizedData.colors.map(color => ({
                                ...color,
                                image: formatToPreview(color.image)
                            }));
                        }

                        if (sanitizedData.features && Array.isArray(sanitizedData.features)) {
                            sanitizedData.features = sanitizedData.features.map(feature => ({
                                ...feature,
                                image: formatToPreview(feature.image)
                            }));
                        }

                        form.setFieldsValue(sanitizedData);
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
